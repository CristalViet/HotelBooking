'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bed, 
  Users, 
  Maximize, 
  Star, 
  Wifi, 
  Car, 
  Coffee, 
  Utensils,
  Dumbbell,
  Waves,
  Sparkles,
  Briefcase,
  Shirt,
  Wine,
  Plane
} from 'lucide-react';

interface Room {
  id: number;
  name: string;
  size: string;
  occupancy: string;
  beds: string;
  price: number;
  originalPrice?: number;
  images: string[];
  amenities: string[];
  description: string;
}

interface Hotel {
  description: string;
  amenities: any[];
  rooms: Room[];
  reviews: any[];
}

interface HotelInfoTabsProps {
  hotel: Hotel;
  selectedRoom: Room;
  onRoomSelect: (room: Room) => void;
}

const HotelInfoTabs = ({ hotel, selectedRoom, onRoomSelect }: HotelInfoTabsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const amenityIcons: { [key: string]: any } = {
    'wifi': Wifi,
    'pool': Waves,
    'spa': Sparkles,
    'restaurant': Utensils,
    'gym': Dumbbell,
    'parking': Car,
    'concierge': Users,
    'room-service': Coffee,
    'business': Briefcase,
    'laundry': Shirt,
    'bar': Wine,
    'airport': Plane
  };

  const getDiscountPercentage = (room: Room) => {
    if (!room.originalPrice) return null;
    return Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-gray-50 rounded-t-xl">
            <TabsTrigger 
              value="overview" 
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="rooms" 
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Rooms
            </TabsTrigger>
            <TabsTrigger 
              value="amenities" 
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Amenities
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <div className="p-8">
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Hotel</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {hotel.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Hotel Highlights</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                        Prime location on Champs-Élysées
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                        Michelin-starred restaurant on-site
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                        Award-winning spa and wellness center
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                        24/7 concierge and butler service
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Guest Policies</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                        Check-in: 3:00 PM
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                        Check-out: 12:00 PM
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                        Pet-friendly (additional fees apply)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                        Free cancellation up to 24 hours
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Rooms Tab */}
            <TabsContent value="rooms" className="mt-0">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Available Rooms</h3>
                
                <div className="space-y-6">
                  {hotel.rooms.map((room) => (
                    <Card 
                      key={room.id} 
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        selectedRoom.id === room.id 
                          ? 'ring-2 ring-blue-500 shadow-lg' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => onRoomSelect(room)}
                    >
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {/* Room Image */}
                          <div className="md:col-span-1">
                            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                              <img 
                                src={room.images[0]} 
                                alt={room.name}
                                className="w-full h-full object-cover"
                              />
                              {getDiscountPercentage(room) && (
                                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                                  -{getDiscountPercentage(room)}%
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Room Details */}
                          <div className="md:col-span-2 space-y-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                {room.name}
                              </h4>
                              <p className="text-gray-600 mb-3">{room.description}</p>
                              
                              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Maximize className="w-4 h-4 mr-2" />
                                  {room.size}
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-2" />
                                  {room.occupancy}
                                </div>
                                <div className="flex items-center">
                                  <Bed className="w-4 h-4 mr-2" />
                                  {room.beds}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.slice(0, 4).map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {room.amenities.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{room.amenities.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Room Pricing */}
                          <div className="md:col-span-1 flex flex-col justify-between">
                            <div className="text-right">
                              {room.originalPrice && (
                                <div className="text-sm text-gray-500 line-through mb-1">
                                  ${room.originalPrice}
                                </div>
                              )}
                              <div className="text-2xl font-bold text-gray-900 mb-1">
                                ${room.price}
                              </div>
                              <div className="text-sm text-gray-600 mb-4">per night</div>
                            </div>
                            
                            <Button 
                              className={`w-full ${
                                selectedRoom.id === room.id 
                                  ? 'bg-blue-600 hover:bg-blue-700' 
                                  : 'bg-gray-900 hover:bg-gray-800'
                              }`}
                            >
                              {selectedRoom.id === room.id ? 'Selected' : 'Select Room'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Amenities Tab */}
            <TabsContent value="amenities" className="mt-0">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Hotel Amenities</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity.id] || Coffee;
                    return (
                      <div 
                        key={amenity.id}
                        className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{amenity.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{amenity.category}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-0">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Guest Reviews</h3>
                
                <div className="space-y-6">
                  {hotel.reviews.slice(0, 3).map((review) => (
                    <Card key={review.id} className="border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img 
                            src={review.avatar} 
                            alt={review.author}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{review.author}</h4>
                                <p className="text-sm text-gray-600">{review.roomType}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-4 h-4 ${
                                        i < review.rating 
                                          ? 'fill-yellow-400 text-yellow-400' 
                                          : 'text-gray-300'
                                      }`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">{review.date}</span>
                              </div>
                            </div>
                            <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                            <p className="text-gray-700 leading-relaxed">{review.content}</p>
                            <div className="mt-3 text-sm text-gray-500">
                              {review.helpful} people found this helpful
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center">
                  <Button variant="outline" className="px-8">
                    View All Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default HotelInfoTabs;