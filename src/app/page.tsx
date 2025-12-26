import Link from 'next/link';
import { prisma } from '@/lib/prisma';

async function getFeatured() {
  return await prisma.vehicle.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });
}

async function getAllVehicles() {
  return await prisma.vehicle.findMany({
    orderBy: { createdAt: 'desc' },
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
  const featured = await getFeatured();
  const allVehicles = await getAllVehicles();

  const getFirstImage = (images: string | null) => images?.split(',')[0]?.trim() || null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Öne Çıkanlar */}
      {featured.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Öne Çıkanlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featured.map((vehicle: Vehicle) => (
                <Link key={vehicle.id} href={`/vehicles/${vehicle.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300">
                    {getFirstImage(vehicle.images) ? (
                      <img src={getFirstImage(vehicle.images)!} alt="" className="w-full h-72 object-cover" />
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
          </div>
        </section>
      )}
    </div>
  );
}