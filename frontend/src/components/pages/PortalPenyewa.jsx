import React, { useState } from "react";
import { 
  Home, 
  CreditCard, 
  Star, 
  User, 
  Calendar, 
  FileText, 
  Search, 
  MessageSquare,
  Download,
  Bell,
  Heart,
  Clock,
  CheckCircle,
  TrendingUp,
  Building2
} from "lucide-react";
import { toast } from "sonner";

export default function PortalPenyewa({ onNavigate, onLogout, userData }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const currentRental = {
    unit: "Studio Modern A",
    building: "Tower A - Lantai 8",
    startDate: "2024-06-01",
    endDate: "2025-06-01",
    monthlyRent: 3500000,
    nextPayment: "2025-11-01",
    contractStatus: "Aktif"
  };

  const paymentHistory = [
    { 
      id: "INV-001", 
      date: "2025-10-01", 
      amount: 3500000, 
      status: "paid", 
      method: "Transfer Bank" 
    },
    { 
      id: "INV-002", 
      date: "2025-09-01", 
      amount: 3500000, 
      status: "paid", 
      method: "Transfer Bank" 
    },
    { 
      id: "INV-003", 
      date: "2025-08-01", 
      amount: 3500000, 
      status: "paid", 
      method: "E-Wallet" 
    }
  ];

  const bookingHistory = [
    {
      id: "BK-001",
      unit: "Studio Modern A",
      checkIn: "2024-06-01",
      checkOut: "2025-06-01",
      status: "active"
    },
    {
      id: "BK-002",
      unit: "1BR Deluxe B-305",
      checkIn: "2023-01-01",
      checkOut: "2024-05-31",
      status: "completed"
    }
  ];

  const messages = [
    { 
      id: 1, 
      from: "Pengelola", 
      subject: "Pembayaran Bulan November", 
      date: "2025-10-07", 
      read: false, 
      preview: "Pengingat pembayaran sewa bulan November..." 
    },
    { 
      id: 2, 
      from: "Admin", 
      subject: "Informasi Fasilitas Baru", 
      date: "2025-10-03", 
      read: true, 
      preview: "Kami telah menambahkan fasilitas baru..." 
    }
  ];

  const notifications = [
    { 
      id: 1, 
      title: "Pembayaran Jatuh Tempo", 
      message: "Pembayaran sewa bulan November jatuh tempo pada 1 Nov 2025", 
      type: "warning", 
      date: "2025-10-25" 
    },
    { 
      id: 2, 
      title: "Kontrak Akan Berakhir", 
      message: "Kontrak sewa Anda akan berakhir dalam 3 bulan", 
      type: "info", 
      date: "2025-10-20" 
    }
  ];

  const favoriteUnits = [
    {
      id: 1,
      name: "2BR Executive Suite",
      price: 7500000,
      location: "Tower B - Lantai 15"
    },
    {
      id: 2,
      name: "Studio Deluxe",
      price: 4500000,
      location: "Tower A - Lantai 10"
    }
  ];

  const handlePayment = () => {
    toast.info("Mengarahkan ke halaman pembayaran...");
    // Implement payment logic
  };

  const handleDownloadInvoice = (invoiceId) => {
    toast.success(`Download invoice ${invoiceId}`);
  };

  const handleDownloadContract = () => {
    toast.success("Download kontrak berhasil");
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Home className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Unit Saya</p>
              <p className="text-lg font-semibold">{currentRental.unit}</p>
              <p className="text-xs text-gray-500">{currentRental.building}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sewa Bulanan</p>
              <p className="text-lg font-semibold">
                Rp {currentRental.monthlyRent.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-gray-500">Jatuh tempo: {currentRental.nextPayment}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Status Kontrak</p>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                {currentRental.contractStatus}
              </span>
              <p className="text-xs text-gray-500 mt-1">s/d {currentRental.endDate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Bell className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Notifikasi</p>
              <p className="text-lg font-semibold">{notifications.length} Baru</p>
              <p className="text-xs text-gray-500">Perlu perhatian Anda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Notifikasi Terbaru</h3>
        </div>
        <div className="p-6 space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-start gap-4 p-4 border rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                notif.type === "warning" ? "bg-yellow-100" : "bg-blue-100"
              }`}>
                {notif.type === "warning" ? (
                  <Bell className="w-5 h-5 text-yellow-600" />
                ) : (
                  <Bell className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1">{notif.title}</p>
                <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                <p className="text-xs text-gray-500">{notif.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab("payments")}
            className="p-6 border rounded-lg hover:border-purple-600 hover:bg-purple-50 text-center group"
          >
            <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-600 group-hover:text-purple-600" />
            <span className="text-sm">Bayar Sewa</span>
          </button>
          
          <button 
            onClick={() => onNavigate("favorites")}
            className="p-6 border rounded-lg hover:border-purple-600 hover:bg-purple-50 text-center group"
          >
            <Heart className="w-8 h-8 mx-auto mb-2 text-gray-600 group-hover:text-purple-600" />
            <span className="text-sm">Unit Favorit</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("search")}
            className="p-6 border rounded-lg hover:border-purple-600 hover:bg-purple-50 text-center group"
          >
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-600 group-hover:text-purple-600" />
            <span className="text-sm">Cari Unit Baru</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("documents")}
            className="p-6 border rounded-lg hover:border-purple-600 hover:bg-purple-50 text-center group"
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-gray-600 group-hover:text-purple-600" />
            <span className="text-sm">Dokumen</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Riwayat Pembayaran</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Invoice ID</th>
                    <th className="text-left py-2">Tanggal</th>
                    <th className="text-left py-2">Jumlah</th>
                    <th className="text-left py-2">Metode</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="py-3">{payment.id}</td>
                      <td className="py-3">{payment.date}</td>
                      <td className="py-3">Rp {payment.amount.toLocaleString('id-ID')}</td>
                      <td className="py-3">{payment.method}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          Lunas
                        </span>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => handleDownloadInvoice(payment.id)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Tagihan Berikutnya</h3>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Jumlah</p>
              <p className="text-2xl font-bold">Rp {currentRental.monthlyRent.toLocaleString('id-ID')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Jatuh Tempo</p>
              <p className="text-lg">{currentRental.nextPayment}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Status</p>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                Belum Dibayar
              </span>
            </div>
            <button 
              onClick={handlePayment}
              className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Riwayat Booking</h3>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Booking ID</th>
                <th className="text-left py-2">Unit</th>
                <th className="text-left py-2">Check-in</th>
                <th className="text-left py-2">Check-out</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="py-3">{booking.id}</td>
                  <td className="py-3">{booking.unit}</td>
                  <td className="py-3">{booking.checkIn}</td>
                  <td className="py-3">{booking.checkOut}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      booking.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status === 'active' ? 'Aktif' : 'Selesai'}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-purple-600 hover:text-purple-700">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Inbox</h3>
      </div>
      <div className="p-6 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
              !message.read ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{message.from}</p>
                  <p className="text-xs text-gray-500">{message.date}</p>
                </div>
              </div>
              {!message.read && (
                <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Baru</span>
              )}
            </div>
            <p className="font-medium mb-1">{message.subject}</p>
            <p className="text-sm text-gray-600">{message.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Cari Unit Lain</h3>
      </div>
      <div className="p-12 text-center">
        <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-lg mb-4">Ingin pindah atau mencari unit tambahan?</p>
        <button 
          onClick={() => onNavigate("unit")}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Browse Katalog Unit
        </button>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Dokumen & Kontrak</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <FileText className="text-purple-600" size={24} />
            <div>
              <p className="font-medium">Kontrak Sewa Unit</p>
              <p className="text-sm text-gray-600">Studio Modern A - Periode 2024-2025</p>
            </div>
          </div>
          <button 
            onClick={handleDownloadContract}
            className="px-4 py-2 text-purple-600 border border-purple-600 rounded hover:bg-purple-50"
          >
            Download
          </button>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <FileText className="text-purple-600" size={24} />
            <div>
              <p className="font-medium">Kartu Identitas (KTP)</p>
              <p className="text-sm text-gray-600">Terverifikasi</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
            Verified
          </span>
        </div>
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Unit Favorit</h3>
          <button 
            onClick={() => onNavigate("favorites")}
            className="text-purple-600 hover:text-purple-700 text-sm"
          >
            Lihat Semua →
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {favoriteUnits.map((unit) => (
          <div key={unit.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">{unit.name}</p>
              <p className="text-sm text-gray-600">{unit.location}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-purple-600">
                Rp {unit.price.toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-gray-500">/bulan</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => onNavigate("tenant-profile")}
              >
                <User className="text-purple-600" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">Portal Penyewa</h1>
                <p className="text-purple-200">Selamat datang, {userData?.name || "Penyewa"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate("tenant-profile")}
                className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30"
              >
                <User className="inline mr-2" size={16} />
                Profil
              </button>
              <button 
                onClick={onLogout}
                className="px-4 py-2 bg-white text-purple-600 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: "dashboard", label: "Dashboard", icon: Home },
              { id: "payments", label: "Pembayaran", icon: CreditCard },
              { id: "bookings", label: "Booking", icon: Calendar },
              { id: "favorites", label: "Favorit", icon: Heart },
              { id: "messages", label: "Pesan", icon: MessageSquare },
              { id: "search", label: "Cari Unit", icon: Search },
              { id: "documents", label: "Dokumen", icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "payments" && renderPayments()}
        {activeTab === "bookings" && renderBookings()}
        {activeTab === "favorites" && renderFavorites()}
        {activeTab === "messages" && renderMessages()}
        {activeTab === "search" && renderSearch()}
        {activeTab === "documents" && renderDocuments()}
      </div>
    </div>
  );
}