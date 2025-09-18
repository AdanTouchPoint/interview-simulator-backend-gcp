import { Router, Request, Response } from "express";
import { Storage } from '@google-cloud/storage';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import sanitize from 'sanitize-filename';
import { createMedia, findMediaById, updateMedia } from "../controllers/media";

const router = Router();

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY ? process.env.GCS_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME || 'interview-sim-uploads-raw');

const startUploadSchema = z.object({
  fileName: z.string().min(1, 'El nombre de archivo es requerido.'),
  fileType: z.string().startsWith('video/', 'El tipo de archivo debe ser un video.'),
});
const completeUploadSchema = z.object({
  videoId: z.string().min(1, 'El videoId es requerido.'),
});

router.post('/start', async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body); 
    const { fileName, fileType } = startUploadSchema.parse(req.body);
    const sanitizedFileName = sanitize(fileName);
    const uniqueKey = `videos/${uuidv4()}-${sanitizedFileName}`;
    
const query = {
      //user: req.body.id,
      name: sanitizedFileName,
      type: fileType, 
      gcKey: uniqueKey, 
      status: 'UPLOADING'
    }
    const video = await createMedia(query);
   console.log('Created media record:', video);
    const file = bucket.file(uniqueKey);
    const options = {
      version: 'v4' as const,
      action: 'resumable' as const,
      expires: Date.now() + 15 * 60 * 1000,
      contentType: fileType,
    };

    const [signedUrl] = await file.getSignedUrl(options);

    res.status(200).json({
      uploadUrl: signedUrl,
      videoId: video.id
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Datos de entrada inválidos', errors: error });
    }
    console.error('Error al iniciar la subida a GCS:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

router.post('/complete', async (req: Request, res: Response) => {
  try {
    const { videoId } = completeUploadSchema.parse(req.body);
    const video = await findMediaById(videoId);

    if (!video) {
      return res.status(404).json({ message: "El registro del video no fue encontrado." });
    }

    await updateMedia(videoId, { status: 'PROCESSING' });
    res.status(200).json({ message: 'Subida confirmada. El video está en cola para ser procesado.' });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Datos de entrada inválidos', errors: error });
    }
    console.error('Error al completar la subida:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

export default router;
