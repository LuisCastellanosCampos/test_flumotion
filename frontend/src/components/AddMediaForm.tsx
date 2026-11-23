import { useState } from 'react';
import type { TranslationMap } from '../translations';

interface AddMediaFormProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  fetchMedias: () => void;
  t: TranslationMap;
  API_URL: string;
}

export function AddMediaForm({ showForm, setShowForm, fetchMedias, t, API_URL }: AddMediaFormProps) {
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDuration, setFormDuration] = useState('120');
  const [formTags, setFormTags] = useState('');
  const [formFilename, setFormFilename] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const resetForm = () => {
    setFormTitle('');
    setFormDesc('');
    setFormDuration('120');
    setFormTags('');
    setFormFilename('');
    setFormError(null);
    setFormSuccess(null);
  };

  const isFormValid = formTitle.trim() !== '' && formFilename.trim() !== '';

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!formTitle.trim() || !formFilename.trim()) {
      setFormError(t.formErrorRequired);
      return;
    }

    const newMediaPayload = {
      title: formTitle,
      description: formDesc,
      duration: parseInt(formDuration) || 60,
      tags: formTags || 'General',
      filedata: {
        bitrate: 2500,
        fileSize: 25000000,
        filename: formFilename
      },
      thumbnail: {
        name: `thumb-${formTitle}`,
        filename: `${formFilename.split('.')[0]}_3.jpg`
      }
    };

    try {
      const response = await fetch(`${API_URL}/addmedias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMediaPayload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.details?.join(', ') || data.error || 'Error al guardar el video');
      }

      resetForm();
      setShowForm(false);
      fetchMedias();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : t.formErrorSave);
    }
  };

  if (!showForm) return null;

  return (
    <div className="form-overlay-container">
      <form onSubmit={handleAddMedia} className="add-media-form">
        <h3>{t.addNewVideo}</h3>
        {formError && <div className="form-error-message">{formError}</div>}
        {formSuccess && <div className="form-success-message">{formSuccess}</div>}
        <div className="form-group">
          <label>{t.formTitleLabel}</label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => {
              setFormTitle(e.target.value);
              setFormError(null);
              setFormSuccess(null);
            }}
            placeholder={t.formTitlePlaceholder}
            required
          />
        </div>
        <div className="form-group">
          <label>{t.formDescriptionLabel}</label>
          <textarea
            value={formDesc}
            onChange={(e) => {
              setFormDesc(e.target.value);
              setFormError(null);
              setFormSuccess(null);
            }}
            placeholder={t.formDescriptionPlaceholder}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>{t.formDurationLabel}</label>
            <input
              type="number"
              value={formDuration}
              onChange={(e) => {
                setFormDuration(e.target.value);
                setFormError(null);
                setFormSuccess(null);
              }}
            />
          </div>
          <div className="form-group">
            <label>{t.formFilenameLabel}</label>
            <input
              type="text"
              value={formFilename}
              onChange={(e) => {
                setFormFilename(e.target.value);
                setFormError(null);
                setFormSuccess(null);
              }}
              placeholder={t.formFilenamePlaceholder}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>{t.formTagsLabel}</label>
          <input
            type="text"
            value={formTags}
            onChange={(e) => {
              setFormTags(e.target.value);
              setFormError(null);
              setFormSuccess(null);
            }}
            placeholder={t.formTagsPlaceholder}
          />
        </div>
        <button type="submit" className="btn-submit-form" disabled={!isFormValid}>
          {t.saveButton}
        </button>
      </form>
    </div>
  );
}
