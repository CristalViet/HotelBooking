'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HeaderNavbar from '@/components/HeaderNavbar';
import BookingSummary from '@/components/BookingSummary';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';
import CurrencySelector from '@/components/CurrencySelector';
import FormGuestInfo from '@/components/FormGuestInfo';
import TwoFAConfirmation from '@/components/TwoFAConfirmation';
import PolicyAgreement from '@/components/PolicyAgreement';
import TrustBadgeBar from '@/components/TrustBadgeBar';
import FooterSection from '@/components/FooterSection';

export default function BookingPage() {
  const searchParams = useSearchParams();
  
  // Mock booking data - in a real app, this would come from the previous page or API
  const bookingData = {
    hotel: {
      id: 1,
      name: "Grand Palace Hotel",
      location: "Downtown Paris, France",
      address: "123 Champs-Élysées, 75008 Paris, France",
      rating: 4.8,
      reviews: 1247,
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    room: {
      id: 1,
      name: "Deluxe City View",
      size: "35 m²",
      occupancy: "2 guests",
      beds: "1 King Bed",
      price: 285,
      originalPrice: 320,
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400"
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

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [guestInfo, setGuestInfo] = useState({});
  const [twoFAVerified, setTwoFAVerified] = useState(false);
  const [policiesAccepted, setPoliciesAccepted] = useState(false);

  const steps = [
    { id: 1, title: 'Guest Information', description: 'Enter your details' },
    { id: 2, title: 'Payment Method', description: 'Choose payment option' },
    { id: 3, title: 'Verification', description: 'Secure confirmation' },
    { id: 4, title: 'Review & Book', description: 'Final confirmation' }
  ];

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return Object.keys(guestInfo).length > 0;
      case 2:
        return selectedPaymentMethod !== '';
      case 3:
        return twoFAVerified;
      case 4:
        return policiesAccepted;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (canProceedToNext() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavbar />
      
      <div className="pt-16">
        {/* Progress Steps */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep >= step.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.id}
                    </div>
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-8 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Guest Information */}
              {currentStep === 1 && (
                <FormGuestInfo 
                  onGuestInfoChange={setGuestInfo}
                  guestInfo={guestInfo}
                />
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <CurrencySelector 
                    selectedCurrency={selectedCurrency}
                    onCurrencyChange={setSelectedCurrency}
                  />
                  <PaymentMethodSelector 
                    selectedMethod={selectedPaymentMethod}
                    onMethodChange={setSelectedPaymentMethod}
                  />
                </div>
              )}

              {/* Step 3: 2FA Verification */}
              {currentStep === 3 && (
                <TwoFAConfirmation 
                  onVerificationComplete={setTwoFAVerified}
                  isVerified={twoFAVerified}
                />
              )}

              {/* Step 4: Policy Agreement */}
              {currentStep === 4 && (
                <PolicyAgreement 
                  onPoliciesAccepted={setPoliciesAccepted}
                  policiesAccepted={policiesAccepted}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                
                <button
                  onClick={handleNextStep}
                  disabled={!canProceedToNext()}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    canProceedToNext()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentStep === 4 ? 'Complete Booking' : 'Continue →'}
                </button>
              </div>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <BookingSummary 
                  bookingData={bookingData}
                  currency={selectedCurrency}
                />
                <TrustBadgeBar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}