'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react'; // güzel çöp kutusu ikonu için

import { useRouter } from 'next/navigation';


interface Vehicle {
  id: string; // ← Number yerine string yaptık!
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number | null;
  images: string | null;
}


export default function AdminPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Giriş kontrolü
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    }
  }, [router]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles');
      const data = await res.json();
      setVehicles(data.vehicles || []);
    } catch (err) {
      alert('Araçlar yüklenirken hata oldu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = async (id: string, brand: string, model: string) => {
    if (!confirm(`${brand} ${model} aracını silmek istediğine emin misin?`)) return;

    try {
      console.log('Silme isteği gönderildi, ID:', id);

      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        const data = await res.json();
        alert('Araç başarıyla silindi!');
        setVehicles(vehicles.filter((v) => v.id !== id));
      } else {
        // Hata durumunda body'yi text olarak oku (JSON olmayabilir)
        const errorText = await res.text();
        alert(`Silme hatası: ${errorText || res.statusText}`);
        console.error('Silme hatası response:', errorText);
      }
    } catch (err: any) {
      alert('Bağlantı veya işlem hatası');
      console.error('Silme catch error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Paneli</h1>
          <Link
            href="/admin/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            + Yeni Araç Ekle
          </Link>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-xl text-gray-600">Henüz araç eklenmemiş.</p>
            <Link href="/admin/new" className="text-blue-600 hover:underline mt-4 inline-block">
              İlk aracı ekle →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => {
              const firstImage = vehicle.images?.split(',')[0]?.trim();

              return (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  {/* Resim */}
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">Resim yok</p>
                    </div>
                  )}

                  {/* Bilgiler */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      {vehicle.brand} {vehicle.model} ({vehicle.year})
                    </h3>
                    <p className="text-xl font-semibold text-blue-600 mb-4">
                      {vehicle.price
                        ? `${vehicle.price.toLocaleString()} TL`
                        : 'Fiyat için iletişime geçin'}
                    </p>

                    <div className="flex justify-between items-center">
                      {/* Tıklanınca detay sayfasına git */}
                      <Link
                        href={`/vehicles/${vehicle.slug}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Detay Gör →
                      </Link>

                      {/* Düzenleme Butonu */}
                      <Link
                        href={`/admin/edit/${vehicle.id}`}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg transition"
                        title="Düzenle"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>

                      {/* Silme Butonu */}
                      <button
                        onClick={() => handleDelete(vehicle.id, vehicle.brand, vehicle.model)}
                        className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition"
                        title="Sil"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}