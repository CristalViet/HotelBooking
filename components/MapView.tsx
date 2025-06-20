'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Navigation, 
  ZoomIn, 
  ZoomOut, 
  Layers,
  X,
  ExternalLink
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

interface MapViewProps {
  hotels: Hotel[];
}

const MapView = ({ hotels }: MapViewProps) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [mapCenter] = useState({ lat: 48.8566, lng: 2.3522 }); // Paris center
  const [zoomLevel, setZoomLevel] = useState(12);

  // Mock map implementation - in a real app, you'd use Google Maps, Mapbox, etc.
  const HotelPin = ({ hotel, isSelected }: { hotel: Hotel; isSelected: boolean }) => {
    const pinStyle = {
      position: 'absolute' as const,
      left: `${((hotel.coordinates.lng - mapCenter.lng) * 1000 + 300)}px`,
      top: `${((mapCenter.lat - hotel.coordinates.lat) * 1000 + 200)}px`,
      transform: 'translate(-50%, -100%)',
      zIndex: isSelected ? 20 : 10
    };

    return (
      <div style={pinStyle}>
        <Button
          variant={isSelected ? "default" : "secondary"}
          size="sm"
          onClick={() => setSelectedHotel(hotel)}
          className={`relative px-3 py-1 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 ${
            isSelected 
              ? 'bg-blue-600 text-white ring-4 ring-blue-200' 
              : 'bg-white text-gray-900 hover:bg-blue-50 border border-gray-200'
          }`}
        >
          <span className="font-semibold">${hotel.price}</span>
          {hotel.featured && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white" />
          )}
        </Button>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-xl overflow-hidden">
      {/* Mock Map Background */}
      <div 
        className="w-full h-full bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 relative"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 50%)
          `
        }}
      >
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          <Button
            variant="secondary"
            size="sm"
            className="w-10 h-10 p-0 bg-white shadow-lg hover:bg-gray-50"
            onClick={() => setZoomLevel(prev => Math.min(prev + 1, 18))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="w-10 h-10 p-0 bg-white shadow-lg hover:bg-gray-50"
            onClick={() => setZoomLevel(prev => Math.max(prev - 1, 8))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="w-10 h-10 p-0 bg-white shadow-lg hover:bg-gray-50"
          >
            <Layers className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="w-10 h-10 p-0 bg-white shadow-lg hover:bg-gray-50"
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>

        {/* Hotel Pins */}
        {hotels.map(hotel => (
          <HotelPin 
            key={hotel.id} 
            hotel={hotel} 
            isSelected={selectedHotel?.id === hotel.id}
          />
        ))}

        {/* Mock Streets and Landmarks */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400 transform rotate-12" />
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400 transform -rotate-6" />
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400 transform rotate-3" />
          <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400 transform rotate-12" />
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400 transform -rotate-3" />
          <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400 transform rotate-6" />
        </div>

        {/* Seine River */}
        <div className="absolute top-1/3 left-0 right-0 h-8 bg-blue-200 opacity-30 transform -rotate-12 rounded-full" />
      </div>

      {/* Hotel Details Popup */}
      {selectedHotel && (
        <div className="absolute bottom-4 left-4 right-4 z-40">
          <Card className="border-0 shadow-2xl bg-white">
            <CardContent className="p-0">
              <div className="flex">
                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img 
                    src={selectedHotel.image} 
                    alt={selectedHotel.name}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">
                        {selectedHotel.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{selectedHotel.location}</span>
                        <span className="mx-2">•</span>
                        <span>{selectedHotel.distance} km away</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-semibold text-sm">{selectedHotel.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({selectedHotel.reviews} reviews)</span>
                        {selectedHotel.featured && (
                          <Badge className="bg-orange-500 text-white text-xs">Featured</Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedHotel(null)}
                      className="p-1 h-auto"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-1">
                      {selectedHotel.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          ${selectedHotel.originalPrice}
                        </span>
                      )}
                      <span className="text-lg font-bold text-gray-900">
                        ${selectedHotel.price}
                      </span>
                      <span className="text-xs text-gray-600">per night</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs px-3 py-1"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute top-4 left-4 z-30">
        <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="text-xs text-gray-600 space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                <span>Selected Hotel</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white border border-gray-300 rounded-full" />
                <span>Available Hotels</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span>Featured</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;