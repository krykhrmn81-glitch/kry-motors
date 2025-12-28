'use client';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Opsiyonel pluginler (isteğe bağlı, daha güzel olsun diye)
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { useState } from "react";

type Props = {
  images: string[]; // sadece URL'ler
};

export default function VehicleLightbox({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Lightbox için gerekli formatta slides hazırla
  const slides = images.map((src) => ({
    src,
    // alt opsiyonel, ama iyi olur
  }));

  return (
    <>
      {/* Ana fotoğraf + küçük thumbnail'ler buraya gelecek, ama sen zaten VehicleGallery'de var.
          Orada ana fotoğrafa tıklayınca lightbox açılsın istiyoruz. */}
      
      {/* Bu component'i VehicleGallery yerine veya içinde kullanacağız */}

      {/* Geçici olarak ana fotoğrafa tıklama ekleyeceğiz aşağıda */}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index }) => setIndex(index) }}
        plugins={[Fullscreen, Zoom, Thumbnails]}
        // Mobil için swipe desteği otomatik var
        carousel={{ finite: images.length > 1 }}
        thumbnails={{ position: "bottom" }}
      />
    </>
  );
}