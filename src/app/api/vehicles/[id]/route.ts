import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// params artık Promise, await ile açıyoruz
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ← BURASI KRİTİK: await ile açıyoruz

    if (!id) {
      return NextResponse.json({ error: 'ID eksik' }, { status: 400 });
    }

    console.log('DELETE route çalışıyor, gelen ID:', id);

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      console.log('Araç bulunamadı:', id);
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    await prisma.vehicle.delete({
      where: { id },
    });

    console.log('Araç başarıyla silindi:', id);

    return NextResponse.json({ success: true, message: 'Araç silindi' }, { status: 200 });
  } catch (error: any) {
    console.error('Silme sırasında hata:', error);
    return NextResponse.json(
      { error: 'Silme başarısız', details: error.message || 'Bilinmeyen hata' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        brand: body.brand,
        model: body.model,
        year: body.year,
        price: body.price,
        mileage: body.mileage,
        type: body.type,
        fuelType: body.fuelType,
        transmission: body.transmission,
        color: body.color,
        description: body.description,
        images: body.images || null,
        isFeatured: body.isFeatured,
        slug: `${body.brand.toLowerCase().replace(/\s+/g, '-')}-${body.model.toLowerCase().replace(/\s+/g, '-')}-${body.year}-${Math.floor(1000 + Math.random() * 9000)}`, // slug'ı güncelle
      },
    });

    return NextResponse.json({ vehicle: updatedVehicle });
  } catch (error) {
    return NextResponse.json({ error: 'Güncelleme hatası' }, { status: 500 });
  }
}

