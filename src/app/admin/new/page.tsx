'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";


import { useEffect } from 'react';


export default function NewVehiclePage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]); // birden fazla URL tutacağız
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      brand: formData.get('brand'),
      model: formData.get('model'),
      year: Number(formData.get('year')),
      price: formData.get('price') ? Number(formData.get('price')) : null,
      mileage: formData.get('mileage') ? Number(formData.get('mileage')) : null,
      type: formData.get('type'),
      fuelType: formData.get('fuelType'),
      transmission: formData.get('transmission'),
      color: formData.get('color'),
      description: formData.get('description'),
      images: images.join(','), // virgülle ayrılmış string haline getir
      isFeatured: formData.get('isFeatured') === 'on',
    };

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        alert('Hata oldu, tekrar dene');
      }
    } catch (err) {
      alert('Bir şeyler ters gitti');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Yeni Araç Ekle</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="brand" placeholder="Marka (ör: Audi)" required className="input" />
            <input name="model" placeholder="Model (ör: A6)" required className="input" />
            <input name="year" type="number" placeholder="Yıl" required className="input" />
            <input name="price" type="number" placeholder="Fiyat (TL, boş bırakılabilir)" className="input" />
            <input name="mileage" type="number" placeholder="Kilometre (boş bırakılabilir)" className="input" />

            <select name="type" required className="input">
              <option value="">Tür Seç</option>
              <option value="CAR">Araba</option>
              <option value="MOTORCYCLE">Motosiklet</option>
            </select>

            <input name="fuelType" placeholder="Yakıt Türü" className="input" />
            <input name="transmission" placeholder="Vites" className="input" />
            <input name="color" placeholder="Renk" className="input" />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="isFeatured" className="text-lg font-medium">
              Öne Çıkanlara Ekle (Ana sayfada üstte görünsün)
            </label>
          </div>

          <textarea
            name="description"
            placeholder="Açıklama (isteğe bağlı)"
            rows={5}
            className="input"
          />

          {/* ÇOKLU FOTOĞRAF YÜKLEME */}
          <div className="space-y-4">
            <p className="font-semibold">Fotoğraflar (birden fazla seçebilirsin)</p>
            <UploadButton<OurFileRouter>
              endpoint="vehicleImages"
              onClientUploadComplete={(res) => {
                const newUrls = res.map((file) => file.url);
                setImages((prev) => [...prev, ...newUrls]);
                alert('Yükleme tamamlandı!');
              }}
              onUploadError={(error: Error) => alert(`Hata: ${error.message}`)}
              appearance={{
                button: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg',
                allowedContent: 'text-gray-600 text-sm',
              }}
              content={{
                button: 'Fotoğrafları Yükle (Birden Fazla Seçebilirsin)',
                allowedContent: 'JPG, PNG (maks. 4MB)',
              }}
              multiple
            />


            {/* Yüklenen resimleri göster */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                {images.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`Yüklenen ${i + 1}`} className="rounded-lg shadow h-32 object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, index) => index !== i))}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || images.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Ekleniyor...' : 'Aracı Ekle'}
          </button>
        </form>
      </div>
    </div>
  );
}

// input stilini kolayca tanımlayalım
const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";