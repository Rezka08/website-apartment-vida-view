import React, { useState } from "react";
import { Search, Bed, Bath, Maximize, MapPin, Filter } from "lucide-react";

export default function DaftarUnit({ onNavigate, onSelectUnit }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("semua");
  const [filterPrice, setFilterPrice] = useState("semua");

  // Mock data - in production, this would come from API
  const units = [
    {
      id: 1,
      name: "Unit A-101",
      type: "Studio",
      price: 3500000,
      size: 24,
      bedrooms: 0,
      bathrooms: 1,
      floor: 1,
      status: "tersedia",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"
    },
    {
      id: 2,
      name: "Unit B-205",
      type: "1 Bedroom",
      price: 5000000,
      size: 36,
      bedrooms: 1,
      bathrooms: 1,
      floor: 2,
      status: "tersedia",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500"
    },
    {
      id: 3,
      name: "Unit C-310",
      type: "2 Bedroom",
      price: 7500000,
      size: 48,
      bedrooms: 2,
      bathrooms: 2,
      floor: 3,
      status: "tersedia",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500"
    },
    {
      id: 4,
      name: "Unit A-102",
      type: "Studio",
      price: 3500000,
      size: 24,
      bedrooms: 0,
      bathrooms: 1,
      floor: 1,
      status: "tersedia",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"
    },
    {
      id: 5,
      name: "Unit B-206",
      type: "1 Bedroom",
      price: 5200000,
      size: 38,
      bedrooms: 1,
      bathrooms: 1,
      floor: 2,
      status: "tersewa",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500"
    },
    {
      id: 6,
      name: "Unit C-315",
      type: "2 Bedroom",
      price: 8000000,
      size: 50,
      bedrooms: 2,
      bathrooms: 2,
      floor: 3,
      status: "tersedia",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500"
    }
  ];

  // Filter units based on search and filters
  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "semua" || unit.type === filterType;
    const matchesPrice = filterPrice === "semua" ||
                        (filterPrice === "low" && unit.price < 4000000) ||
                        (filterPrice === "mid" && unit.price >= 4000000 && unit.price < 6000000) ||
                        (filterPrice === "high" && unit.price >= 6000000);
    
    return matchesSearch && matchesType && matchesPrice && unit.status === "tersedia";
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Unit Tersedia
          </h1>
          <p className="text-gray-600">
            Temukan unit apartemen yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari unit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="input-field"
              >
                <option value="semua">Semua Tipe</option>
                <option value="Studio">Studio</option>
                <option value="1 Bedroom">1 Bedroom</option>
                <option value="2 Bedroom">2 Bedroom</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="input-field"
              >
                <option value="semua">Semua Harga</option>
                <option value="low">&lt; Rp 4 juta</option>
                <option value="mid">Rp 4-6 juta</option>
                <option value="high">&gt; Rp 6 juta</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan {filteredUnits.length} unit tersedia
          </p>
        </div>

        {/* Units Grid */}
        {filteredUnits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                className="card hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => {
                  onSelectUnit(unit);
                  onNavigate("detail-unit");
                }}
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={unit.image}
                    alt={unit.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Tersedia
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {unit.name}
                  </h3>
                  <p className="text-purple-600 font-semibold mb-3">
                    {unit.type}
                  </p>

                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Lantai {unit.floor}</span>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Maximize className="w-4 h-4 mr-1" />
                        <span>{unit.size} m²</span>
                      </div>
                      {unit.bedrooms > 0 && (
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          <span>{unit.bedrooms}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{unit.bathrooms}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Harga/bulan</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(unit.price)}
                        </p>
                      </div>
                      <button className="btn-primary text-sm py-2 px-4">
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tidak ada unit ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah filter pencarian Anda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}