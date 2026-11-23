import { Request, Response } from 'express';
import { MediaService } from '../../application/mediaService';

export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  public getMedias = async (req: Request, res: Response) => {
    try {
      const medias = await this.mediaService.listMedias();

      const clientUuid = process.env.CLIENT_UUID || 'b4ab8f95-bc2b-4d88-8ff0-df4df19d206c';
      
      const enrichedMedias = medias.map((media) => ({
        ...media,
        mediaroute: `https://storagecdn.codev8.net/ondemand/${clientUuid}/${media.filedata.filename}`,
        thumbnail: {
          ...media.thumbnail,
          thumbnailroute: `https://progressive.codev8.net/userdatanew/${clientUuid}/thumbnails/${media.thumbnail.filename}`,
        },
      }));

      res.json(enrichedMedias);
    } catch (error) {
      console.error('Error al procesar /getmedias:', error);
      res.status(500).json({ error: 'Error interno del servidor al obtener los recursos' });
    }
  };

  public addMedia = async (req: Request, res: Response) => {
    try {
      const newMediaPayload = req.body;

      try {
        const savedMedia = await this.mediaService.createMedia(newMediaPayload);
        res.status(201).json({ message: 'Media añadido correctamente', data: savedMedia });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al crear la media';
        return res.status(400).json({
          error: 'Datos inválidos para crear la media',
          details: message.split('; '),
        });
      }
    } catch (error) {
      console.error('Error al procesar /addmedias:', error);
      res.status(500).json({ error: 'Error interno del servidor al guardar el recurso' });
    }
  };
}
