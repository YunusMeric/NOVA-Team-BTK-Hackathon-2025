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
      const response = await fetch("http://localhost:8080/api/gemini/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Sunucudan beklenmeyen cevap alındı.");

      const text = await response.text();

      // Örnek: API sadece açıklama döndürdüğü için pazarlama önerisini manuel ekliyoruz
      setDescription(text);
      setMarketing("Pazarlama önerisi: Ürünü sosyal medyada \"doğa dostu ve kaliteli\" vurgusuyla tanıtabilirsiniz.");
    } catch (error) {
      console.error("Hata:", error);
      alert("Sunucuya bağlanırken hata oluştu.");
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
