'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function VehicleGallery({
  images,
  brand,
}: {
  images: string[];
  brand: string;
}) {
  const [mainImage, setMainImage] = useState(images[0] || '');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentIndex = images.findIndex((img) => img === mainImage);

  const goPrev = () => {
    const prevIndex = currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    setMainImage(images[prevIndex]);
  };

  const goNext = () => {
    const nextIndex = currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
    setMainImage(images[nextIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'Escape') setIsFullscreen(false);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Büyük Resim Alanı */}
        <div
          className="relative group rounded-lg overflow-hidden shadow-lg"
          onKeyDown={handleKeyDown}
          tabIndex={0} // Klavye erişimi için
        >
          {mainImage ? (
            <img
              src={mainImage}
              alt={brand}
              className="w-full h-96 object-cover rounded-lg transition-transform duration-300"
            />
          ) : (
            <div className="bg-gray-200 border-2 border-dashed rounded-lg w-full h-96 flex items-center justify-center">
              <p className="text-gray-500 text-xl">Resim yok</p>
            </div>
          )}

          {/* Sol Ok */}
          {images.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 duration-300"
              aria-label="Önceki resim"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Sağ Ok */}
          {images.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 duration-300"
              aria-label="Sonraki resim"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Büyüteç - Sağ Üst */}
          {mainImage && (
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 duration-300"
              aria-label="Tam ekran"
            >
              <Maximize2 size={24} />
            </button>
          )}
        </div>

        {/* Thumbnail'lar */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  mainImage === img
                    ? 'border-blue-600 shadow-xl scale-105 ring-2 ring-blue-600 ring-offset-2'
                    : 'border-gray-300 hover:border-gray-500 hover:scale-105'
                }`}
              >
                <img
                  src={img}
                  alt={`${brand} thumbnail ${i + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tam Ekran Modal */}
      {isFullscreen && mainImage && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Kapat Butonu */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-8 right-8 text-white hover:text-gray-300 z-10"
          >
            <X size={48} />
          </button>

          {/* Modal İçinde Oklar */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-8 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft size={60} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-8 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight size={60} />
              </button>
            </>
          )}

          {/* Tam Ekran Resim */}
          <img
            src={mainImage}
            alt={brand}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()} // Resme tıklayınca kapanmasın
          />
        </div>
      )}
    </>
  );
}