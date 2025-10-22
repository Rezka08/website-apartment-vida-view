import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Star, 
  User, 
  Calendar,
  ThumbsUp,
  Filter,
  Camera,
  X
} from "lucide-react";
import { toast } from "sonner";

export default function Reviews({ onNavigate, currentUser, unitData }) {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [newReview, setNewReview] = useState({
    rating: 5,
    text: "",
    photos: []
  });

  const unit = unitData || {
    id: 1,
    name: "Studio Modern A",
    building: "Tower A"
  };

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userName: "Budi Santoso",
      userAvatar: null,
      rating: 5,
      date: "2025-10-15",
      text: "Unit sangat nyaman dan bersih. Lokasi strategis dekat dengan berbagai fasilitas. Pengelola sangat responsif.",
      photos: [],
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      userName: "Sarah Johnson",
      userAvatar: null,
      rating: 4,
      date: "2025-10-10",
      text: "Overall bagus, hanya saja kadang lift agak lama. Tapi untuk fasilitas dan kenyamanan sudah sangat baik.",
      photos: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      userName: "Ahmad Yani",
      userAvatar: null,
      rating: 5,
      date: "2025-09-28",
      text: "Sangat puas tinggal di sini. View bagus, fasilitas lengkap, dan keamanan terjamin 24 jam.",
      photos: [],
      helpful: 15,
      verified: true
    },
    {
      id: 4,
      userName: "Lisa Chen",
      userAvatar: null,
      rating: 3,
      date: "2025-09-20",
      text: "Unit cukup baik tapi ada beberapa maintenance yang perlu diperbaiki. AC kadang kurang dingin.",
      photos: [],
      helpful: 5,
      verified: false
    }
  ];

  useEffect(() => {
    // Load reviews (would be API call)
    setReviews(mockReviews);
  }, []);

  const getFilteredAndSortedReviews = () => {
    let filtered = [...reviews];

    // Filter by rating
    if (filterRating !== "all") {
      filtered = filtered.filter(review => review.rating === parseInt(filterRating));
    }

    // Sort
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "highest") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowest") {
      filtered.sort((a, b) => a.rating - b.rating);
    }

    return filtered;
  };

  const handleSubmitReview = () => {
    if (!currentUser) {
      toast.error("Silakan login untuk memberikan ulasan");
      onNavigate("login");
      return;
    }

    if (currentUser.role !== "penyewa") {
      toast.error("Hanya penyewa yang dapat memberikan ulasan");
      return;
    }

    if (!newReview.text.trim()) {
      toast.error("Mohon tulis ulasan Anda");
      return;
    }

    // Add new review (would be API call)
    const reviewToAdd = {
      id: reviews.length + 1,
      userName: currentUser.name,
      userAvatar: null,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      text: newReview.text,
      photos: newReview.photos,
      helpful: 0,
      verified: false
    };

    setReviews([reviewToAdd, ...reviews]);
    setShowReviewForm(false);
    setNewReview({ rating: 5, text: "", photos: [] });
    toast.success("Ulasan berhasil ditambahkan");
  };

  const handleHelpful = (reviewId) => {
    if (!currentUser) {
      toast.error("Silakan login untuk memberikan vote");
      return;
    }

    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
    toast.success("Terima kasih atas feedback Anda");
  };

  const calculateRatingStats = () => {
    const total = reviews.length;
    const average = total > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / total 
      : 0;

    const distribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    };

    return { total, average, distribution };
  };

  const stats = calculateRatingStats();
  const filteredReviews = getFilteredAndSortedReviews();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate("detail-unit", unit)}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Ulasan {unit.name}</h1>
                <p className="text-gray-600">{unit.building}</p>
              </div>
            </div>
            {currentUser && currentUser.role === "penyewa" && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Tulis Ulasan
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rating Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900">{stats.average.toFixed(1)}</div>
                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(stats.average) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">Berdasarkan {stats.total} ulasan</p>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-3">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400"
                        style={{ width: `${(stats.distribution[rating] / stats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {stats.distribution[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                >
                  <option value="all">Semua Rating</option>
                  <option value="5">5 Bintang</option>
                  <option value="4">4 Bintang</option>
                  <option value="3">3 Bintang</option>
                  <option value="2">2 Bintang</option>
                  <option value="1">1 Bintang</option>
                </select>

                <select
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="highest">Rating Tertinggi</option>
                  <option value="lowest">Rating Terendah</option>
                </select>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{review.userName}</h4>
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            <Calendar className="inline w-3 h-3 mr-1" />
                            {new Date(review.date).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{review.text}</p>

                  {review.photos && review.photos.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.photos.map((photo, idx) => (
                        <img
                          key={idx}
                          src={photo}
                          alt={`Review ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-4 border-t">
                    <button 
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
                    >
                      <ThumbsUp size={16} />
                      <span className="text-sm">Membantu ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              ))}

              {filteredReviews.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-600">Tidak ada ulasan yang sesuai dengan filter</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Tulis Ulasan</h2>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= newReview.rating 
                              ? "text-yellow-400 fill-current" 
                              : "text-gray-300"
                          } hover:text-yellow-400 hover:fill-current`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ulasan Anda
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows="6"
                    placeholder="Bagikan pengalaman Anda tentang unit ini..."
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto (Opsional)
                  </label>
                  <button className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg w-full hover:border-purple-600 flex items-center justify-center gap-2 text-gray-600">
                    <Camera size={20} />
                    <span>Tambah Foto</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Kirim Ulasan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}