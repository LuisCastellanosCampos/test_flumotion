import express from 'express';
import cors from 'cors';
import { MediaService } from './application/mediaService';
import { JsonMediaRepository } from './infrastructure/repositories/jsonMediaRepository';
import { MediaController } from './infrastructure/controllers/mediaController';

const app = express();
const PORT = process.env.PORT || 3001;

// Dependencies Injection
const mediaRepository = new JsonMediaRepository();
const mediaService = new MediaService(mediaRepository);
const mediaController = new MediaController(mediaService);

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- ENDPOINTS ---
app.get('/getmedias', mediaController.getMedias);
app.post('/addmedias', mediaController.addMedia);

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});
