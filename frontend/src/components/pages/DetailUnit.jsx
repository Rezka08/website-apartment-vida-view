import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Bed, 
  Bath, 
  Maximize, 
  MapPin, 
  Check, 
  Calendar,
  Heart,
  Star,
  Wifi,
  Car,
  Shield,
  Phone,
  Mail,
  Share2
} from "lucide-react";
import { toast } from "sonner";

export default function DetailUnit({ onNavigate, unitData, currentUser }) {
  const [activeTab, setActiveTab] = useState("detail");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const unit = unitData || {
    id: 1,
    name: "Studio Modern A",
    price: 3500000,
    bedrooms: 1,
    bathrooms: 1,
    size: 35,
    floor: "Lantai 5-10",
    building: "Tower A",
    available: true,
    description: "Unit apartemen modern dengan desain minimalis yang elegan. Dilengkapi dengan furniture berkualitas tinggi dan pemandangan kota yang menakjubkan.",
    rating: 4.5,
    reviews: 12
  };

  const images = [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
  ];

  const facilities = [
    { icon: Wifi, name: "WiFi High Speed" },
    { icon: Car, name: "Parkir Mobil" },
    { icon: Shield, name: "Security 24/7" },
    { name: "AC" },
    { name: "Water Heater" },
    { name: "Kitchen Set" },
    { name: "Lemari Pakaian" },
    { name: "Smart TV" },
    { name: "Balkon Pribadi" }
  ];

  const buildingFacilities = [
    "Kolam Renang",
    "Fitness Center",
    "24/7 Security",
    "CCTV",
    "Laundry Service",
    "Mini Market",
    "Food Court",
    "Rooftop Garden",
    "Children Playground",
    "Meeting Room"
  ];

  useEffect(() => {
    // Check if unit is in favorites (would be API call)
    if (currentUser && currentUser.role === "penyewa") {
      // Simulate checking favorites
      setIsFavorite(false);
    }
  }, [currentUser]);

  const handleToggleFavorite = () => {
    if (!currentUser) {
      toast.error("Silakan login terlebih dahulu");
      onNavigate("login");
      return;
    }

    if (currentUser.role !== "penyewa") {
      toast.error("Hanya penyewa yang dapat menambahkan favorit");
      return;
    }

    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Dihapus dari favorit" : "Ditambahkan ke favorit");
  };

  const handleBooking = () => {
    if (!currentUser) {
      toast.error("Silakan login terlebih dahulu untuk booking");
      onNavigate("login");
      return;
    }

    if (currentUser.role !== "penyewa") {
      toast.error("Hanya penyewa yang dapat melakukan booking");
      return;
    }

    onNavigate("booking", unit);
  };

  const handleViewReviews = () => {
    onNavigate("reviews", unit);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate("unit")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2" size={20} />
              Kembali ke Daftar Unit
            </button>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full border ${
                  isFavorite 
                    ? "bg-red-50 text-red-600 border-red-200" 
                    : "bg-white text-gray-600 border-gray-300"
                } hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button className="p-2 rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-6">
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-4 md:col-span-3">
                  <img
                    src={images[0]}
                    alt="Main"
                    className="w-full h-96 object-cover rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelectedImage(0);
                      setShowImageModal(true);
                    }}
                  />
                </div>
                <div className="hidden md:block col-span-1 space-y-2">
                  {images.slice(1, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Image ${idx + 2}`}
                      className="w-full h-[122px] object-cover rounded-lg cursor-pointer hover:opacity-90"
                      onClick={() => {
                        setSelectedImage(idx + 1);
                        setShowImageModal(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Unit Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{unit.name}</h1>
                  <p className="text-gray-600 flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {unit.building} • {unit.floor}
                  </p>
                </div>
                {unit.available ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Tersedia
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    Tidak Tersedia
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-current" size={20} />
                  <span className="ml-1 font-semibold">{unit.rating}</span>
                  <span className="text-gray-500 ml-1">({unit.reviews} ulasan)</span>
                </div>
                <button 
                  onClick={handleViewReviews}
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  Lihat semua ulasan →
                </button>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bed className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Kamar Tidur</p>
                    <p className="font-semibold">{unit.bedrooms} Kamar</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Bath className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Kamar Mandi</p>
                    <p className="font-semibold">{unit.bathrooms} Kamar</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Maximize className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Luas</p>
                    <p className="font-semibold">{unit.size} m²</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="border-b">
                <nav className="-mb-px flex space-x-8">
                  {["detail", "fasilitas", "lokasi"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? "border-purple-600 text-purple-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-6">
                {activeTab === "detail" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Deskripsi Unit</h3>
                    <p className="text-gray-700 mb-6">
                      {unit.description}
                    </p>
                    
                    <h3 className="text-lg font-semibold mb-4">Informasi Tambahan</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Tipe Unit</p>
                        <p className="font-medium">Studio</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Kondisi</p>
                        <p className="font-medium">Fully Furnished</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Listrik</p>
                        <p className="font-medium">2200 Watt</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Air</p>
                        <p className="font-medium">PDAM</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "fasilitas" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Fasilitas Unit</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {facilities.map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="text-green-500" size={20} />
                          <span className="text-gray-700">{facility.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-4">Fasilitas Gedung</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {buildingFacilities.map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="text-green-500" size={20} />
                          <span className="text-gray-700">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "lokasi" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Lokasi & Akses</h3>
                    <div className="bg-gray-100 rounded-lg h-64 mb-4 flex items-center justify-center">
                      <p className="text-gray-500">Map Placeholder</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-purple-600 mt-1" size={20} />
                        <div>
                          <p className="font-medium">Alamat</p>
                          <p className="text-gray-600">Jl. Sudirman No. 123, Jakarta Pusat</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Ke Stasiun MRT</p>
                          <p className="font-medium">5 menit</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Ke Mall Terdekat</p>
                          <p className="font-medium">10 menit</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Ke Bandara</p>
                          <p className="font-medium">30 menit</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Ke RS Terdekat</p>
                          <p className="font-medium">15 menit</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-1">Harga Sewa</p>
                <p className="text-3xl font-bold text-purple-600">
                  Rp {unit.price.toLocaleString('id-ID')}
                </p>
                <p className="text-gray-500 text-sm">/bulan</p>
              </div>

              <div className="space-y-3 mb-6">
                <button 
                  onClick={handleBooking}
                  disabled={!unit.available}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    unit.available
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {unit.available ? "Booking Sekarang" : "Tidak Tersedia"}
                </button>
                
                {currentUser && currentUser.role === "penyewa" && (
                  <button 
                    onClick={() => onNavigate("favorites")}
                    className="w-full py-3 px-4 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                  >
                    Lihat Favorit Saya
                  </button>
                )}

                <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Hubungi Pengelola
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Hubungi Kami</h3>
                <div className="space-y-3">
                  <a href="tel:+62211234567" className="flex items-center gap-3 text-gray-600 hover:text-purple-600">
                    <Phone size={18} />
                    <span>+62 21 1234 5678</span>
                  </a>
                  <a href="mailto:info@vidaview.com" className="flex items-center gap-3 text-gray-600 hover:text-purple-600">
                    <Mail size={18} />
                    <span>info@vidaview.com</span>
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Senin - Jumat: 08:00 - 17:00<br/>
                  Sabtu: 09:00 - 15:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              ✕
            </button>
            <img
              src={images[selectedImage]}
              alt="Unit"
              className="w-full h-auto max-h-screen object-contain"
            />
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(idx);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    selectedImage === idx ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}