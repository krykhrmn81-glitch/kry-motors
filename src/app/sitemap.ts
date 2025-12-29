import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kry-motors.onrender.com'; // site URL'ni değiştir

  // Statik sayfalar
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    // diğer statik sayfalar...
  ];

  // Dinamik araç sayfaları (Prisma'dan çek)
  const vehicles = await prisma.vehicle.findMany({ select: { slug: true, updatedAt: true } });
  const dynamicPages = vehicles.map((vehicle) => ({
    url: `${baseUrl}/vehicles/${vehicle.slug}`,
    lastModified: vehicle.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPages, ...dynamicPages];
}