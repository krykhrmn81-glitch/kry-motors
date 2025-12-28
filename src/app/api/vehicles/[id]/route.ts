import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE - zaten güzel çalışıyor, sadece küçük temizlik
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'ID eksik' }, { status: 400 });
    }

    const existingVehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingVehicle) {
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    await prisma.vehicle.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Araç başarıyla silindi' });
  } catch (error: any) {
    console.error('Silme hatası:', error);
    return NextResponse.json(
      { error: 'Silme başarısız', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Düzenleme için güçlendirilmiş hali
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Gelen veriyi temizle ve güvenli hale getir
    const data = {
      brand: body.brand?.trim(),
      model: body.model?.trim(),
      year: Number(body.year),
      price: body.price ? Number(body.price) : null,
      mileage: body.mileage ? Number(body.mileage) : null,
      type: body.type,
      fuelType: body.fuelType?.trim() || null,
      transmission: body.transmission?.trim() || null,
      color: body.color?.trim() || null,
      description: body.description?.trim() || null,
      images: body.images?.trim() === '' ? null : body.images?.trim(),
      isFeatured: body.isFeatured === true, // sadece true ise true olsun, yoksa false
      // SLUG'A DOKUNMUYORUZ! Eski linkler kırılmasın diye
    };

    // Zorunlu alan kontrolü (isteğe bağlı ama iyi olur)
    if (!data.brand || !data.model || !data.year || !data.type) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 });
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data,
    });

    return NextResponse.json({ vehicle: updatedVehicle, success: true });
  } catch (error: any) {
    console.error('Düzenleme hatası:', error);
    return NextResponse.json(
      { error: 'Güncelleme başarısız', details: error.message },
      { status: 500 }
    );
  }
}