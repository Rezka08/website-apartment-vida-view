import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";

export default function TenantProfile({ user, onNavigate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "08123456789",
    address: "Jl. Raya Kampus No. 123, Jakarta Selatan",
    joinDate: "2024-01-15"
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Silakan login terlebih dahulu</p>
          <button
            onClick={() => onNavigate("login")}
            className="btn-primary"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.success("Profil berhasil diperbarui!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: "08123456789",
      address: "Jl. Raya Kampus No. 123, Jakarta Selatan",
      joinDate: "2024-01-15"
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-purple-600">
                  {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{formData.name}</h1>
                <p className="text-gray-600">{user.role === "penyewa" ? "Penyewa" : "Pengelola"}</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary flex items-center"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profil
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="btn-primary flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-secondary flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Batal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Pribadi</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nama Lengkap
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Nomor Telepon
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{formData.phone}</p>
                )}
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Tanggal Bergabung
                </label>
                <p className="text-gray-900 font-medium">
                  {new Date(formData.joinDate).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Alamat
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="input-field resize-none"
                />
              ) : (
                <p className="text-gray-900 font-medium">{formData.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Keamanan</h2>
          <button className="btn-secondary">
            Ubah Password
          </button>
        </div>
      </div>
    </div>
  );
}