'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";

type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number | null;
  mileage: number | null;
  type: string;
  fuelType: string | null;
  transmission: string | null;
  color: string | null;
  description: string | null;
  images: string | null;
  isFeatured: boolean;
};

export default function EditVehicleForm({ vehicle }: { vehicle: Vehicle }) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(vehicle.images ? vehicle.images.split(',') : []);
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
      images: images.join(','),
      isFeatured: formData.get('isFeatured') === 'on',
    };

    try {
      const res = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const error = await res.json();
        alert('Hata: ' + (error.error || 'Düzenleme başarısız'));
      }
    } catch (err) {
      alert('Bir şeyler ters gitti');
    } finally {
      setLoading(false);
    }
  };

  // Form aynı yeni ekleme formu gibi olacak, sadece defaultValue'lar vehicle'dan gelecek
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Aynı inputlar yeni ekleme sayfasındaki gibi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="brand" defaultValue={vehicle.brand} required className="input" placeholder="Marka" />
        <input name="model" defaultValue={vehicle.model} required className="input" placeholder="Model" />
        <input name="year" type="number" defaultValue={vehicle.year} required className="input" />
        <input name="price" type="number" defaultValue={vehicle.price || ''} className="input" />
        <input name="mileage" type="number" defaultValue={vehicle.mileage || ''} className="input" />
        <select name="type" defaultValue={vehicle.type} required className="input">
          <option value="CAR">Araba</option>
          <option value="MOTORCYCLE">Motosiklet</option>
        </select>
        <input name="fuelType" defaultValue={vehicle.fuelType || ''} className="input" />
        <input name="transmission" defaultValue={vehicle.transmission || ''} className="input" />
        <input name="color" defaultValue={vehicle.color || ''} className="input" />
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="isFeatured"
          id="isFeatured"
          defaultChecked={vehicle.isFeatured}
          className="w-5 h-5 text-blue-600 rounded"
        />
        <label htmlFor="isFeatured" className="text-lg font-medium">⭐ Öne Çıkanlara Ekle</label>
      </div>

      <textarea name="description" defaultValue={vehicle.description || ''} rows={5} className="input" />

      {/* Fotoğraf kısmı aynı olacak */}
      <div className="space-y-4">
        <p className="font-semibold">Fotoğraflar</p>
        <UploadButton<OurFileRouter, "vehicleImages">
          endpoint="vehicleImages"
          onClientUploadComplete={(res) => {
            const newUrls = res.map((f) => f.url);
            setImages((prev) => [...prev, ...newUrls]);
          }}
          onUploadError={(error) => alert(`Hata: ${error.message}`)}
        />

        {images.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
            {images.map((url, i) => (
              <div key={i} className="relative group">
                <img src={url} alt="Foto" className="rounded-lg shadow h-32 object-cover" />
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, index) => index !== i))}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100"
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
        disabled={loading}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
      </button>
    </form>
  );
}

const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";