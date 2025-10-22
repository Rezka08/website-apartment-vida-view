import React, { useState } from "react";
import { Toaster } from "sonner";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

// Pages
import Beranda from "./components/pages/Beranda";
import DaftarUnit from "./components/pages/DaftarUnit";
import DetailUnit from "./components/pages/DetailUnit";
import Booking from "./components/pages/Booking";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import PortalPenyewa from "./components/pages/PortalPenyewa";
import PortalPengelola from "./components/pages/PortalPengelola";
import Fasilitas from "./components/pages/Fasilitas";
import Lokasi from "./components/pages/Lokasi";
import Reviews from "./components/pages/Reviews";
import Favorites from "./components/pages/Favorites";

export default function App() {
  const [currentPage, setCurrentPage] = useState("beranda");
  const [user, setUser] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    // Navigate based on role
    if (userData.role === "penyewa") {
      setCurrentPage("portal-penyewa");
    } else if (userData.role === "pengelola") {
      setCurrentPage("portal-pengelola");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setFavorites([]);
    setCurrentPage("beranda");
  };

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
  };

  const handleToggleFavorite = (unit) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === unit.id);
      if (isFavorite) {
        return prev.filter(fav => fav.id !== unit.id);
      } else {
        return [...prev, unit];
      }
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "beranda":
        return <Beranda onNavigate={handleNavigate} />;
      
      case "daftar-unit":
        return (
          <DaftarUnit
            onNavigate={handleNavigate}
            onSelectUnit={handleSelectUnit}
          />
        );
      
      case "detail-unit":
        return (
          <DetailUnit
            unit={selectedUnit}
            onNavigate={handleNavigate}
            user={user}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      
      case "booking":
        return (
          <Booking
            unit={selectedUnit}
            user={user}
            onNavigate={handleNavigate}
          />
        );
      
      case "login":
        return (
          <Login
            onLogin={handleLogin}
            onNavigate={handleNavigate}
          />
        );
      
      case "register":
        return <Register onNavigate={handleNavigate} />;
      
      case "portal-penyewa":
        return (
          <PortalPenyewa
            user={user}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            favorites={favorites}
          />
        );
      
      case "portal-pengelola":
        return (
          <PortalPengelola
            user={user}
            onLogout={handleLogout}
          />
        );
      
      case "fasilitas":
        return <Fasilitas />;
      
      case "lokasi":
        return <Lokasi onNavigate={handleNavigate} />;
      
      case "reviews":
        return <Reviews user={user} onNavigate={handleNavigate} />;
      
      case "favorites":
        return (
          <Favorites
            favorites={favorites}
            onNavigate={handleNavigate}
            onSelectUnit={handleSelectUnit}
            onToggleFavorite={handleToggleFavorite}
            user={user}
          />
        );
      
      default:
        return <Beranda onNavigate={handleNavigate} />;
    }
  };

  // Don't show navbar and footer on portal pages
  const showNavAndFooter = ![
    "portal-penyewa",
    "portal-pengelola",
    "login",
    "register"
  ].includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" richColors />
      
      {showNavAndFooter && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
        />
      )}
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      {showNavAndFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}