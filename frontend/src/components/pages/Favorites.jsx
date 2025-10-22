import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize,
  Search,
  Filter,
  X
} from "lucide-react";
import { toast } from "sonner";

export default function Favorites({ onNavigate, currentUser }) {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Mock favorite units data
  const mockFavorites = [
    {
      id: 1,
      name: "Studio Modern A",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      price: 3500000,
      bedrooms: 1,
      bathrooms: 1,
      size: 35,
      floor: "Lantai 5",
      building: "Tower A",
      available: true,
      type: "Studio",
      addedDate: "2025-10-20"
    },
    {
      id: 2,
      name: "Deluxe 1BR",
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
      price: 5000000,
      bedrooms: 1,
      bathrooms: 1,
      size: 45,
      floor: "Lantai 11",
      building: "Tower B",
      available: true,
      type: "1 Bedroom",
      addedDate: "2025-10-18"
    },
    {
      id: 3,
      name: "Family Suite 2BR",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      price: 7500000,
      bedrooms: 2,
      bathrooms: 2,
      size: 65,
      floor: "Lantai 15",
      building: "Tower C",
      available: false,
      type: "2 Bedroom",
      addedDate: "2025-10-15"
    }
  ];

  useEffect(() => {
    // Load favorites (would be API call)
    setFavorites(mockFavorites);
    setFilteredFavorites(mockFavorites);
  }, []);

  useEffect(() => {
    // Filter favorites based on search and filters
    let filtered = [...favorites];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(unit =>
        unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.building.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (filterPrice !== "all") {
      filtered = filtered.filter(unit => {
        if (filterPrice === "low") return unit.price < 5000000;
        if (filterPrice === "mid") return unit.price >= 5000000 && unit.price <= 7000000;
        if (filterPrice === "high") return unit.price > 7000000;
        return true;
      });
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter(unit => unit.type === filterType);
    }

    setFilteredFavorites(filtered);
  }, [searchTerm, filterPrice, filterType, favorites]);

  const handleRemoveFavorite = (unitId) => {
    const updatedFavorites = favorites.filter(unit => unit.id !== unitId);
    setFavorites(updatedFavorites);
    toast.success("Unit dihapus dari favorit");
  };

  const handleViewDetail = (unit) => {
    onNavigate("detail-unit", unit);
  };

  const handleBooking = (unit) => {
    if (!unit.available) {
      toast.error("Unit ini sedang tidak tersedia");
      return;
    }
    onNavigate("booking", unit);
  };

  if (!currentUser || currentUser.role !== "penyewa") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Akses Terbatas</h3>
          <p className="text-gray-600 mb-4">Hanya penyewa yang dapat mengakses halaman favorit</p>
          <button
            onClick={() => onNavigate("login")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Login sebagai Penyewa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate("portal-penyewa")}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Unit Favorit Saya</h1>
                <p className="text-gray-600">
                  {favorites.length} unit tersimpan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari unit favorit..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Price Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
            >
              <option value="all">Semua Harga</option>
              <option value="low">&lt; Rp 5.000.000</option>
              <option value="mid">Rp 5.000.000 - 7.000.000</option>
              <option value="high">&gt; Rp 7.000.000</option>
            </select>

            {/* Type Filter */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Semua Tipe</option>
              <option value="Studio">Studio</option>
              <option value="1 Bedroom">1 Bedroom</option>
              <option value="2 Bedroom">2 Bedroom</option>
              <option value="3 Bedroom">3 Bedroom</option>
            </select>

            {/* Clear Filters */}
            {(searchTerm || filterPrice !== "all" || filterType !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterPrice("all");
                  setFilterType("all");
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {favorites.length === 0 ? "Belum ada unit favorit" : "Tidak ada unit yang sesuai filter"}
            </h3>
            <p className="text-gray-600 mb-6">
              {favorites.length === 0 
                ? "Tambahkan unit ke favorit untuk melihatnya di sini"
                : "Coba ubah filter pencarian Anda"}
            </p>
            {favorites.length === 0 && (
              <button
                onClick={() => onNavigate("unit")}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Jelajahi Unit
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((unit) => (
              <div key={unit.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="w-full h-56 object-cover"
                  />
                  {/* Remove Favorite Button */}
                  <button
                    onClick={() => handleRemoveFavorite(unit.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50"
                  >
                    <Heart className="text-red-500 fill-current" size={20} />
                  </button>
                  
                  {/* Availability Badge */}
                  {unit.available ? (
                    <span className="absolute top-4 left-4 px-2 py-1 bg-green-500 text-white text-xs rounded">
                      Tersedia
                    </span>
                  ) : (
                    <span className="absolute top-4 left-4 px-2 py-1 bg-red-500 text-white text-xs rounded">
                      Tidak Tersedia
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{unit.name}</h3>
                  <p className="text-purple-600 font-bold text-xl mb-4">
                    Rp {unit.price.toLocaleString('id-ID')}/bulan
                  </p>
                  
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{unit.building} • {unit.floor}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span>{unit.bedrooms} BR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={16} />
                      <span>{unit.bathrooms} BA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize size={16} />
                      <span>{unit.size}m²</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    Ditambahkan: {new Date(unit.addedDate).toLocaleDateString('id-ID')}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewDetail(unit)}
                      className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50"
                    >
                      Detail
                    </button>
                    <button 
                      onClick={() => handleBooking(unit)}
                      disabled={!unit.available}
                      className={`flex-1 px-4 py-2 rounded ${
                        unit.available
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}