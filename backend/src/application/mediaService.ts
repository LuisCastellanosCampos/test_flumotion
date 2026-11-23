import { Media, CreateMediaInput } from '../domain/media';
import { MediaRepository } from './mediaRepository';
import { validateMediaPayload } from '../validation';

import crypto from 'crypto';

export class MediaService {
  constructor(private readonly repository: MediaRepository) {}

  async listMedias(): Promise<Media[]> {
    return this.repository.list();
  }

  async createMedia(input: CreateMediaInput): Promise<Media> {
    const existingMedias = await this.repository.list();
    const existingIds = existingMedias.map((media) => media.id);

    const mediaToSave: Media = {
      id: input.id ?? crypto.randomUUID(),
      title: input.title,
      description: input.description,
      duration: input.duration,
      tags: input.tags,
      filedata: input.filedata,
      thumbnail: {
        id: input.thumbnail.id ?? crypto.randomUUID(),
        name: input.thumbnail.name,
        filename: input.thumbnail.filename,
      },
    };

    const validation = validateMediaPayload(mediaToSave, existingIds);

    if (!validation.isValid) {
      throw new Error(validation.errors.join('; '));
    }

    return this.repository.save(mediaToSave);
  }
}
