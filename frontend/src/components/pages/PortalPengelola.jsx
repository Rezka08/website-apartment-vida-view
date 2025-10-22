import React, { useState } from "react";
import {
  Home,
  Users,
  Building2,
  DollarSign,
  FileText,
  Settings,
  TrendingUp,
  LogOut,
  Plus
} from "lucide-react";

export default function PortalPengelola({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data - in production, this would come from API
  const stats = {
    totalUnits: 50,
    occupiedUnits: 38,
    availableUnits: 12,
    totalTenants: 38,
    monthlyRevenue: 175000000,
    pendingRequests: 5
  };

  const recentTenants = [
    {
      id: 1,
      name: "John Doe",
      unit: "Unit A-101",
      startDate: "2024-02-01",
      status: "active"
    },
    {
      id: 2,
      name: "Jane Smith",
      unit: "Unit B-205",
      startDate: "2024-01-15",
      status: "active"
    }
  ];

  const units = [
    {
      id: 1,
      name: "Unit A-101",
      type: "Studio",
      status: "tersewa",
      tenant: "John Doe",
      price: 3500000
    },
    {
      id: 2,
      name: "Unit A-102",
      type: "Studio",
      status: "tersedia",
      tenant: null,
      price: 3500000
    },
    {
      id: 3,
      name: "Unit B-205",
      type: "1 Bedroom",
      status: "tersewa",
      tenant: "Jane Smith",
      price: 5000000
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "units", icon: Building2, label: "Kelola Unit" },
    { id: "tenants", icon: Users, label: "Penyewa" },
    { id: "finance", icon: DollarSign, label: "Keuangan" },
    { id: "requests", icon: FileText, label: "Permintaan" },
    { id: "settings", icon: Settings, label: "Pengaturan" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                  Pengelola
                </span>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-purple-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Keluar</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Dashboard Pengelola
                  </h2>
                  <p className="text-gray-600">
                    Selamat datang, {user.name}. Berikut ringkasan VidaView Apartment.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Unit</p>
                        <p className="text-3xl font-bold text-purple-600">{stats.totalUnits}</p>
                      </div>
                      <Building2 className="w-12 h-12 text-purple-600" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Unit Tersewa</p>
                        <p className="text-3xl font-bold text-green-600">{stats.occupiedUnits}</p>
                      </div>
                      <TrendingUp className="w-12 h-12 text-green-600" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Unit Tersedia</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.availableUnits}</p>
                      </div>
                      <Building2 className="w-12 h-12 text-blue-600" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Penyewa</p>
                        <p className="text-3xl font-bold text-purple-600">{stats.totalTenants}</p>
                      </div>
                      <Users className="w-12 h-12 text-purple-600" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Pendapatan/Bulan</p>
                        <p className="text-2xl font-bold text-green-600">{formatPrice(stats.monthlyRevenue)}</p>
                      </div>
                      <DollarSign className="w-12 h-12 text-green-600" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Permintaan Pending</p>
                        <p className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</p>
                      </div>
                      <FileText className="w-12 h-12 text-yellow-600" />
                    </div>
                  </div>
                </div>

                {/* Recent Tenants */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Penyewa Terbaru</h3>
                  <div className="space-y-3">
                    {recentTenants.map((tenant) => (
                      <div key={tenant.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-purple-600">
                              {tenant.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{tenant.name}</p>
                            <p className="text-sm text-gray-600">{tenant.unit}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Mulai Sewa</p>
                          <p className="font-semibold">{new Date(tenant.startDate).toLocaleDateString('id-ID')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Units Tab */}
            {activeTab === "units" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Kelola Unit</h2>
                    <button className="btn-primary flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Unit
                    </button>
                  </div>

                  <div className="space-y-4">
                    {units.map((unit) => (
                      <div key={unit.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-bold text-gray-900 text-lg">{unit.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                unit.status === "tersedia"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {unit.status === "tersedia" ? "Tersedia" : "Tersewa"}
                              </span>
                            </div>
                            <p className="text-gray-600">{unit.type}</p>
                            {unit.tenant && (
                              <p className="text-sm text-purple-600 mt-1">Penyewa: {unit.tenant}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">{formatPrice(unit.price)}</p>
                            <p className="text-sm text-gray-600">/bulan</p>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button className="btn-secondary text-sm py-1 px-4">Edit</button>
                          <button className="text-sm py-1 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">Detail</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tenants Tab */}
            {activeTab === "tenants" && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Daftar Penyewa</h2>
                <div className="space-y-4">
                  {recentTenants.map((tenant) => (
                    <div key={tenant.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-purple-600">
                              {tenant.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{tenant.name}</p>
                            <p className="text-sm text-gray-600">{tenant.unit}</p>
                            <p className="text-xs text-gray-500">Mulai: {new Date(tenant.startDate).toLocaleDateString('id-ID')}</p>
                          </div>
                        </div>
                        <button className="btn-secondary text-sm py-2 px-4">Lihat Detail</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Tabs */}
            {(activeTab === "finance" || activeTab === "requests" || activeTab === "settings") && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeTab === "finance" && "Keuangan"}
                  {activeTab === "requests" && "Permintaan & Keluhan"}
                  {activeTab === "settings" && "Pengaturan"}
                </h2>
                <p className="text-gray-600">Fitur ini sedang dalam pengembangan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}