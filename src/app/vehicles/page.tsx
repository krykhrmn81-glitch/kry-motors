import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Vehicle } from "@/types/vehicle";

export const dynamic = "force-dynamic";

export default async function VehiclesPage() {
  const vehicles: Vehicle[] = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Tüm Araçlar</h1>

        {vehicles.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Henüz araç yok.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {vehicles.map((vehicle) => (
              <Link key={vehicle.id} href={`/vehicles/${vehicle.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  {vehicle.images ? (
                    <img
                      src={vehicle.images.split(",")[0]}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed w-full h-64" />
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-xl">
                      {vehicle.brand} {vehicle.model} ({vehicle.year})
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mt-4">
                      {vehicle.price ? `${vehicle.price.toLocaleString()} TL` : "Fiyat Sorunuz"}
                    </p>
                    <p className="text-gray-600 mt-2">
                      {vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : ""}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
