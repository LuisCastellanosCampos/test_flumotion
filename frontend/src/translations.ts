export type Language = 'es' | 'es-MX' | 'en';

export interface TranslationMap {
  loadingPortal: string;
  errorConnection: string;
  visitPlayer: string;
  blog: string;
  addVideo: string;
  close: string;
  addNewVideo: string;
  formErrorRequired: string;
  formSuccessSaved: string;
  formErrorSave: string;
  formTitleLabel: string;
  formTitlePlaceholder: string;
  formDescriptionLabel: string;
  formDescriptionPlaceholder: string;
  formDurationLabel: string;
  formFilenameLabel: string;
  formFilenamePlaceholder: string;
  formTagsLabel: string;
  formTagsPlaceholder: string;
  saveButton: string;
  useOfficialPlayer: string;
  useFallbackPlayer: string;
  noDescription: string;
  nextVideos: string;
  noVideos: string;
  emptyStateHint: string;
  clickToPlay: string;
  selectVideo: string;
  languageLabel: string;
}

export const translations: Record<Language, TranslationMap> = {
  es: {
    loadingPortal: 'Cargando portal de videos...',
    errorConnection: 'Error al conectar con el servidor.',
    visitPlayer: 'Reproductor de Vídeo',
    blog: 'Blog',
    addVideo: '+ Añadir Vídeo',
    close: '✕ Cerrar',
    addNewVideo: 'Añadir Nuevo Vídeo Corporativo',
    formErrorRequired: 'Por favor, completa el título y el nombre del archivo.',
    formSuccessSaved: '¡Vídeo añadido correctamente!',
    formErrorSave: 'No se pudo guardar el vídeo.',
    formTitleLabel: 'Título del Vídeo *',
    formTitlePlaceholder: 'Ej: Presentación Flumotion 2026',
    formDescriptionLabel: 'Descripción',
    formDescriptionPlaceholder: 'Escribe detalles del contenido...',
    formDurationLabel: 'Duración (segundos)',
    formFilenameLabel: 'Nombre del archivo de video (filename) *',
    formFilenamePlaceholder: 'video_corporativo.mp4',
    formTagsLabel: 'Etiquetas / Tags (separadas por comas)',
    formTagsPlaceholder: 'Corporativo, Promo, Oficinas',
    saveButton: 'Guardar en Base de Datos (JSON)',
    useOfficialPlayer: 'Usar player oficial',
    useFallbackPlayer: 'Usar reproductor de respaldo',
    noDescription: 'Sin descripción disponible.',
    nextVideos: 'Siguientes vídeos',
    noVideos: 'No hay vídeos disponibles todavía.',
    emptyStateHint: 'Prueba a añadir uno desde el formulario.',
    clickToPlay: 'Click para reproducir',
    selectVideo: 'Selecciona un video de la lista para comenzar',
    languageLabel: 'Selector de idioma',
  },
  'es-MX': {
    loadingPortal: 'Cargando portal de videos...',
    errorConnection: 'Error al conectar con el servidor.',
    visitPlayer: 'Reproductor de Video',
    blog: 'Blog',
    addVideo: '+ Agregar Video',
    close: '✕ Cerrar',
    addNewVideo: 'Agregar nuevo video corporativo',
    formErrorRequired: 'Por favor, completa el título y el nombre del archivo.',
    formSuccessSaved: '¡Video agregado correctamente!',
    formErrorSave: 'No se pudo guardar el video.',
    formTitleLabel: 'Título del video *',
    formTitlePlaceholder: 'Ej: Presentación Flumotion 2026',
    formDescriptionLabel: 'Descripción',
    formDescriptionPlaceholder: 'Escribe detalles del contenido...',
    formDurationLabel: 'Duración (segundos)',
    formFilenameLabel: 'Nombre del archivo de video (filename) *',
    formFilenamePlaceholder: 'video_corporativo.mp4',
    formTagsLabel: 'Etiquetas / Tags (separadas por comas)',
    formTagsPlaceholder: 'Corporativo, Promo, Oficinas',
    saveButton: 'Guardar en base de datos (JSON)',
    useOfficialPlayer: 'Usar player oficial',
    useFallbackPlayer: 'Usar reproductor alternativo',
    noDescription: 'Sin descripción disponible.',
    nextVideos: 'Videos siguientes',
    noVideos: 'Aún no hay videos disponibles.',
    emptyStateHint: 'Prueba agregar uno desde el formulario.',
    clickToPlay: 'Haz clic para reproducir',
    selectVideo: 'Selecciona un video de la lista para comenzar',
    languageLabel: 'Selector de idioma',
  },
  en: {
    loadingPortal: 'Loading video portal...',
    errorConnection: 'Could not connect to the server.',
    visitPlayer: 'Video Player',
    blog: 'Blog',
    addVideo: '+ Add Video',
    close: '✕ Close',
    addNewVideo: 'Add New Corporate Video',
    formErrorRequired: 'Please complete the title and filename.',
    formSuccessSaved: 'Video added successfully!',
    formErrorSave: 'Could not save the video.',
    formTitleLabel: 'Video Title *',
    formTitlePlaceholder: 'Example: Flumotion Presentation 2026',
    formDescriptionLabel: 'Description',
    formDescriptionPlaceholder: 'Write details about the content...',
    formDurationLabel: 'Duration (seconds)',
    formFilenameLabel: 'Video file name (filename) *',
    formFilenamePlaceholder: 'corporate_video.mp4',
    formTagsLabel: 'Tags (separated by commas)',
    formTagsPlaceholder: 'Corporate, Promo, Offices',
    saveButton: 'Save to Database (JSON)',
    useOfficialPlayer: 'Use official player',
    useFallbackPlayer: 'Use fallback player',
    noDescription: 'No description available.',
    nextVideos: 'Up next',
    noVideos: 'No videos are available yet.',
    emptyStateHint: 'Try adding one from the form.',
    clickToPlay: 'Click to play',
    selectVideo: 'Select a video from the list to start',
    languageLabel: 'Language selector',
  },
};

export const languageOptions: Array<{ code: Language; label: string; icon: string }> = [
  { code: 'es', label: 'ES', icon: '/ES.png' },
  { code: 'es-MX', label: 'MX', icon: '/MX.png' },
  { code: 'en', label: 'EN', icon: '/EN.png' },
];
