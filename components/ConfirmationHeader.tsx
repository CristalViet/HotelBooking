'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Mail, MessageSquare, Download, Share2, SettingsIcon as Confetti, Star, Gift } from 'lucide-react';

interface ConfirmationHeaderProps {
  bookingId: string;
  hotelName: string;
  guestName: string;
}

const ConfirmationHeader = ({ bookingId, hotelName, guestName }: ConfirmationHeaderProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className={`w-2 h-2 rounded-full ${
                ['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'][Math.floor(Math.random() * 5)]
              }`} />
            </div>
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="text-center text-white">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Booking Confirmed! 🎉
          </h1>
          
          <p className="text-xl md:text-2xl mb-2 text-white/90">
            Thank you, {guestName}!
          </p>
          
          <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
            Your reservation at <span className="font-semibold">{hotelName}</span> has been successfully confirmed. 
            Get ready for an amazing stay!
          </p>

          {/* Booking ID */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <span className="text-white/80 mr-2">Booking ID:</span>
            <span className="font-mono font-bold text-white text-lg">{bookingId}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold shadow-lg">
              <Download className="w-5 h-5 mr-2" />
              Download Confirmation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold">
              <Share2 className="w-5 h-5 mr-2" />
              Share Booking
            </Button>
          </div>

          {/* Confirmation Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Mail className="w-5 h-5 text-white mr-2" />
                <span className="text-white font-medium">Email Sent</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-300 mr-1" />
                <span className="text-white/80 text-sm">Confirmation delivered</span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <MessageSquare className="w-5 h-5 text-white mr-2" />
                <span className="text-white font-medium">SMS Sent</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-300 mr-1" />
                <span className="text-white/80 text-sm">Details texted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-gray-50">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default ConfirmationHeader;