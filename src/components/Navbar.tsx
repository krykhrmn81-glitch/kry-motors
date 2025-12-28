'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsAdminLoggedIn(loggedIn);
  }, []);

  const isAdminPage = pathname.startsWith('/admin');

  return (
    <header className="bg-black/90 backdrop-blur-md text-white shadow-2xl sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold tracking-wider hover:text-yellow-400 transition duration-300">
          KRY MOTORS
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center space-x-12 text-sm font-medium">
          <Link 
            href="/" 
            className={`hover:text-yellow-400 transition ${pathname === '/' ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : ''}`}
          >
            Ana Sayfa
          </Link>
          <Link 
            href="/cars" 
            className={`hover:text-yellow-400 transition ${pathname.startsWith('/arabalar') ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : ''}`}
          >
            Arabalar
          </Link>
          <Link 
            href="/motorcycles" 
            className={`hover:text-yellow-400 transition ${pathname.startsWith('/motosikletler') ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1' : ''}`}
          >
            Motosikletler
          </Link>

          {isAdminLoggedIn && !isAdminPage && (
            <Link href="/admin" className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg">
              Admin Paneli
            </Link>
          )}
          {isAdminLoggedIn && isAdminPage && (
            <button
              onClick={() => {
                localStorage.removeItem('adminLoggedIn');
                window.location.href = '/';
              }}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-bold transition shadow-lg"
            >
              Çıkış Yap
            </button>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-3xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 p-6 space-y-4 text-lg">
          <Link 
            href="/" 
            className="block hover:text-yellow-400"
            onClick={() => setMobileOpen(false)}
          >
            Ana Sayfa
          </Link>
          <Link 
            href="/cars" 
            className="block hover:text-yellow-400"
            onClick={() => setMobileOpen(false)}
          >
            Arabalar
          </Link>
          <Link 
            href="/motorcycles" 
            className="block hover:text-yellow-400"
            onClick={() => setMobileOpen(false)}
          >
            Motosikletler
          </Link>

          {isAdminLoggedIn && !isAdminPage && (
            <Link 
              href="/admin" 
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold block text-center"
              onClick={() => setMobileOpen(false)}
            >
              Admin Paneli
            </Link>
          )}

          {isAdminLoggedIn && isAdminPage && (
            <button
              onClick={() => {
                localStorage.removeItem('adminLoggedIn');
                window.location.href = '/';
              }}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-bold w-full"
            >
              Çıkış Yap
            </button>
          )}
        </div>
      )}
    </header>
  );
}
