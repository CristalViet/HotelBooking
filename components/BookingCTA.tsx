'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Shield, 
  Clock, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  Calendar,
  Users
} from 'lucide-react';

interface Room {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
}

interface Guests {
  adults: number;
  children: number;
}

interface BookingCTAProps {
  selectedRoom: Room;
  checkIn?: Date;
  checkOut?: Date;
  guests: Guests;
}

const BookingCTA = ({ selectedRoom, checkIn, checkOut, guests }: BookingCTAProps) => {
  const [isBooking, setIsBooking] = useState(false);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const getTotalPrice = () => {
    const nights = calculateNights();
    return selectedRoom.price * nights;
  };

  const getTaxesAndFees = () => {
    return Math.round(getTotalPrice() * 0.12);
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getTaxesAndFees();
  };

  const getDiscountAmount = () => {
    if (!selectedRoom.originalPrice) return 0;
    const nights = calculateNights();
    return (selectedRoom.originalPrice - selectedRoom.price) * nights;
  };

  const handleBookNow = () => {
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      // In a real app, this would redirect to payment or show success
      alert('Booking initiated! You would be redirected to payment.');
    }, 2000);
  };

  const isBookingReady = checkIn && checkOut && guests.adults > 0;

  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardContent className="p-6 space-y-6">
        {/* Booking Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Booking Summary</h3>
          
          {/* Room Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">{selectedRoom.name}</h4>
            <div className="space-y-1 text-sm text-gray-600">
              {checkIn && checkOut && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {checkIn.toLocaleDateString()} - {checkOut.toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>
                  {guests.adults} adult{guests.adults > 1 ? 's' : ''}
                  {guests.children > 0 && `, ${guests.children} child${guests.children > 1 ? 'ren' : ''}`}
                </span>
              </div>
              {checkIn && checkOut && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{calculateNights()} night{calculateNights() > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price Breakdown */}
          {isBookingReady && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  ${selectedRoom.price} × {calculateNights()} night{calculateNights() > 1 ? 's' : ''}
                </span>
                <span className="font-medium">${getTotalPrice()}</span>
              </div>
              
              {getDiscountAmount() > 0 && (
                <div className="flex justify-between items-center text-emerald-600">
                  <span>Discount savings</span>
                  <span className="font-medium">-${getDiscountAmount()}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Taxes & fees</span>
                <span className="font-medium">${getTaxesAndFees()}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">${getFinalTotal()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Booking Benefits */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Booking Benefits</h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-3" />
              <span>Free cancellation until 24 hours before check-in</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Shield className="w-4 h-4 text-blue-600 mr-3" />
              <span>Secure payment with 256-bit SSL encryption</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <Clock className="w-4 h-4 text-purple-600 mr-3" />
              <span>Instant confirmation via email</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleBookNow}
            disabled={!isBookingReady || isBooking}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isBooking ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                {isBookingReady ? `Book Now - $${getFinalTotal()}` : 'Select Dates to Book'}
              </div>
            )}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center justify-center gap-2 h-10"
            >
              <Phone className="w-4 h-4" />
              Call Hotel
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center gap-2 h-10"
            >
              <MessageCircle className="w-4 h-4" />
              Live Chat
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              <span>Secure Booking</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        {getDiscountAmount() > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-600 text-white">
                Limited Time
              </Badge>
              <span className="font-semibold text-emerald-900">
                Save ${getDiscountAmount()}!
              </span>
            </div>
            <p className="text-sm text-emerald-800">
              You're getting an exclusive discount on this booking. This offer expires soon!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCTA;