import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import '@/app/globals.css';



export default async function ContactPage() {

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-12 text-gray-800"> İletişim</h1>

                <div className="">

                    <div className="w-full h-72 bg-gray-200 flex items-center justify-center grid">
                        <p className="rounded m-2 p-6 grid-row bg-yellow-400">Merhaba sitedeki ilanlar arasında sizin de ilanınızın yer almasını isterseniz iletişime geçebilirsiniz.</p>

                        <div className="flex justify-center space-x-4 mb-8 grid-row">
                            <a href="tel:+905408119071" className="hover:text-yellow-400 transition">
                                📞
                                <span className="whitespace-nowrap">0540 811 9071</span>
                            </a>
                            <a href="https://wa.me/905408119071" target="_blank" className="hover:text-green-400 transition">
                                💬 WhatsApp
                            </a>
                            <a href="mailto:krykhrmn8@gmail.com" className="hover:text-yellow-400 transition">
                                ✉
                                <span className="whitespace-nowrap"> E-Mail</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    );
}