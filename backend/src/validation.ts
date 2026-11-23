export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateMediaPayload(payload: unknown, existingIds: string[] = []): ValidationResult {
  const errors: string[] = [];

  if (!payload || typeof payload !== 'object') {
    return { isValid: false, errors: ['El payload debe ser un objeto'] };
  }

  const p = payload as Record<string, unknown>;

  const requiredStringFields = ['title', 'description', 'tags'];
  requiredStringFields.forEach((field) => {
    const value = p[field];
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(`El campo '${field}' es obligatorio`);
    }
  });

  if (typeof p['duration'] !== 'number' || !Number.isInteger(p['duration']) || p['duration'] <= 0) {
    errors.push('El campo duration debe ser un número entero mayor que 0');
  }

  if (typeof p['id'] === 'string' && p['id'].trim() !== '' && existingIds.includes(p['id'])) {
    errors.push('El id ya existe y no puede estar duplicado');
  }

  const filedata = p['filedata'];
  if (!filedata || typeof filedata !== 'object') {
    errors.push('El campo filedata es obligatorio');
  } else {
    const fd = filedata as Record<string, unknown>;
    if (typeof fd['filename'] !== 'string' || fd['filename'].trim() === '') {
      errors.push("El campo filedata.filename es obligatorio");
    } else {
      const normalizedFilename = fd['filename'].trim();
      if (normalizedFilename.includes('/') || normalizedFilename.includes('\\') || normalizedFilename.includes('..')) {
        errors.push('El campo filedata.filename tiene un formato inválido');
      }
    }

    if (typeof fd['bitrate'] !== 'number' || fd['bitrate'] <= 0) {
      errors.push('El campo filedata.bitrate debe ser un número mayor que 0');
    }

    if (typeof fd['fileSize'] !== 'number' || fd['fileSize'] <= 0) {
      errors.push('El campo filedata.fileSize debe ser un número mayor que 0');
    }
  }

  const thumbnail = p['thumbnail'];
  if (!thumbnail || typeof thumbnail !== 'object') {
    errors.push('El campo thumbnail es obligatorio');
  } else {
    const th = thumbnail as Record<string, unknown>;
    if (typeof th['filename'] !== 'string' || th['filename'].trim() === '') {
      errors.push("El campo thumbnail.filename es obligatorio");
    } else {
      const normalizedFilename = th['filename'].trim();
      if (normalizedFilename.includes('/') || normalizedFilename.includes('\\') || normalizedFilename.includes('..')) {
        errors.push('El campo thumbnail.filename tiene un formato inválido');
      }
    }

    if (th['id'] !== undefined && (typeof th['id'] !== 'string' || th['id'].trim() === '')) {
      errors.push('El campo thumbnail.id, si se proporciona, no puede estar vacío');
    }

    if (typeof th['name'] !== 'string' || th['name'].trim() === '') {
      errors.push('El campo thumbnail.name es obligatorio');
    }
  }

  return { isValid: errors.length === 0, errors };
}
