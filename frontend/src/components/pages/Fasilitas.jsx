import React from "react";
import {
  Waves,
  Dumbbell,
  Wifi,
  Car,
  Shield,
  Store,
  TreePine,
  Baby,
  Zap,
  Wind,
  Droplets,
  Building2
} from "lucide-react";

export default function Fasilitas() {
  const facilities = [
    {
      icon: Waves,
      title: "Kolam Renang",
      description: "Kolam renang outdoor dengan view kota yang menakjubkan. Dilengkapi dengan area khusus anak-anak.",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500"
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "Gym modern dengan peralatan lengkap dan instruktur profesional tersedia.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500"
    },
    {
      icon: Baby,
      title: "Kids Playground",
      description: "Area bermain anak yang aman dan nyaman dengan berbagai permainan edukatif.",
      image: "https://images.unsplash.com/photo-1587454683900-b2c3033f1c5e?w=500"
    },
    {
      icon: TreePine,
      title: "Taman & Jogging Track",
      description: "Taman hijau dengan jogging track untuk olahraga pagi dan sore yang menyegarkan.",
      image: "https://images.unsplash.com/photo-1591025207163-942350e47db2?w=500"
    },
    {
      icon: Store,
      title: "Minimarket",
      description: "Minimarket 24 jam untuk kebutuhan sehari-hari yang praktis.",
      image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500"
    },
    {
      icon: Car,
      title: "Parking Area",
      description: "Area parkir basement yang luas dengan sistem keamanan CCTV 24 jam.",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=500"
    },
    {
      icon: Wifi,
      title: "WiFi Area",
      description: "Internet berkecepatan tinggi tersedia di area publik.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500"
    },
    {
      icon: Shield,
      title: "Security 24/7",
      description: "Sistem keamanan berlapis dengan petugas security terlatih dan CCTV di setiap sudut.",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500"
    }
  ];

  const buildingFeatures = [
    { icon: Zap, title: "Genset Backup" },
    { icon: Wind, title: "Central AC" },
    { icon: Droplets, title: "Water Treatment" },
    { icon: Building2, title: "Smart Building" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fasilitas Premium
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Nikmati berbagai fasilitas lengkap untuk kenyamanan dan gaya hidup modern Anda
            </p>
          </div>
        </div>
      </section>

      {/* Main Facilities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <div className="h-48 md:h-full md:w-48 bg-gray-200">
                      <img
                        src={facility.image}
                        alt={facility.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <facility.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {facility.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Keunggulan Gedung
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Teknologi dan sistem modern untuk kenyamanan maksimal
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {buildingFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Jam Operasional Fasilitas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium text-gray-900">Kolam Renang</span>
                  <span className="text-gray-600">06:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium text-gray-900">Fitness Center</span>
                  <span className="text-gray-600">24 Jam</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium text-gray-900">Kids Playground</span>
                  <span className="text-gray-600">08:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium text-gray-900">Jogging Track</span>
                  <span className="text-gray-600">24 Jam</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium text-gray-900">Minimarket</span>
                  <span className="text-gray-600">24 Jam</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium text-gray-900">Security</span>
                  <span className="text-gray-600">24 Jam</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium text-gray-900">Lobby</span>
                  <span className="text-gray-600">24 Jam</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="font-medium text-gray-900">Management Office</span>
                  <span className="text-gray-600">08:00 - 17:00</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800 text-center">
                * Jam operasional dapat berubah pada hari libur nasional dan kondisi khusus tertentu
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}