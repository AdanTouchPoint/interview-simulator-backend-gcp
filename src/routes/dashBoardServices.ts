import { Router } from "express";
import { ParsedQs } from 'qs'
import { Storage } from '@google-cloud/storage';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import sanitize from 'sanitize-filename';

const router = Router();

// El cliente de Storage se inicializa automáticamente usando las credenciales
// de la variable de entorno GOOGLE_APPLICATION_CREDENTIALS en Heroku.
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

// Esquema de validación con Zod para la petición de entrada
const startUploadSchema = z.object({
  fileName: z.string().min(1, 'El nombre de archivo es requerido.'),
  fileType: z.string().startsWith('video/', 'El tipo de archivo debe ser un video.'),
});
const completeUploadSchema = z.object({
  videoId: z.string().min(1, 'El videoId es requerido.'),
});

/**
 * @route   POST /start
 * @desc    Inicia una subida resumible a GCS y crea el registro en la BD.
 * @access  Privado (requiere autenticación)
 */

router.post('/start', async (req, res) => {

  try {
    // 1. Validar la petición del frontend
    const { fileName, fileType } = startUploadSchema.parse(req);
    const sanitizedFileName = sanitize(fileName);
    
    // 2. Generar una ruta única para el archivo en el bucket
    const uniqueKey = `videos/${req.user.id}/${uuidv4()}-${sanitizedFileName}`;
    
    // 3. Crear el registro del video en MongoDB con estado 'UPLOADING'
    const video = new Video({
      user: req.user.id,
      s3Key: uniqueKey, // Puedes renombrar este campo a gcsKey si prefieres
      originalFilename: sanitizedFileName,
      status: 'UPLOADING',
    });
    await video.save();

    // 4. Solicitar la URL firmada para una subida resumible a Google Cloud
    const file = bucket.file(uniqueKey);

    const options = {
      version: 'v4',
      action: 'resumable', // Clave para iniciar una sesión de subida por partes
      expires: Date.now() + 15 * 60 * 1000, // La URL es válida por 15 minutos
      contentType: fileType,
    };

    const [signedUrl] = await file.getSignedUrl(options);


    res.status(200).json({
        uploadUrl: 'url_de_ejemplo', // Reemplazar con la URL real
    });

  } catch (error) {
    if (error) {
      return res.status(400).json({ message: 'Datos de entrada inválidos', errors: error.errors });
    }
    console.error('Error al iniciar la subida a GCS:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});


/**
 * @route   POST /complete
 * @desc    Notifica al backend que la subida a GCS ha finalizado y actualiza el estado.
 * @access  Privado
 */
router.post('/complete', async (req, res) => {
  try {
    // 1. Validar la petición
    const { videoId } = completeUploadSchema.parse(req.body);

    // 2. Buscar el video y verificar que el usuario sea el propietario
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "El registro del video no fue encontrado." });
    }

    // ¡Verificación de seguridad CRÍTICA!
    if (video.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Acción no autorizada." });
    }
    
    // 3. Actualizar el estado para reflejar que la subida ha terminado
    // El video ahora está esperando ser procesado por n8n.
    video.status = 'PROCESSING';
    await video.save();

    // 4. Enviar confirmación al frontend
    res.status(200).json({ message: 'Subida confirmada. El video está en cola para ser procesado.' });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Datos de entrada inválidos', errors: error.errors });
    }
    console.error('Error al completar la subida:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});



  export default router