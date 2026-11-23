import type { Media } from '../types/media';
import type { TranslationMap } from '../translations';

interface PlayerProps {
  selectedMedia: Media | null;
  t: TranslationMap;
  useFallbackPlayer: boolean;
  setUseFallbackPlayer: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export function Player({ selectedMedia, t, useFallbackPlayer, setUseFallbackPlayer }: PlayerProps) {
  if (!selectedMedia) {
    return <div className="no-video">{t.selectVideo}</div>;
  }

  return (
    <div className="player-wrapper">
      <div className="player-controls">
        <button className="player-toggle-btn" onClick={() => setUseFallbackPlayer((prev) => !prev)}>
          {useFallbackPlayer ? t.useOfficialPlayer : t.useFallbackPlayer}
        </button>
      </div>
      {useFallbackPlayer ? (
        <video className="video-iframe" controls preload="metadata">
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de vídeo.
        </video>
      ) : (
        <iframe
          title={selectedMedia.title}
          src={`https://cdnapi.codev8.net/cms-player/default.iframe?injectSrc=${encodeURIComponent(selectedMedia.mediaroute || '')}`}
          className="video-iframe"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      )}
      <h1 className="video-title">{selectedMedia.title}</h1>
      <p className="video-description">{selectedMedia.description || t.noDescription}</p>
      <div className="video-tags">
        {selectedMedia.tags.split(',').map((tag, idx) => (
          <span key={idx} className="tag">#{tag.trim()}</span>
        ))}
      </div>
    </div>
  );
}
