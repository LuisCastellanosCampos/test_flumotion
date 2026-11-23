import { Media } from '../domain/media';

export interface MediaRepository {
  list(): Promise<Media[]>;
  save(media: Media): Promise<Media>;
}
