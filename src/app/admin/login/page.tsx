'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Şifreyi buraya yaz (örnek: "kry123")
    if (password === '2616Koray') {
      // LocalStorage'a giriş yapıldı diye işaret koy
      localStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin');
    } else {
      setError('Yanlış şifre!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Admin Giriş</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none text-lg"
              placeholder="Şifreyi girin"
            />
          </div>

          {error && <p className="text-red-600 text-center font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-lg transition transform hover:scale-105"
          >
            Giriş Yap
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          İpucu: Şifre "kry123"
        </p>
      </div>
    </div>
  );
}