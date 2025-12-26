'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from "@uploadthing/react";

export default function EditVehiclePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Giriş kontrolü
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    }

    // Araç verisini çek
    fetch(`/api/vehicles/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setVehicle(data.vehicle);
        setImages(data.vehicle.images ? data.vehicle.images.split(',').map((img: string) => img.trim()) : []);
      });
  }, [params.id, router]);

  if (!vehicle) {
    return <div className="min-h-screen flex items-center justify-center"><p>Yükleniyor...</p></div>;
  }

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
      images: images.join(','),
      isFeatured: formData.get('isFeatured') === 'on',
    };

    try {
      const res = await fetch(`/api/vehicles/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('Araç başarıyla güncellendi!');
        router.push('/admin');
        router.refresh();
      } else {
        alert('Güncelleme hatası');
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
        <h1 className="text-3xl font-bold mb-8">Araç Düzenle</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Aynı form alanları ekleme sayfasından kopyala */}
          {/* value={vehicle.brand} gibi dolu gelsin */}

          <input name="brand" defaultValue={vehicle.brand} required className="input" />
          <input name="model" defaultValue={vehicle.model} required className="input" />
          <input name="year" type="number" defaultValue={vehicle.year} required className="input" />
          {/* ... diğer alanlar defaultValue ile */}

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              defaultChecked={vehicle.isFeatured}
              className="w-5 h-5"
            />
            <label htmlFor="isFeatured">Öne Çıkanlara Ekle</label>
          </div>

          {/* Çoklu fotoğraf kısmı aynı ekleme sayfasından */}
          {/* Yüklenen resimleri göster, yeni ekleyebilir, mevcutları silebilirsin */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg"
          >
            {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </form>
      </div>
    </div>
  );
}