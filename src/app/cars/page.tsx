import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getCars() {
  return await prisma.vehicle.findMany({
    where: { type: 'CAR' },
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

export default async function CarsPage() {
  const cars: Vehicle[] = await getCars();

  const getFirstImage = (images: string | null) => images?.split(',')[0]?.trim() || null;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">🚗 Arabalar</h1>

        {cars.length === 0 ? (
          <p className="text-center text-2xl text-gray-600">Henüz araba eklenmemiş.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cars.map((vehicle) => (
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
                    <p className="text-3xl font-bold text-blue-600">
                      {vehicle.price ? `${vehicle.price.toLocaleString()} TL` : 'Fiyat için iletişime geçin'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}