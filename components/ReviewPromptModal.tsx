'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Gift, 
  Users, 
  Calendar,
  MapPin,
  X,
  Sparkles,
  Award
} from 'lucide-react';

interface ReviewPromptModalProps {
  bookingData: {
    bookingId: string;
    hotel: {
      name: string;
      location: string;
      image: string;
    };
    room: {
      name: string;
    };
    dates: {
      checkIn: Date;
      checkOut: Date;
      nights: number;
    };
    guests: {
      adults: number;
      children: number;
    };
  };
  onClose: () => void;
  onStartReview: () => void;
}

const ReviewPromptModal = ({ bookingData, onClose, onStartReview }: ReviewPromptModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
  
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleStartReview = () => {
    setIsClosing(true);
    setTimeout(() => {
      onStartReview();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
      isClosing ? 'opacity-0' : 'opacity-100'
    }`}>
      <Card className={`max-w-2xl w-full border-0 shadow-2xl transform transition-all duration-300 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        <CardContent className="p-0">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 p-8 text-white rounded-t-xl">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-t-xl">
              <div className="absolute top-4 left-8 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-12 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-12 right-20 w-8 h-8 bg-white/10 rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
              <p className="text-blue-100 text-lg">
                How was your stay at {bookingData.hotel.name}?
              </p>
            </div>
          </div>
{/* Content WRAPPER (cho phép cuộn) */}
  <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
          {/* Content */}
          <div className="p-8">
            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={bookingData.hotel.image} 
                  alt={bookingData.hotel.name}
                  className="w-16 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{bookingData.hotel.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    {bookingData.hotel.location}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Completed
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-3">
                  <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Duration</div>
                  <div className="font-semibold text-gray-900">{bookingData.dates.nights} nights</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Guests</div>
                  <div className="font-semibold text-gray-900">{bookingData.guests.adults} adults</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <Award className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <div className="text-xs text-gray-600">Room</div>
                  <div className="font-semibold text-gray-900 text-xs">{bookingData.room.name}</div>
                </div>
              </div>
            </div>

            {/* Benefits of Reviewing */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-900">Why share your experience?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Help Other Travelers</h4>
                    <p className="text-sm text-blue-800">Your honest feedback helps others make informed decisions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Gift className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-900">Earn Rewards</h4>
                    <p className="text-sm text-emerald-800">Get 100 loyalty points for completing your review</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900">Improve Service</h4>
                    <p className="text-sm text-purple-800">Hotels use your feedback to enhance their offerings</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-900">Build Your Profile</h4>
                    <p className="text-sm text-orange-800">Become a trusted reviewer in our community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartReview}
                className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Star className="w-5 h-5 mr-2" />
                Write Your Review
              </Button>
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1 h-12 text-gray-600 hover:text-gray-800"
              >
                Maybe Later
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>⭐ Takes only 3-5 minutes • 🎁 Earn 100 points • 👥 Help 1000+ travelers daily</p>
            </div>
          </div>
    </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPromptModal;