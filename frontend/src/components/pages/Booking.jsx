import React, { useState } from "react";
import { Calendar, User, Mail, Phone, CreditCard, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Booking({ unit, user, onNavigate }) {
  const [formData, setFormData] = useState({
    startDate: "",
    duration: "6",
    paymentMethod: "transfer"
  });
  const [step, setStep] = useState(1); // 1: Form, 2: Confirmation, 3: Success

  if (!user || user.role !== "penyewa") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Akses Terbatas
          </h2>
          <p className="text-gray-500 mb-6">
            Hanya penyewa yang dapat melakukan booking
          </p>
          <button
            onClick={() => onNavigate("login")}
            className="btn-primary"
          >
            Masuk Sebagai Penyewa
          </button>
        </div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Pilih unit terlebih dahulu</p>
          <button
            onClick={() => onNavigate("daftar-unit")}
            className="btn-primary"
          >
            Lihat Daftar Unit
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateTotal = () => {
    const monthlyPrice = unit.price * parseInt(formData.duration);
    const deposit = unit.price;
    const adminFee = 500000;
    return monthlyPrice + deposit + adminFee;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.startDate) {
      toast.error("Silakan pilih tanggal mulai");
      return;
    }
    setStep(2);
  };

  const handleConfirm = () => {
    setStep(3);
    toast.success("Booking berhasil!");
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Berhasil!
          </h2>
          <p className="text-gray-600 mb-6">
            Booking Anda untuk {unit.name} telah berhasil diproses. Kami akan menghubungi Anda segera untuk konfirmasi lebih lanjut.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("portal-penyewa")}
              className="w-full btn-primary"
            >
              Lihat Status Booking
            </button>
            <button
              onClick={() => onNavigate("daftar-unit")}
              className="w-full btn-secondary"
            >
              Kembali ke Daftar Unit
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setStep(1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Konfirmasi Booking
            </h2>

            <div className="space-y-6">
              {/* Unit Details */}
              <div className="border-b pb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Detail Unit</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unit:</span>
                    <span className="font-medium">{unit.name} - {unit.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga/bulan:</span>
                    <span className="font-medium">{formatPrice(unit.price)}</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border-b pb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Detail Booking</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal Mulai:</span>
                    <span className="font-medium">{new Date(formData.startDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durasi:</span>
                    <span className="font-medium">{formData.duration} bulan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metode Pembayaran:</span>
                    <span className="font-medium">
                      {formData.paymentMethod === "transfer" ? "Transfer Bank" : "Cicilan"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="border-b pb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Rincian Biaya</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sewa {formData.duration} bulan:</span>
                    <span className="font-medium">{formatPrice(unit.price * parseInt(formData.duration))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit:</span>
                    <span className="font-medium">{formatPrice(unit.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Admin:</span>
                    <span className="font-medium">Rp 500.000</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-purple-600">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              {/* Tenant Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Informasi Penyewa</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nama:</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleConfirm}
                className="w-full btn-primary"
              >
                Konfirmasi Booking
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full btn-secondary"
              >
                Edit Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate("detail-unit")}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Detail Unit</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Form Booking
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tenant Info (Read-only) */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Informasi Penyewa</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={user.name}
                        disabled
                        className="input-field pl-10 bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="input-field pl-10 bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="font-semibold text-gray-900">Detail Booking</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Mulai Sewa
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durasi Sewa
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="3">3 Bulan</option>
                      <option value="6">6 Bulan</option>
                      <option value="12">12 Bulan</option>
                      <option value="24">24 Bulan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Metode Pembayaran
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="transfer"
                          checked={formData.paymentMethod === "transfer"}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Transfer Bank</p>
                          <p className="text-sm text-gray-600">Bayar full dimuka</p>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="installment"
                          checked={formData.paymentMethod === "installment"}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">Cicilan</p>
                          <p className="text-sm text-gray-600">Bayar per bulan</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary">
                  Lanjutkan ke Konfirmasi
                </button>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Booking</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Unit</p>
                  <p className="font-semibold text-gray-900">{unit.name}</p>
                  <p className="text-sm text-purple-600">{unit.type}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sewa {formData.duration} bulan:</span>
                      <span className="font-medium">{formatPrice(unit.price * parseInt(formData.duration))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deposit:</span>
                      <span className="font-medium">{formatPrice(unit.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biaya Admin:</span>
                      <span className="font-medium">Rp 500.000</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>* Deposit akan dikembalikan saat kontrak berakhir</p>
                <p>* Biaya admin tidak dapat dikembalikan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}