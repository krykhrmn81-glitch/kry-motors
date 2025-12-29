'use client';

import { useState } from 'react';
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";
import { useRouter } from 'next/navigation';

export default function EditVehicleForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(initialData.images || []);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      ownerName: formData.get('ownerName') as string,
      city: formData.get('city') as string,
      ownerPhone: formData.get('ownerPhone') as string,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      year: Number(formData.get('year')),
      price: formData.get('price') ? Number(formData.get('price')) : null,
      mileage: formData.get('mileage') ? Number(formData.get('mileage')) : null,
      type: formData.get('type') as string,
      fuelType: formData.get('fuelType') as string,
      transmission: formData.get('transmission') as string,
      color: formData.get('color') as string,
      description: formData.get('description') as string,
      images: images.join(','),
      isFeatured: formData.get('isFeatured') === 'on',
    };

    try {
      const res = await fetch(`/api/vehicles/${initialData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('Değişiklikler kaydedildi!');
        router.push('/admin');
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || 'Kaydetme hatası');
      }
    } catch (err) {
      alert('Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* İlan Sahibi Bilgileri */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h2 className="text-xl font-semibold mb-6 text-blue-800">İlan Sahibi Bilgileri</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Sahibinin Adı</label>
            <input
              name="ownerName"
              defaultValue={initialData.ownerName || ''}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ahmet Yılmaz"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Şehir</label>
            <input
              name="city"
              defaultValue={initialData.city || ''}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="İstanbul"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Telefon (WhatsApp)</label>
            <input
              name="ownerPhone"
              defaultValue={initialData.ownerPhone || ''}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="+905551234567"
            />
          </div>
        </div>
      </div>

      {/* Araç Bilgileri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Marka</label>
          <input name="brand" defaultValue={initialData.brand} required className="w-full px-4 py-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Model</label>
          <input name="model" defaultValue={initialData.model} required className="w-full px-4 py-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Yıl</label>
          <input name="year" type="number" defaultValue={initialData.year} required className="w-full px-4 py-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Fiyat (TL)</label>
          <input name="price" type="number" defaultValue={initialData.price || ''} className="w-full px-4 py-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Kilometre</label>
          <input name="mileage" type="number" defaultValue={initialData.mileage || ''} className="w-full px-4 py-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tür</label>
          <select name="type" defaultValue={initialData.type} required className="w-full px-4 py-3 border rounded-lg">
            <option value="CAR">Araba</option>
            <option value="MOTORCYCLE">Motosiklet</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Yakıt Türü</label>
          <input name="fuelType" defaultValue={initialData.fuelType || ''} className="w-full px-4 py-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Vites</label>
          <input name="transmission" defaultValue={initialData.transmission || ''} className="w-full px-4 py-3 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Renk</label>
          <input name="color" defaultValue={initialData.color || ''} className="w-full px-4 py-3 border rounded-lg" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Açıklama</label>
        <textarea
          name="description"
          defaultValue={initialData.description || ''}
          rows={5}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isFeatured"
          id="isFeatured"
          defaultChecked={initialData.isFeatured}
          className="w-5 h-5"
        />
        <label htmlFor="isFeatured" className="text-lg">Öne Çıkanlara Ekle</label>
      </div>

      {/* Mevcut Resimler */}
      {images.length > 0 && (
        <div className="space-y-4">
          <p className="font-semibold">Mevcut Fotoğraflar</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {images.map((url: string, i: number) => (
              <div key={i} className="relative group">
                <img src={url} alt="Mevcut" className="rounded-lg h-32 object-cover shadow" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Yeni Fotoğraf Yükleme */}
      <div className="space-y-4">
        <p className="font-semibold">Yeni Fotoğraf Ekle</p>
        <UploadButton<OurFileRouter, "vehicleImages">
          endpoint="vehicleImages"
          onClientUploadComplete={(res) => {
            const newUrls = res.map((f) => f.url);
            setImages((prev) => [...prev, ...newUrls]);
          }}
          onUploadError={(error) => alert(`Hata: ${error.message}`)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg"
      >
        {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
      </button>
    </form>
  );
}