import { useState, useEffect } from 'react';
import './App.css';
import { translations, type Language } from './translations';
import { useMedias } from './hooks/useMedias';
import { Header } from './components/Header';
import { Player } from './components/Player';
import { MediaList } from './components/MediaList';
import { AddMediaForm } from './components/AddMediaForm';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'flumotion-language';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'es';
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'es' || stored === 'es-MX' || stored === 'en' ? stored : 'es';
};

function App() {
  const { medias, selectedMedia, setSelectedMedia, loading, error, fetchMedias, API_URL } = useMedias();
  
  const [showForm, setShowForm] = useState<boolean>(false);
  const [useFallbackPlayer, setUseFallbackPlayer] = useState(false);
  
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());
  const t = translations[language];

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  if (loading) return <div className="loading">{t.loadingPortal}</div>;
  if (error) return <div className="error-message">{t.errorConnection}</div>;

  return (
    <div className="app-container">
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        showForm={showForm}
        setShowForm={setShowForm}
        resetForm={() => {}}
      />

      <AddMediaForm
        showForm={showForm}
        setShowForm={setShowForm}
        fetchMedias={fetchMedias}
        t={t}
        API_URL={API_URL}
      />

      <main className="content-layout">
        <section className="player-section">
          <Player
            selectedMedia={selectedMedia}
            t={t}
            useFallbackPlayer={useFallbackPlayer}
            setUseFallbackPlayer={setUseFallbackPlayer}
          />
        </section>

        <MediaList
          medias={medias}
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
          t={t}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;