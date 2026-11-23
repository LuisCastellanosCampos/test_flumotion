import fs from 'fs/promises';
import path from 'path';
import { MediaRepository } from '../../application/mediaRepository';
import { Media } from '../../domain/media';

const DATA_FILE_PATH = path.join(__dirname, '../../../medias.json');

export class JsonMediaRepository implements MediaRepository {
  async list(): Promise<Media[]> {
    try {
      await fs.access(DATA_FILE_PATH);
    } catch {
      return [];
    }

    const rawData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const parsed: unknown = JSON.parse(rawData);

    if (!Array.isArray(parsed)) {
      throw new Error(`El fichero ${DATA_FILE_PATH} no contiene un array JSON válido`);
    }

    return parsed as Media[];
  }

  async save(media: Media): Promise<Media> {
    const medias = await this.list();
    medias.push(media);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(medias, null, 4), 'utf-8');
    return media;
  }
}
