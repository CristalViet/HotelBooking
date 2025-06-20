'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee, 
  Utensils, 
  Dumbbell,
  Waves,
  Heart,
  Share2,
  Eye,
  Award
} from 'lucide-react';

interface Hotel {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  distance: number;
  location: string;
  amenities: string[];
  coordinates: { lat: number; lng: number };
  featured: boolean;
  description: string;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const amenityIcons: { [key: string]: any } = {
    'Free WiFi': Wifi,
    'Pool': Waves,
    'Spa': Award,
    'Restaurant': Utensils,
    'Gym': Dumbbell,
    'Parking': Car,
    'Breakfast': Coffee,
    'Bar': Utensils,
    'Terrace': Award,
    'Business Center': Award,
    'Golf': Award,
    'Gardens': Award,
    'Garden': Award,
    'Pet Friendly': Award
  };

  const getDiscountPercentage = () => {
    if (!hotel.originalPrice) return null;
    return Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100);
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white overflow-hidden">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Image Section */}
          <div className="relative md:col-span-1 h-64 md:h-auto overflow-hidden">
            <div className={`absolute inset-0 bg-gray-200 animate-pulse ${imageLoaded ? 'hidden' : 'block'}`} />
            <img 
              src={hotel.image} 
              alt={hotel.name}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'block' : 'hidden'}`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {hotel.featured && (
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg">
                  <Award className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
              {getDiscountPercentage() && (
                <Badge className="bg-red-500 text-white border-0 shadow-lg">
                  -{getDiscountPercentage()}%
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white shadow-lg"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 rounded-full p-0 bg-white/90 hover:bg-white shadow-lg"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </Button>
            </div>

            {/* Quick View Button */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                size="sm" 
                className="w-full bg-white/90 hover:bg-white text-gray-900 shadow-lg"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:col-span-2 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{hotel.location}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm">{hotel.distance} km from center</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {hotel.description}
                  </p>
                </div>
                
                {/* Rating */}
                <div className="flex flex-col items-end ml-4">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold text-gray-900">{hotel.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({hotel.reviews} reviews)</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.slice(0, 5).map(amenity => {
                  const Icon = amenityIcons[amenity] || Award;
                  return (
                    <Badge 
                      key={amenity} 
                      variant="secondary" 
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {amenity}
                    </Badge>
                  );
                })}
                {hotel.amenities.length > 5 && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    +{hotel.amenities.length - 5} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-end justify-between mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-baseline space-x-2">
                {hotel.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${hotel.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-gray-900">
                  ${hotel.price}
                </span>
                <span className="text-sm text-gray-600">per night</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                >
                  View Details
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;