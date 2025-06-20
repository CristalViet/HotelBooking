'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import HeaderNavbar from '@/components/HeaderNavbar';
import ConfirmationHeader from '@/components/ConfirmationHeader';
import BookingDetailCard from '@/components/BookingDetailCard';
import AddToCalendarButton from '@/components/AddToCalendarButton';
import ContinueExploringExperiences from '@/components/ContinueExploringExperiences';
import LoyaltyPointsEarned from '@/components/LoyaltyPointsEarned';
import FooterSection from '@/components/FooterSection';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock booking confirmation data - in a real app, this would come from the booking API
  const confirmationData = {
    bookingId: 'SF-' + Date.now().toString().slice(-8),
    status: 'confirmed',
    hotel: {
      id: 1,
      name: "Grand Palace Hotel",
      location: "Downtown Paris, France",
      address: "123 Champs-Élysées, 75008 Paris, France",
      rating: 4.8,
      reviews: 1247,
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400",
      phone: "+33 1 42 86 10 10",
      email: "reservations@grandpalace.com"
    },
    room: {
      id: 1,
      name: "Deluxe City View",
      size: "35 m²",
      occupancy: "2 guests",
      beds: "1 King Bed",
      price: 285,
      originalPrice: 320,
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400",
      amenities: ["City View", "Free WiFi", "Air Conditioning", "Minibar", "Safe"]
    },
    dates: {
      checkIn: new Date('2024-12-15'),
      checkOut: new Date('2024-12-18'),
      nights: 3
    },
    guests: {
      adults: 2,
      children: 0,
      primaryGuest: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567"
      }
    },
    pricing: {
      subtotal: 855,
      taxes: 103,
      serviceFee: 43,
      total: 1001,
      currency: 'USD',
      savings: 105
    },
    loyaltyPoints: {
      earned: 1001,
      previousBalance: 2500,
      newBalance: 3501,
      tier: 'Gold',
      nextTier: 'Platinum',
      pointsToNextTier: 1499
    },
    confirmationSent: {
      email: true,
      sms: true,
      timestamp: new Date()
    }
  };

  useEffect(() => {
    // Simulate loading confirmation data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Booking</h2>
          <p className="text-gray-600">Please wait while we confirm your reservation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavbar />
      
      <div className="pt-16">
        {/* Confirmation Header */}
        <ConfirmationHeader 
          bookingId={confirmationData.bookingId}
          hotelName={confirmationData.hotel.name}
          guestName={confirmationData.guests.primaryGuest.name}
        />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Booking Details */}
              <BookingDetailCard 
                confirmationData={confirmationData}
              />
              
              {/* Add to Calendar */}
              <AddToCalendarButton 
                bookingData={{
                  hotelName: confirmationData.hotel.name,
                  address: confirmationData.hotel.address,
                  checkIn: confirmationData.dates.checkIn,
                  checkOut: confirmationData.dates.checkOut,
                  bookingId: confirmationData.bookingId
                }}
              />
              
              {/* Continue Exploring */}
              <ContinueExploringExperiences 
                currentLocation={confirmationData.hotel.location}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Loyalty Points */}
                <LoyaltyPointsEarned 
                  loyaltyData={confirmationData.loyaltyPoints}
                />
                
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                      <div className="font-medium text-blue-900">Manage Booking</div>
                      <div className="text-sm text-blue-700">Modify or cancel reservation</div>
                    </button>
                    <button className="w-full p-3 text-left bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors">
                      <div className="font-medium text-emerald-900">Contact Hotel</div>
                      <div className="text-sm text-emerald-700">Special requests or questions</div>
                    </button>
                    <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                      <div className="font-medium text-purple-900">Travel Insurance</div>
                      <div className="text-sm text-purple-700">Protect your trip</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}