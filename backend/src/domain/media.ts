export interface FileData {
  bitrate: number;
  fileSize: number;
  filename: string;
}

export interface Thumbnail {
  id: string;
  name: string;
  filename: string;
  thumbnailroute?: string;
}

export interface Media {
  id: string;
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: FileData;
  thumbnail: Thumbnail;
  mediaroute?: string;
}

export interface CreateMediaInput {
  id?: string;
  title: string;
  description: string;
  duration: number;
  tags: string;
  filedata: FileData;
  thumbnail: {
    id?: string;
    name: string;
    filename: string;
  };
}
