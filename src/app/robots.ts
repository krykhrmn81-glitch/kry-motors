import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // admin ve API'yi gizle
    },
    sitemap: 'https://kry-motors.onrender.com/sitemap.xml', // site URL'ni değiştir
  };
}