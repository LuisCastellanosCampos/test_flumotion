import test from 'node:test';
import assert from 'node:assert/strict';
import { validateMediaPayload } from './validation';

test('acepta un payload válido', () => {
  const result = validateMediaPayload({
    id: 'media-1',
    title: 'Demo',
    description: 'Descripción demo',
    duration: 120,
    tags: 'Demo, Test',
    filedata: {
      bitrate: 2500,
      fileSize: 25000000,
      filename: 'video.mp4',
    },
    thumbnail: {
      id: 'thumb-1',
      name: 'Thumbnail',
      filename: 'thumb.jpg',
    },
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, []);
});

test('rechaza un payload incompleto', () => {
  const result = validateMediaPayload({
    title: 'Demo',
    duration: 0,
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.length > 0);
});

test('rechaza nombres de archivo con formato inválido', () => {
  const result = validateMediaPayload({
    id: 'media-1',
    title: 'Demo',
    description: 'Descripción demo',
    duration: 120,
    tags: 'Demo, Test',
    filedata: {
      bitrate: 2500,
      fileSize: 25000000,
      filename: 'video/invalid.mp4',
    },
    thumbnail: {
      id: 'thumb-1',
      name: 'Thumbnail',
      filename: '../thumb.jpg',
    },
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((error) => error.includes('filename')));
});

test('rechaza un id duplicado cuando ya existe en la lista', () => {
  const result = validateMediaPayload(
    {
      id: 'media-1',
      title: 'Demo',
      description: 'Descripción demo',
      duration: 120,
      tags: 'Demo, Test',
      filedata: {
        bitrate: 2500,
        fileSize: 25000000,
        filename: 'video.mp4',
      },
      thumbnail: {
        id: 'thumb-1',
        name: 'Thumbnail',
        filename: 'thumb.jpg',
      },
    },
    ['media-1'],
  );

  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((error) => error.includes('duplicado')));
});

test('rechaza una duración no entera y datos anidados inválidos', () => {
  const result = validateMediaPayload({
    id: 'media-2',
    title: 'Demo',
    description: 'Descripción demo',
    duration: 120.5,
    tags: 'Demo, Test',
    filedata: {
      bitrate: '2500',
      fileSize: -1,
      filename: 'video.mp4',
    },
    thumbnail: {
      id: '',
      name: 'Thumbnail',
      filename: 'thumb.jpg',
    },
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((error) => error.includes('duration')));
  assert.ok(result.errors.some((error) => error.includes('bitrate')) || result.errors.some((error) => error.includes('fileSize')));
  assert.ok(result.errors.some((error) => error.includes('thumbnail')));
});
