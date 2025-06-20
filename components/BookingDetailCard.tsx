'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Phone, 
  Mail, 
  Navigation,
  Clock,
  Bed,
  Maximize,
  Wifi,
  Car,
  Coffee,
  Edit,
  MessageCircle,
  Shield,
  CreditCard,
  CheckCircle
} from 'lucide-react';

interface BookingDetailCardProps {
  confirmationData: any;
}

const BookingDetailCard = ({ confirmationData }: BookingDetailCardProps) => {
  const [activeTab, setActiveTab] = useState('details');

  const { hotel, room, dates, guests, pricing, bookingId } = confirmationData;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'details', label: 'Booking Details', icon: Calendar },
    { id: 'hotel', label: 'Hotel Info', icon: MapPin },
    { id: 'policies', label: 'Policies', icon: Shield }
  ];

  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Your Booking Details
        </CardTitle>
        <p className="text-gray-600">
          Everything you need to know about your upcoming stay.
        </p>
      </CardHeader>
      
      <CardContent>
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Booking Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-8">
            {/* Hotel & Room Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hotel */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-20 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{hotel.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({hotel.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-20 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">{room.name}</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Maximize className="w-3 h-3 mr-1" />
                        {room.size}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {room.occupancy}
                      </div>
                      <div className="flex items-center col-span-2">
                        <Bed className="w-3 h-3 mr-1" />
                        {room.beds}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Stay Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dates & Duration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Stay Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium text-blue-900">Check-in</div>
                        <div className="text-sm text-blue-700">{formatDate(dates.checkIn)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-blue-900">3:00 PM</div>
                      <div className="text-sm text-blue-700">Standard time</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-emerald-600 mr-3" />
                      <div>
                        <div className="font-medium text-emerald-900">Check-out</div>
                        <div className="text-sm text-emerald-700">{formatDate(dates.checkOut)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-emerald-900">12:00 PM</div>
                      <div className="text-sm text-emerald-700">Standard time</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-purple-600 mr-3" />
                      <div>
                        <div className="font-medium text-purple-900">Duration</div>
                        <div className="text-sm text-purple-700">{dates.nights} nights</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-purple-900">Total Stay</div>
                      <div className="text-sm text-purple-700">Perfect length</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Guest Information</h3>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Primary Guest</span>
                      <span className="font-medium">{guests.primaryGuest.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium">{guests.primaryGuest.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Phone</span>
                      <span className="font-medium">{guests.primaryGuest.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Guests</span>
                      <span className="font-medium">
                        {guests.adults} adult{guests.adults > 1 ? 's' : ''}
                        {guests.children > 0 && `, ${guests.children} child${guests.children > 1 ? 'ren' : ''}`}
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Modify Guest Details
                </Button>
              </div>
            </div>

            <Separator />

            {/* Pricing Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Pricing Summary</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ${room.price} × {dates.nights} nights
                    </span>
                    <span className="font-medium">${pricing.subtotal}</span>
                  </div>
                  
                  {pricing.savings > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount savings</span>
                      <span className="font-medium">-${pricing.savings}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="font-medium">${pricing.serviceFee}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & fees</span>
                    <span className="font-medium">${pricing.taxes}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Paid</span>
                    <span>${pricing.total} {pricing.currency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hotel Info Tab */}
        {activeTab === 'hotel' && (
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <div className="font-medium text-blue-900">Phone</div>
                      <div className="text-sm text-blue-700">{hotel.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                    <Mail className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <div className="font-medium text-emerald-900">Email</div>
                      <div className="text-sm text-emerald-700">{hotel.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <Navigation className="w-5 h-5 text-purple-600 mr-3" />
                    <div>
                      <div className="font-medium text-purple-900">Address</div>
                      <div className="text-sm text-purple-700">{hotel.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Amenities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Room Amenities</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Phone className="w-4 h-4 mr-2" />
                Call Hotel
              </Button>
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Cancellation Policy</h3>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-yellow-900">Free Cancellation</p>
                    <p className="text-yellow-800">
                      Cancel up to 24 hours before check-in for a full refund.
                    </p>
                    <p className="text-yellow-700">
                      After that, the first night is non-refundable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-green-900">Payment Status</p>
                    <p className="text-green-800">
                      Payment has been processed successfully.
                    </p>
                    <p className="text-green-700">
                      No additional charges at check-in.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Important Information</h3>
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900">Check-in Requirements</div>
                    <div className="text-sm text-blue-700">Valid photo ID and credit card required at check-in</div>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-purple-900">Age Restrictions</div>
                    <div className="text-sm text-purple-700">Minimum check-in age is 21 years</div>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-emerald-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-emerald-900">Pet Policy</div>
                    <div className="text-sm text-emerald-700">Pets allowed with additional fee ($50/night)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingDetailCard;