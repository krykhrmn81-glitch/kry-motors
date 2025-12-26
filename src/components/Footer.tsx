export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">KRY Motors</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Kaliteli, güvenilir ve uygun fiyatlı ikinci el araçlar. Size en uygun aracı bulmanız için buradayız.
        </p>

        <div className="flex justify-center space-x-8 mb-8">
          <a href="tel:+905408119071" className="hover:text-yellow-400 transition">
            📞 0 540 811 9071
          </a>
          <a href="https://wa.me/905408119071" target="_blank" className="hover:text-green-400 transition">
            💬 WhatsApp
          </a>
          <a href="mailto:info@krymotors.com" className="hover:text-yellow-400 transition">
            ✉️ krykhrmn8@gmail.com
          </a>
        </div>

        <p className="text-sm text-gray-400">
          © 2025 KRY Motors. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}