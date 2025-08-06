import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [marketing, setMarketing] = useState('');
  const [seo, setSeo] = useState({ title: '', hashtags: [] });
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('tr');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setDescription('');
    setMarketing('');
    setSeo({ title: '', hashtags: [] });
  };

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    setDescription('');
    setMarketing('');
    setSeo({ title: '', hashtags: [] });

    const formData = new FormData();
    formData.append("files", image);

    try {
      const response1 = await fetch("http://localhost:8080/api/gemini/analyze", {
        method: "POST",
        body: formData,
        headers: { "Accept-Language": language },
      });
      if (!response1.ok) throw new Error("Görsel analizinden beklenmeyen cevap alındı.");
      const descriptionText = await response1.text();

      setDescription(descriptionText);

      const response2 = await fetch("http://localhost:8000/generate-marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: descriptionText, language }),
      });
      if (!response2.ok) throw new Error("Pazarlama önerisi alınamadı.");
      const marketingData = await response2.json();
      setMarketing(marketingData.marketing_ideas || '');

      const response3 = await fetch("http://localhost:8000/generate-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marketing_text: marketingData.marketing_ideas, language }),
      });
      if (!response3.ok) throw new Error("SEO bilgisi alınamadı.");
      const seoData = await response3.json();
      setSeo({
        title: seoData.title || '',
        hashtags: seoData.hashtags || [],
      });
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanırken hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Kopyalama başarısız:", err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Ürün Açıklayıcı ve Pazarlama Öneri Sistemi</h1>

      <div className="language-select-container">
        <label htmlFor="language-select">Dil Seçimi:</label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
        </select>
      </div>

      {image && (
        <div className="image-preview-container">
          <img
            src={URL.createObjectURL(image)}
            alt="Ürün Görseli"
            className="image-preview"
          />
        </div>
      )}

      <div className="button-group">
        <label htmlFor="file-upload" className="upload-button">Dosya Seç</label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button
          onClick={handleSubmit}
          disabled={!image || loading}
          className="submit-button"
        >
          {loading ? 'Yükleniyor...' : 'Gönder'}
        </button>
      </div>

      {description && (
        <div className="result-box" style={{ position: 'relative' }}>
          <button
            className="copy-icon"
            onClick={() => copyToClipboard(description)}
            title="Kopyala"
            aria-label="Ürün Açıklamasını Kopyala"
          >
            📋
          </button>
          <h3>Ürün Açıklaması</h3>
          <p>{description}</p>
        </div>
      )}

      {marketing && (
        <div className="result-box marketing-box" style={{ position: 'relative' }}>
          <button
            className="copy-icon"
            onClick={() => copyToClipboard(marketing)}
            title="Kopyala"
            aria-label="Pazarlama Önerilerini Kopyala"
          >
            📋
          </button>
          <h3>Pazarlama Önerileri</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{marketing}</p>
        </div>
      )}

      {(seo.title || (seo.hashtags && seo.hashtags.length > 0)) && (
        <div className="result-box seo-box" style={{ position: 'relative' }}>
          <button
            className="copy-icon"
            onClick={() =>
              copyToClipboard(
                `${seo.title}\n${seo.hashtags.map((t) => t).join(', ')}`
              )
            }
            title="Kopyala"
            aria-label="SEO Açıklamalarını Kopyala"
          >
            📋
          </button>
          <h3>SEO Açıklamaları</h3>
          {seo.title && (
            <div className="seo-title-container">
              <strong>Başlık:</strong> {seo.title}
            </div>
          )}
          {seo.hashtags.length > 0 && (
            <div className="tags-container">
              {seo.hashtags.map((tag, idx) => (
                <span key={idx} className="tag-chip">{tag}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
