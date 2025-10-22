import React from "react";
import {
  MapPin,
  Navigation,
  ShoppingBag,
  GraduationCap,
  Hospital,
  Utensils,
  Train,
  Plane,
  Building
} from "lucide-react";

export default function Lokasi({ onNavigate }) {
  const nearbyPlaces = [
    {
      icon: ShoppingBag,
      category: "Shopping",
      places: [
        { name: "Grand Mall Jakarta", distance: "500 m", time: "5 menit jalan kaki" },
        { name: "Plaza Senayan", distance: "2 km", time: "10 menit berkendara" },
        { name: "Pacific Place", distance: "3 km", time: "15 menit berkendara" }
      ]
    },
    {
      icon: GraduationCap,
      category: "Pendidikan",
      places: [
        { name: "SD Negeri 01", distance: "300 m", time: "3 menit jalan kaki" },
        { name: "SMP & SMA Favorit", distance: "800 m", time: "10 menit jalan kaki" },
        { name: "Universitas Indonesia", distance: "5 km", time: "15 menit berkendara" }
      ]
    },
    {
      icon: Hospital,
      category: "Kesehatan",
      places: [
        { name: "Klinik 24 Jam", distance: "200 m", time: "2 menit jalan kaki" },
        { name: "RS Siloam", distance: "1.5 km", time: "7 menit berkendara" },
        { name: "RS Medistra", distance: "3 km", time: "12 menit berkendara" }
      ]
    },
    {
      icon: Utensils,
      category: "Kuliner",
      places: [
        { name: "Food Court", distance: "100 m", time: "1 menit jalan kaki" },
        { name: "Restoran & Cafe", distance: "300 m", time: "3 menit jalan kaki" },
        { name: "Traditional Market", distance: "1 km", time: "5 menit berkendara" }
      ]
    },
    {
      icon: Train,
      category: "Transportasi",
      places: [
        { name: "Halte TransJakarta", distance: "200 m", time: "2 menit jalan kaki" },
        { name: "Stasiun MRT", distance: "500 m", time: "5 menit jalan kaki" },
        { name: "Terminal Bus", distance: "2 km", time: "10 menit berkendara" }
      ]
    },
    {
      icon: Plane,
      category: "Bandara",
      places: [
        { name: "Bandara Halim", distance: "15 km", time: "25 menit berkendara" },
        { name: "Bandara Soekarno-Hatta", distance: "30 km", time: "45 menit berkendara" }
      ]
    }
  ];

  const accessPoints = [
    { icon: Navigation, title: "Akses Tol", desc: "Pintu tol dalam radius 2 km" },
    { icon: Train, title: "Transportasi Umum", desc: "Halte & stasiun terdekat" },
    { icon: Building, title: "Pusat Bisnis", desc: "Dekat area perkantoran" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Lokasi Strategis
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
              Berada di jantung kota dengan akses mudah ke berbagai fasilitas penting
            </p>
            <div className="flex items-center justify-center text-lg">
              <MapPin className="w-5 h-5 mr-2" />
              <span>JL. Topaz Raya, Boulevard, Kelurahan Masale, Kecamatan Panakkukang, Makassar, Sulawesi Selatan.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Google Maps akan ditampilkan di sini
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Koordinat: -6.2088, 106.8456
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Buka di Google Maps
            </a>
            <button
              onClick={() => onNavigate("daftar-unit")}
              className="btn-secondary inline-flex items-center"
            >
              <Building className="w-4 h-4 mr-2" />
              Lihat Unit Tersedia
            </button>
          </div>
        </div>
      </section>

      {/* Access Points */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kemudahan Akses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Terhubung dengan berbagai akses transportasi utama
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accessPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fasilitas Terdekat
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Berbagai fasilitas penting dalam jangkauan mudah
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyPlaces.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <category.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.places.map((place, placeIndex) => (
                    <div
                      key={placeIndex}
                      className="flex items-start pb-3 border-b border-gray-100 last:border-0"
                    >
                      <MapPin className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {place.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {place.distance} • {place.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ingin Kunjungan Langsung?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Hubungi kami untuk jadwal site visit dan lihat sendiri lokasi strategis kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+622112345678"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg inline-flex items-center justify-center"
            >
              Hubungi Kami
            </a>
            <button
              onClick={() => onNavigate("register")}
              className="border-2 border-white hover:bg-white hover:text-purple-600 font-semibold py-3 px-8 rounded-lg"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}