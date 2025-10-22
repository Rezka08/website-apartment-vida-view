import React from "react";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-purple-900 to-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg"></div>
              <span className="font-bold text-xl">Vida View</span>
            </div>
            <p className="text-purple-200 text-sm">
              Apartemen modern dengan pemandangan terbaik di kota. Hunian nyaman dengan fasilitas premium.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Unit Tersedia
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Fasilitas
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 text-purple-200">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Jalan Topaz Raya, Boulevard, Kelurahan Masale, Kecamatan Panakkukang, Makassar, Sulawesi Selatan.</span>
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <Phone size={16} className="flex-shrink-0" />
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-purple-200">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@vidaview.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-sm text-purple-200">
              Dapatkan informasi terbaru tentang unit dan promo menarik
            </p>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-8 text-center text-sm text-purple-200">
          <p>&copy; 2025 Vida View. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}