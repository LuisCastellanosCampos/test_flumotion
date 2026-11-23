import type { Media } from '../types/media';
import type { TranslationMap } from '../translations';

interface MediaListProps {
  medias: Media[];
  selectedMedia: Media | null;
  setSelectedMedia: (media: Media) => void;
  t: TranslationMap;
}

export function MediaList({ medias, selectedMedia, setSelectedMedia, t }: MediaListProps) {
  return (
    <section className="playlist-section">
      <h2 className="playlist-title">{t.nextVideos}</h2>
      {medias.length === 0 ? (
        <div className="empty-state">
          <p>{t.noVideos}</p>
          <span>{t.emptyStateHint}</span>
        </div>
      ) : (
        <div className="thumbnails-grid">
          {medias.map((item) => {
            const isSelected = selectedMedia?.id === item.id;
            return (
              <div
                key={item.id}
                className={`thumbnail-card ${isSelected ? 'active-card' : ''}`}
                onClick={() => setSelectedMedia(item)}
              >
                <div className="thumbnail-image-container">
                  <img
                    src={item.thumbnail?.thumbnailroute}
                    alt={item.title}
                    className="thumbnail-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x180?text=Video+Thumbnail';
                    }}
                  />
                  <span className="video-duration">
                    {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="thumbnail-info">
                  <h4 className="thumbnail-title">{item.title}</h4>
                  <p className="thumbnail-meta">{t.clickToPlay}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
