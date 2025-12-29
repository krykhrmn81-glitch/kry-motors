import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'KRY Motors - Kaliteli İkinci El Araçlar',
  description: 'İkinci el araba ve motosiklet ilanları. Güvenilir, temiz ve uygun fiyatlı araçlar.',
  openGraph: {
    title: 'Kry-Motors',
    description: 'Araba ve motor ilanları ve detayları.',
    url: 'https://kry-motors.onrender.com', // site URL'ni değiştir
    siteName: 'Kry-Motors',
    images: [
      {
        url: 'https://kry-motors.onrender.com/og-image.jpg', // OG image yükle
        width: 1200,
        height: 630,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kry-Motors',
    description: 'Araç ilanları burada!',
    images: ['https://kry-motors.onrender.com/og-image.jpg'],
  },
  robots: 'index, follow', // varsayılan
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <meta name="google-site-verification" content="mivA5fV1jZ38eYOPIJahvQPJhBR1lMa6Y_1gXN5iNpw" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Navbar />
        <main className="min-h-screen">{children}
        </main>
        <Footer />
      </body>
    </html>
  );
}