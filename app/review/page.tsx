'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import HeaderNavbar from '@/components/HeaderNavbar';
import ReviewPromptModal from '@/components/ReviewPromptModal';
import StarRatingInput from '@/components/StarRatingInput';
import PhotoUploader from '@/components/PhotoUploader';
import TextareaFeedback from '@/components/TextareaFeedback';
import SubmitReviewButton from '@/components/SubmitReviewButton';
import FooterSection from '@/components/FooterSection';

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const [showPromptModal, setShowPromptModal] = useState(true);
  const [reviewData, setReviewData] = useState({
    overallRating: 0,
    categoryRatings: {
      cleanliness: 0,
      service: 0,
      location: 0,
      value: 0,
      amenities: 0,
      comfort: 0
    },
    title: '',
    feedback: '',
    photos: [] as File[],
    wouldRecommend: null as boolean | null,
    tripType: '',
    roomType: '',
    stayDuration: ''
  });

  // Mock booking data - in a real app, this would come from the booking ID
  const bookingData = {
    bookingId: 'SF-12345678',
    hotel: {
      id: 1,
      name: "Grand Palace Hotel",
      location: "Downtown Paris, France",
      address: "123 Champs-Élysées, 75008 Paris, France",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    room: {
      name: "Deluxe City View",
      type: "Deluxe Room"
    },
    dates: {
      checkIn: new Date('2024-12-15'),
      checkOut: new Date('2024-12-18'),
      nights: 3
    },
    guests: {
      adults: 2,
      children: 0
    }
  };

  const handleRatingChange = (category: string, rating: number) => {
    if (category === 'overall') {
      setReviewData(prev => ({ ...prev, overallRating: rating }));
    } else {
      setReviewData(prev => ({
        ...prev,
        categoryRatings: {
          ...prev.categoryRatings,
          [category]: rating
        }
      }));
    }
  };

  const handlePhotoUpload = (photos: File[]) => {
    setReviewData(prev => ({ ...prev, photos }));
  };

  const handleFeedbackChange = (field: string, value: string) => {
    setReviewData(prev => ({ ...prev, [field]: value }));
  };

  const isReviewComplete = () => {
    return reviewData.overallRating > 0 && 
           reviewData.title.trim() !== '' && 
           reviewData.feedback.trim() !== '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavbar />
      
      <div className="pt-16">
        {/* Review Prompt Modal */}
        {showPromptModal && (
          <ReviewPromptModal 
            bookingData={bookingData}
            onClose={() => setShowPromptModal(false)}
            onStartReview={() => setShowPromptModal(false)}
          />
        )}

        {/* Main Review Form */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How was your stay?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your feedback helps other travelers make informed decisions and helps hotels improve their service.
            </p>
          </div>

          {/* Hotel Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center gap-4">
              <img 
                src={bookingData.hotel.image} 
                alt={bookingData.hotel.name}
                className="w-20 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">{bookingData.hotel.name}</h2>
                <p className="text-gray-600">{bookingData.hotel.location}</p>
                <p className="text-sm text-gray-500">
                  {bookingData.room.name} • {bookingData.dates.nights} nights • 
                  {bookingData.dates.checkIn.toLocaleDateString()} - {bookingData.dates.checkOut.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Overall Rating */}
            <StarRatingInput
              title="Overall Rating"
              description="How would you rate your overall experience?"
              rating={reviewData.overallRating}
              onRatingChange={(rating) => handleRatingChange('overall', rating)}
              size="large"
              required
            />

            {/* Category Ratings */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Rate Different Aspects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(reviewData.categoryRatings).map(([category, rating]) => (
                  <StarRatingInput
                    key={category}
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                    rating={rating}
                    onRatingChange={(rating) => handleRatingChange(category, rating)}
                    size="medium"
                  />
                ))}
              </div>
            </div>

            {/* Written Feedback */}
            <TextareaFeedback
              reviewData={reviewData}
              onFeedbackChange={handleFeedbackChange}
              bookingData={bookingData}
            />

            {/* Photo Upload */}
            <PhotoUploader
              photos={reviewData.photos}
              onPhotoUpload={handlePhotoUpload}
            />

            {/* Submit Review */}
            <SubmitReviewButton
              reviewData={reviewData}
              bookingData={bookingData}
              isComplete={isReviewComplete()}
            />
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}