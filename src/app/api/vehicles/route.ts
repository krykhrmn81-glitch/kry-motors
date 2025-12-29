import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


const slugify = (text: string) => {
  const turkishMap: { [key: string]: string } = {
    'ğ': 'g', 'ü': 'u', 'ş': 's', 'ı': 'i', 'ö': 'o', 'ç': 'c', 'İ': 'i',
  };
  return text
    .toLowerCase()
    .replace(/[ğüşıöçİ]/g, (match) => turkishMap[match] || match)
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
};


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

    // GELEN VERİYİ GÖRELİM – EN ÖNEMLİ ADIM!
    console.log('Gelen body (düzenleme veya yeni ekleme):', body);

    const data = {
      ownerName: body.ownerName?.trim(),
      city: body.city?.trim(),
      ownerPhone: body.ownerPhone?.trim(),

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
      images: body.images && body.images.trim() !== '' ? body.images.trim() : null,
      isFeatured: body.isFeatured || false,

      slug: `${slugify(body.brand || 'marka')}-${slugify(body.model || 'model')}-${body.year}-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    // ŞİMDİLİK ZORUNLU KONTROLÜ GEVŞETTİK (test için)
    if (!data.brand || !data.model || !data.year || !data.type) {
      return NextResponse.json({ error: 'Temel zorunlu alanlar eksik (brand, model, year, type)' }, { status: 400 });
    }

    // ownerName, city, ownerPhone şimdilik zorunlu değil (sen dolduruyorsun zaten)
    // İleride tekrar zorunlu yaparız

    const vehicle = await prisma.vehicle.create({  // eğer edit varsa PUT olacak, ama şimdilik create varsayıyorum
      data,
    });

    return NextResponse.json({ vehicle, success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Araç kaydetme hatası:', error);
    return NextResponse.json(
      { error: 'Araç kaydedilirken hata oluştu', details: error.message },
      { status: 500 }
    );
  }
}

// PUT: Araç düzenleme
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = await request.json(); // id'yi body'den alıyoruz (veya url'den almak daha iyi ama şimdilik body'den)

    console.log('Düzenleme gelen body:', body);

    if (!id) {
      return NextResponse.json({ error: 'Araç ID gerekli' }, { status: 400 });
    }

    const data = {
      ownerName: body.ownerName?.trim() || null,
      city: body.city?.trim() || null,
      ownerPhone: body.ownerPhone?.trim() || null,

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
      images: body.images && body.images.trim() !== '' ? body.images.trim() : null,
      isFeatured: body.isFeatured || false,

      // Slug'ı yeniden oluştur (değişiklik olursa URL değişsin)
      slug: `${slugify(body.brand || 'marka')}-${slugify(body.model || 'model')}-${body.year}-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    // Zorunlu alan kontrolü (temel olanlar)
    if (!data.brand || !data.model || !data.year || !data.type) {
      return NextResponse.json({ error: 'Temel alanlar eksik' }, { status: 400 });
    }

    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data,
    });

    return NextResponse.json({ vehicle: updatedVehicle, success: true });
  } catch (error: any) {
    console.error('Araç düzenleme hatası:', error);
    return NextResponse.json(
      { error: 'Düzenleme hatası', details: error.message },
      { status: 500 }
    );
  }
}