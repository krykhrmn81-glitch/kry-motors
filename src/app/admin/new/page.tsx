'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/route";

export default function NewVehiclePage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      // YENİ ALANLAR - EN ÜSTTE
      ownerName: formData.get('ownerName') as string,
      city: formData.get('city') as string,
      ownerPhone: formData.get('ownerPhone') as string,

      brand: formData.get('brand') as string,
      model: formData.get('model') as string,
      year: Number(formData.get('year')),
      price: formData.get('price') ? Number(formData.get('price')) : null,
      mileage: formData.get('mileage') ? Number(formData.get('mileage')) : null,
      type: formData.get('type'),
      fuelType: formData.get('fuelType'),
      transmission: formData.get('transmission'),
      color: formData.get('color'),
      description: formData.get('description'),
      images: images.join(','),
      isFeatured: formData.get('isFeatured') === 'on',
    };

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.message || 'Hata oldu, tekrar dene');
      }
    } catch (err) {
      alert('Bir şeyler ters gitti');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Yeni Araç Ekle</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* YENİ ALANLAR - EN ÜSTTE (mavi kutu içinde) */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h2 className="text-xl font-semibold mb-6 text-blue-800">İlan Sahibi Bilgileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sahibinin Adı *
                </label>
                <input
                  name="ownerName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir *
                </label>
                <select
                  name="city"
                  required
                  defaultValue=""
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="" disabled>Şehir Seçiniz</option>
                  <option value="Adana">Adana</option>
                  <option value="Adıyaman">Adıyaman</option>
                  <option value="Afyonkarahisar">Afyonkarahisar</option>
                  <option value="Ağrı">Ağrı</option>
                  <option value="Amasya">Amasya</option>
                  <option value="Ankara">Ankara</option>
                  <option value="Antalya">Antalya</option>
                  <option value="Artvin">Artvin</option>
                  <option value="Aydın">Aydın</option>
                  <option value="Balıkesir">Balıkesir</option>
                  <option value="Bilecik">Bilecik</option>
                  <option value="Bingöl">Bingöl</option>
                  <option value="Bitlis">Bitlis</option>
                  <option value="Bolu">Bolu</option>
                  <option value="Burdur">Burdur</option>
                  <option value="Bursa">Bursa</option>
                  <option value="Çanakkale">Çanakkale</option>
                  <option value="Çankırı">Çankırı</option>
                  <option value="Çorum">Çorum</option>
                  <option value="Denizli">Denizli</option>
                  <option value="Diyarbakır">Diyarbakır</option>
                  <option value="Edirne">Edirne</option>
                  <option value="Elazığ">Elazığ</option>
                  <option value="Erzincan">Erzincan</option>
                  <option value="Erzurum">Erzurum</option>
                  <option value="Eskişehir">Eskişehir</option>
                  <option value="Gaziantep">Gaziantep</option>
                  <option value="Giresun">Giresun</option>
                  <option value="Gümüşhane">Gümüşhane</option>
                  <option value="Hakkari">Hakkari</option>
                  <option value="Hatay">Hatay</option>
                  <option value="Isparta">Isparta</option>
                  <option value="Mersin">Mersin</option>
                  <option value="İstanbul">İstanbul</option>
                  <option value="İzmir">İzmir</option>
                  <option value="Kars">Kars</option>
                  <option value="Kastamonu">Kastamonu</option>
                  <option value="Kayseri">Kayseri</option>
                  <option value="Kırklareli">Kırklareli</option>
                  <option value="Kırşehir">Kırşehir</option>
                  <option value="Kocaeli">Kocaeli</option>
                  <option value="Konya">Konya</option>
                  <option value="Kütahya">Kütahya</option>
                  <option value="Malatya">Malatya</option>
                  <option value="Manisa">Manisa</option>
                  <option value="Kahramanmaraş">Kahramanmaraş</option>
                  <option value="Mardin">Mardin</option>
                  <option value="Muğla">Muğla</option>
                  <option value="Muş">Muş</option>
                  <option value="Nevşehir">Nevşehir</option>
                  <option value="Niğde">Niğde</option>
                  <option value="Ordu">Ordu</option>
                  <option value="Rize">Rize</option>
                  <option value="Sakarya">Sakarya</option>
                  <option value="Samsun">Samsun</option>
                  <option value="Siirt">Siirt</option>
                  <option value="Sinop">Sinop</option>
                  <option value="Sivas">Sivas</option>
                  <option value="Tekirdağ">Tekirdağ</option>
                  <option value="Tokat">Tokat</option>
                  <option value="Trabzon">Trabzon</option>
                  <option value="Tunceli">Tunceli</option>
                  <option value="Şanlıurfa">Şanlıurfa</option>
                  <option value="Uşak">Uşak</option>
                  <option value="Van">Van</option>
                  <option value="Yozgat">Yozgat</option>
                  <option value="Zonguldak">Zonguldak</option>
                  <option value="Aksaray">Aksaray</option>
                  <option value="Bayburt">Bayburt</option>
                  <option value="Karaman">Karaman</option>
                  <option value="Kırıkkale">Kırıkkale</option>
                  <option value="Batman">Batman</option>
                  <option value="Şırnak">Şırnak</option>
                  <option value="Bartın">Bartın</option>
                  <option value="Ardahan">Ardahan</option>
                  <option value="Iğdır">Iğdır</option>
                  <option value="Yalova">Yalova</option>
                  <option value="Karabük">Karabük</option>
                  <option value="Kilis">Kilis</option>
                  <option value="Osmaniye">Osmaniye</option>
                  <option value="Düzce">Düzce</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sahibinin Telefonu * (+90 ile giriniz.)
                </label>
                <input
                  name="ownerPhone"
                  required
                  placeholder="+905551234567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Diğer Alanlar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input name="brand" placeholder="Marka (ör: Audi)" required className="input" />
            <input name="model" placeholder="Model (ör: A6)" required className="input" />
            <input name="year" type="number" placeholder="Yıl" required className="input" />
            <input name="price" type="number" placeholder="Fiyat (TL, boş bırakılabilir)" className="input" />
            <input name="mileage" type="number" placeholder="Kilometre (boş bırakılabilir)" className="input" />

            <select name="type" required className="input">
              <option value="">Tür Seç</option>
              <option value="CAR">Araba</option>
              <option value="MOTORCYCLE">Motosiklet</option>
            </select>

            <input name="fuelType" placeholder="Yakıt Türü" className="input" />
            <input name="transmission" placeholder="Vites" className="input" />
            <input name="color" placeholder="Renk" className="input" />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeatured"
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="isFeatured" className="text-lg font-medium">
              ⭐ Öne Çıkanlara Ekle
            </label>
          </div>

          <textarea
            name="description"
            placeholder="Açıklama (isteğe bağlı)"
            rows={5}
            className="input"
          />

          {/* Fotoğraf Yükleme */}
          <div className="space-y-4">
            <p className="font-semibold">Fotoğraflar (birden fazla seçebilirsin)</p>
            <UploadButton<OurFileRouter, "vehicleImages">
              endpoint="vehicleImages"
              onClientUploadComplete={(res) => {
                const newUrls = res.map((f) => f.url);
                setImages((prev) => [...prev, ...newUrls]);
                alert("Yükleme tamamlandı!");
              }}
              onUploadError={(error) => alert(`Hata: ${error.message}`)}
              appearance={{
                button: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg',
                allowedContent: 'text-gray-600 text-sm',
              }}
              content={{
                button: 'Fotoğrafları Yükle (Birden Fazla Seçebilirsin)',
                allowedContent: 'JPG, PNG (maks. 4MB)',
              }}
            />

            {images.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                {images.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`Yüklenen ${i + 1}`} className="rounded-lg shadow h-32 object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, index) => index !== i))}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || images.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Ekleniyor...' : 'Aracı Ekle'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Input sınıfı (mevcut stilini koruyoruz)
const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";