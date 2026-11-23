import { useState, useEffect, useCallback } from 'react';
import type { Media } from '../types/media';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useMedias() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMedias = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/getmedias`);
      if (!response.ok) throw new Error('No se pudo obtener la lista de videos');
      const data: Media[] = await response.json();
      setMedias(data);
      if (data.length > 0) {
        setSelectedMedia((prev) => prev ? (data.find(m => m.id === prev.id) || data[0]) : data[0]);
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedias();
  }, [fetchMedias]);

  return {
    medias,
    selectedMedia,
    setSelectedMedia,
    loading,
    error,
    fetchMedias,
    API_URL
  };
}
