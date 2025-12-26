'use client';

import { useState } from 'react';

export default function VehicleGallery({
  images,
  brand,
}: {
  images: string[];
  brand: string;
}) {
  const [mainImage, setMainImage] = useState(images[0] || null);

  return (
    <div className="space-y-4">
      {/* Büyük Resim */}
      <div className="relative">
        {mainImage ? (
          <img
            src={mainImage}
            alt={brand}
            className="w-full rounded-lg shadow-lg object-cover h-96"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
            <p className="text-gray-500 text-xl">Resim yok</p>
          </div>
        )}
      </div>

      {/* Thumbnail'lar */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setMainImage(img)}
              className={`rounded-lg overflow-hidden border-2 transition-all ${
                mainImage === img
                  ? 'border-blue-600 shadow-lg scale-105'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}