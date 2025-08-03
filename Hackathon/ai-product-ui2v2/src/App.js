import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [marketing, setMarketing] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setDescription('');
    setMarketing('');
  };

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    setDescription('');
    setMarketing('');

    const formData = new FormData();
    formData.append("files", image);

    try {
      // 1. Görselden ürün açıklamasını al
      const response1 = await fetch("http://localhost:8080/api/gemini/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response1.ok) throw new Error("Görsel analizinden beklenmeyen cevap alındı.");

      const descriptionText = await response1.text();
      setDescription(descriptionText);

      // 2. Ürün açıklamasını backend'in pazarlama önerisi endpoint'ine gönder
      const response2 = await fetch("http://localhost:8000/generate-marketing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: descriptionText }),
      });

      if (!response2.ok) throw new Error("Pazarlama önerisi alınamadı.");

      const marketingData = await response2.json();

      setMarketing(marketingData.marketing_ideas);

    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanırken hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Ürün Görseli Açıklayıcı AI</h1>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Ürün Görseli"
            className="image-preview"
          />
        )}

        <div className="button-group">
          <label htmlFor="file-upload" className="upload-button">
            Dosya Seç
          </label>
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
            className="upload-button"
          >
            {loading ? 'Yükleniyor...' : 'Gönder'}
          </button>
        </div>

        {description && (
          <div className="text-box">
            <h3>Ürün Açıklaması</h3>
            <p>{description}</p>
          </div>
        )}

        {marketing && (
          <div className="text-box">
            <h3>Pazarlama Önerileri</h3>
            <p>{marketing}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
