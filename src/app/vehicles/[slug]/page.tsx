import { notFound } from 'next/navigation';
import VehicleGallery from '@/components/VehicleGallery';
import { prisma } from '@/lib/prisma';  // ← EKLE
import { Metadata } from 'next';

// Bu satırı ekle – her seferinde taze veri çeksin
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
  });

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

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // DOĞRUDAN PRISMA KULLAN
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
  });

  if (!vehicle) {
    notFound();
  }

  const images = vehicle.images
    ? vehicle.images.split(',').map((img: string) => img.trim())
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <VehicleGallery images={images} brand={vehicle.brand} />

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

            <div className="mt-12">
              <a
                href={`https://wa.me/905408119071?text=Merhaba,%20sitedeki%20${encodeURIComponent(
                  vehicle.brand + ' ' + vehicle.model + ' ' + vehicle.year
                )}%20aracıyla%20ilgileniyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-5 px-10 rounded-xl shadow-lg transition transform hover:scale-105"
              >
                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                WhatsApp ile İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}