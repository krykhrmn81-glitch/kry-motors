import { notFound } from 'next/navigation';
import VehicleGallery from '@/components/VehicleGallery'; // birazdan oluşturacağız

import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(`http://localhost:3000/api/vehicles?slug=${slug}`);
  const data = await res.json();
  const vehicle = data.vehicle;

  if (!vehicle) return { title: 'Araç Bulunamadı' };

  const firstImage = vehicle.images?.split(',')[0]?.trim();

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} - KRY Motors`,
    description: `${vehicle.year} model ${vehicle.brand} ${vehicle.model}. ${vehicle.mileage ? vehicle.mileage.toLocaleString() + ' km' : ''} ${vehicle.price ? vehicle.price.toLocaleString() + ' TL' : 'Fiyat için iletişime geçin'}.`,
    openGraph: {
      images: firstImage ? [firstImage] : [],
    },
  };
}


async function getVehicle(slug: string) {
  const res = await fetch(`http://localhost:3000/api/vehicles?slug=${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.vehicle || null;
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  // Images'ı burada string array'e çeviriyoruz (server tarafında güvenli)
  const images = vehicle.images
    ? vehicle.images.split(',').map((img: string) => img.trim())
    : [];

  // Client component'e sadece gerekli verileri geçiyoruz (serializable olmalı)
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galeri - Client Component */}
          <VehicleGallery images={images} brand={vehicle.brand} />

          {/* Bilgiler - Server tarafında render */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {vehicle.brand} {vehicle.model} ({vehicle.year})
            </h1>
            <p className="text-3xl font-bold text-blue-600 mb-8">
              {vehicle.price
                ? `${vehicle.price.toLocaleString()} TL`
                : 'Fiyat için iletişime geçin'}
            </p>

            <div className="space-y-4 text-lg">
              <p><strong>Kilometre:</strong> {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'Belirtilmemiş'}</p>
              <p><strong>Yakıt:</strong> {vehicle.fuelType || 'Belirtilmemiş'}</p>
              <p><strong>Vites:</strong> {vehicle.transmission || 'Belirtilmemiş'}</p>
              <p><strong>Renk:</strong> {vehicle.color || 'Belirtilmemiş'}</p>
            </div>

            {vehicle.description && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Açıklama</h2>
                <p className="text-gray-700 whitespace-pre-line">{vehicle.description}</p>
              </div>
            )}
          </div>
          <div className="mt-12">
            <a
              href="https://wa.me/905408119071?text=Merhaba,%20sitedeki%20${encodeURIComponent(
      vehicle.brand + ' ' + vehicle.model + ' ' + vehicle.year
    )}%20aracıyla%20ilgileniyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-5 px-10 rounded-xl shadow-lg transition transform hover:scale-105"
            >
              <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.074-.149-.669-.718-.916-1.386-.247-.667-.015-.999.059-1.037.074-.037.297-.074.446-.074.149 0 .372.037.521.149.149.111.446.668.521.818.074.149.074.297 0 .446-.074.149-.223.297-.372.446-.149.149-.297.223-.074.371.223.149.669.668 1.017 1.017.347.347.818.594 1.164.669.347.074.595.037.818-.074.223-.111.521-.371.744-.594.223-.223.446-.297.595-.223.149.074.965.446 1.164.52.198.074.372.111.446.037.074-.074.595-.446.669-.594.074-.149.149-.297.149-.446 0-.149-.074-.297-.223-.446zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.691 16.691c-.297.446-.965.818-1.635.893-.67.074-1.56.037-2.578-.521-2.653-1.413-4.426-3.764-4.552-3.913-.126-.149-.297-.223-.297-.371 0-.149.074-.223.223-.297.149-.074.372-.149.595-.223.223-.074.446-.074.595.037.149.111.521.371.744.594.223.223.372.446.446.744.074.297.037.595-.149.818-.186.223-.521.446-.818.595-.297.149-.595.223-.893.223z" />
              </svg>
              WhatsApp ile İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}