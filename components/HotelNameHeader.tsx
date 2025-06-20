'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Navigation, Phone, Mail, Award } from 'lucide-react';

interface HotelNameHeaderProps {
  name: string;
  location: string;
  address: string;
  rating: number;
  reviews: number;
  priceFrom: number;
}

const HotelNameHeader = ({ 
  name, 
  location, 
  address, 
  rating, 
  reviews, 
  priceFrom 
}: HotelNameHeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Hotel Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              <Award className="w-3 h-3 mr-1" />
              Luxury Hotel
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              Featured Property
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {name}
          </h1>
          
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span className="text-lg text-gray-700">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <Navigation className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{address}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${
                      i < Math.floor(rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xl font-semibold text-gray-900">{rating}</span>
              <span className="text-gray-600">({reviews.toLocaleString()} reviews)</span>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call Hotel
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Hotel
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Get Directions
            </Button>
          </div>
        </div>
        
        {/* Price Info */}
        <div className="lg:text-right">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-100">
            <div className="text-sm text-gray-600 mb-1">Starting from</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              ${priceFrom}
            </div>
            <div className="text-sm text-gray-600 mb-4">per night</div>
            <div className="text-xs text-gray-500">
              *Prices may vary by date and availability
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelNameHeader;