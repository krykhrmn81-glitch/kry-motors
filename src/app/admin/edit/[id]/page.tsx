import { prisma } from '@/lib/prisma';
import EditVehicleForm from '@/components/EditVehicleForm'; // yolunu kontrol et

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>; // Promise olduğunu belirtiyoruz
}) {
  // params'ı await ile açıyoruz
  const { id } = await params;

  console.log('ID başarıyla alındı:', id);

  if (!id) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-3xl font-bold">Hata: Araç ID bulunamadı</h1>
      </div>
    );
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    return (
      <div className="p-8 text-center text-red-600">
        <h1 className="text-3xl font-bold">Araç Bulunamadı</h1>
        <p>ID: {id}</p>
      </div>
    );
  }

  // Resimleri array'e çevir
  const imagesArray = vehicle.images ? vehicle.images.split(',') : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">
          Araç Düzenle - {vehicle.brand} {vehicle.model}
        </h1>
        <EditVehicleForm initialData={{ ...vehicle, images: imagesArray }} />
      </div>
    </div>
  );
}