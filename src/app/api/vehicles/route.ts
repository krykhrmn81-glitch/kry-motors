import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Tüm araçları listele veya slug ile tek araç getir
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const cleanSlug = slug.trim().toLowerCase();
    const vehicle = await prisma.vehicle.findUnique({
      where: { slug: cleanSlug },
    });

    if (!vehicle) {
      return NextResponse.json({ error: 'Araç bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({ vehicle });
  }

  // Tüm araçlar
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ vehicles });
}

// POST: Yeni araç ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
      // POST içinde, data objesinin içinde:
      slug: `${body.brand?.toLowerCase().replace(/\s+/g, '-')}-${body.model?.toLowerCase().replace(/\s+/g, '-')}-${body.year}-${Math.floor(1000 + Math.random() * 9000)}`,    };

    // Zorunlu alan kontrolü
    if (!data.brand || !data.model || !data.year || !data.type) {
      return NextResponse.json({ error: 'Zorunlu alanlar eksik' }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.create({
      data,
    });

    return NextResponse.json({ vehicle, success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Araç ekleme hatası:', error);
    return NextResponse.json(
      { error: 'Araç eklenirken hata oluştu', details: error.message },
      { status: 500 }
    );
  }
}
