import React from "react";
import { Building2, Shield, Heart, MapPin, ArrowRight } from "lucide-react";

export default function Beranda({ onNavigate }) {
  const features = [
    {
      icon: Building2,
      title: "Unit Modern",
      description: "Desain interior yang elegan dan modern dengan perabotan berkualitas tinggi"
    },
    {
      icon: Shield,
      title: "Keamanan 24/7",
      description: "Sistem keamanan canggih dengan CCTV dan petugas security 24 jam"
    },
    {
      icon: Heart,
      title: "Fasilitas Lengkap",
      description: "Kolam renang, gym, taman bermain, dan berbagai fasilitas premium lainnya"
    },
    {
      icon: MapPin,
      title: "Lokasi Strategis",
      description: "Dekat dengan pusat perbelanjaan, sekolah, dan akses transportasi umum"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Temukan Hunian Impian Anda di VidaView
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Apartemen modern dengan fasilitas lengkap dan lokasi strategis untuk kehidupan yang lebih baik
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate("daftar-unit")}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Lihat Unit Tersedia</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate("lokasi")}
                className="border-2 border-white hover:bg-white hover:text-purple-600 font-semibold py-3 px-8 rounded-lg"
              >
                Lihat Lokasi
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249 250 251)"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih VidaView?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan hunian berkualitas dengan berbagai keunggulan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tipe Unit Tersedia
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pilih unit yang sesuai dengan kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Studio", "1 Bedroom", "2 Bedroom"].map((type, index) => (
              <div
                key={index}
                className="card hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {type}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mulai dari Rp {(3 + index * 2).toFixed(1)} juta/bulan
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>• Luas: {24 + index * 12} m²</li>
                    <li>• {index === 0 ? "Kamar tidur & ruang tamu menyatu" : `${index} kamar tidur`}</li>
                    <li>• 1 kamar mandi</li>
                    <li>• Dapur & balkon</li>
                  </ul>
                  <button
                    onClick={() => onNavigate("daftar-unit")}
                    className="w-full btn-primary"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Menemukan Hunian Impian Anda?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Daftar sekarang dan dapatkan penawaran spesial untuk Anda
          </p>
          <button
            onClick={() => onNavigate("register")}
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg"
          >
            Daftar Sekarang
          </button>
        </div>
      </section>
    </div>
  );
}