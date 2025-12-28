import { prisma } from '@/lib/prisma';
import EditVehicleForm from '@/components/EditVehicleForm';
import Link from 'next/link';

// params artık Promise olabilir, await etmeliyiz
type Props = {
  params: Promise<{ id: string }>;  // ← Promise ekle
};

export default async function EditVehiclePage({ params }: Props) {
  const { id } = await params;  // ← await ile aç

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-2xl text-red-600">Geçersiz ID!</p>
      </div>
    );
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-600 mb-4">Araç bulunamadı!</p>
          <Link href="/admin" className="text-blue-600 hover:underline">
            ← Admin panele dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Aracı Düzenle</h1>
          <Link href="/admin" className="text-blue-600 hover:underline">
            ← Geri Dön
          </Link>
        </div>

        <EditVehicleForm vehicle={vehicle} />
      </div>
    </div>
  );
}