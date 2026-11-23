import { useState, useRef, useEffect } from 'react';
import { languageOptions, type Language, type TranslationMap } from '../translations';

interface HeaderProps {
  t: TranslationMap;
  language: Language;
  setLanguage: (lang: Language) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  resetForm: () => void;
}

export function Header({ t, language, setLanguage, showForm, setShowForm, resetForm }: HeaderProps) {
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const languageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLanguageMenu && languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLanguageMenu]);

  return (
    <header className="main-header">
      <a className="header-logo-link" href="https://www.flumotion.com/">
        <img src="/logo_horizontal.png" alt="Flumotion" className="partner-logo" />
      </a>
      <div className="header-center">
        <a className="btn-visit-site" href="http://localhost:5173/">
          {t.visitPlayer}
        </a>
      </div>
      <div className="header-actions">
        <a className="btn-blog" href="https://www.flumotion.com/blog/">
          {t.blog}
        </a>
        <button
          className="btn-toggle-form"
          onClick={() => {
            if (showForm) {
              resetForm();
            }
            setShowForm(!showForm);
          }}
        >
          {showForm ? t.close : t.addVideo}
        </button>
        <div className="language-selector-wrapper" ref={languageRef} onMouseEnter={() => setShowLanguageMenu(true)} onMouseLeave={() => setShowLanguageMenu(false)}>
          <button
            type="button"
            className="language-selector"
            aria-haspopup="menu"
            aria-expanded={showLanguageMenu}
            onClick={() => setShowLanguageMenu((prev) => !prev)}
          >
            <img src={languageOptions.find((option) => option.code === language)?.icon} alt={language} className="language-icon" />
            <span className="language-selector-label">{languageOptions.find((option) => option.code === language)?.label}</span>
          </button>
          {showLanguageMenu && (
            <div className="language-menu" role="menu">
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  className={`language-menu-item ${language === option.code ? 'selected' : ''}`}
                  onClick={() => {
                    setLanguage(option.code);
                    setShowLanguageMenu(false);
                  }}
                >
                  <img src={option.icon} alt={option.label} className="language-icon" />
                  <span className="language-menu-label">{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
