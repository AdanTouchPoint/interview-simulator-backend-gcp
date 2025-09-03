import express from 'express';
import payload from 'payload';
import cors from 'cors';
import dashBoardContent from './routes/dashBoardContent';

require('dotenv').config();
const app = express();
app.use(express.json())
app.use(cors({origin: '*'}));
const port = process.env.PORT || 8080
// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
const start = async () :Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  app.use('/dashBoardContent', dashBoardContent);

  app.listen( port, async () => {
    payload.logger.info(`Server listening on port: ${port}`)
  })
}
start();