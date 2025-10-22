import React, { useState } from "react";
import { Menu, X, User, Heart } from "lucide-react";

export default function Navbar({ currentPage, onNavigate, currentUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "beranda", label: "Beranda" },
    { id: "unit", label: "Unit" },
    { id: "fasilitas", label: "Fasilitas" },
    { id: "lokasi", label: "Lokasi" },
    { id: "tentang", label: "Tentang" },
    { id: "kontak", label: "Kontak" },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center gap-2"
            onClick={() => handleNavClick("beranda")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg"></div>
            <span className="font-bold text-xl text-purple-600">Vida View</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`hover:text-purple-600 transition-colors ${
                  currentPage === item.id ? "text-purple-600 font-medium" : "text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* User Actions */}
            <div className="flex items-center gap-4 ml-6">
              {currentUser ? (
                <>
                  {currentUser.role === "penyewa" && (
                    <button
                      onClick={() => onNavigate("favorites")}
                      className="p-2 text-gray-600 hover:text-purple-600"
                      title="Favorit Saya"
                    >
                      <Heart size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (currentUser.role === "penyewa") {
                        onNavigate("portal-penyewa");
                      } else if (currentUser.role === "pengelola") {
                        onNavigate("portal-pengelola");
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    <User size={16} />
                    <span>Dashboard</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate("login")}
                    className="px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => onNavigate("register")}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Daftar
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-2 hover:bg-purple-50 ${
                  currentPage === item.id ? "text-purple-600 font-medium" : "text-gray-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="px-4 py-2 space-y-2 border-t mt-2">
              {currentUser ? (
                <>
                  {currentUser.role === "penyewa" && (
                    <button
                      onClick={() => {
                        onNavigate("favorites");
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-purple-600 border border-purple-600 rounded hover:bg-purple-50"
                    >
                      <Heart className="inline mr-2" size={16} />
                      Favorit Saya
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (currentUser.role === "penyewa") {
                        onNavigate("portal-penyewa");
                      } else if (currentUser.role === "pengelola") {
                        onNavigate("portal-pengelola");
                      }
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    <User className="inline mr-2" size={16} />
                    Dashboard
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate("login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("register");
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Daftar
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}