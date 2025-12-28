import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getFeatured() {
  return await prisma.vehicle.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });
}

type Vehicle = {
  id: string;
  slug: string | null;
  images: string | null;
  brand: string;
  model: string;
  year: number;
  price: number | null;
};

export default async function HomePage() {
  const featured: Vehicle[] = await getFeatured();

  const getFirstImage = (images: string | null) => images?.split(',')[0]?.trim() || null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Öne Çıkanlar */}
      {featured.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">⭐ Öne Çıkanlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featured.map((vehicle: Vehicle) => (
                <Link key={vehicle.id} href={`/vehicles/${vehicle.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300">
                    {getFirstImage(vehicle.images) ? (
                      <img src={getFirstImage(vehicle.images)!} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-72 object-cover" />
                    ) : (
                      <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                        <p className="text-gray-500">Resim yok</p>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">
                        {vehicle.brand} {vehicle.model} ({vehicle.year})
                      </h3>
                      <p className="text-3xl font-bold text-blue-600 mb-4">
                        {vehicle.price ? `${vehicle.price.toLocaleString()} TL` : 'Fiyat için iletişime geçin'}
                      </p>
                      <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-semibold">
                        ⭐ Öne Çıkan
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* Sekmelere yönlendirme */}
            <div className="text-center mt-12">
              <p className="text-xl text-gray-700 mb-6">Tüm araçları görmek için:</p>
              <div className="flex justify-center gap-8">
                <Link href="/cars" className="text-xl font-bold hover:text-blue-800 transition">
                  🚗 Arabalar
                </Link>
                <Link href="/motorcycles" className="text-xl font-bold hover:text-red-800 transition">
                  🏍️ Motosikletler
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {featured.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-600">Henüz öne çıkan araç yok.</p>
        </div>
      )}
    </div>
  );
}