'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Bed, 
  Maximize,
  Clock,
  Shield,
  CheckCircle
} from 'lucide-react';

interface BookingSummaryProps {
  bookingData: {
    hotel: {
      id: number;
      name: string;
      location: string;
      address: string;
      rating: number;
      reviews: number;
      image: string;
    };
    room: {
      id: number;
      name: string;
      size: string;
      occupancy: string;
      beds: string;
      price: number;
      originalPrice?: number;
      image: string;
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
  currency: string;
}

const BookingSummary = ({ bookingData, currency }: BookingSummaryProps) => {
  const { hotel, room, dates, guests } = bookingData;

  const getCurrencySymbol = (curr: string) => {
    const symbols: { [key: string]: string } = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥'
    };
    return symbols[curr] || '$';
  };

  const convertPrice = (price: number, curr: string) => {
    const rates: { [key: string]: number } = {
      'USD': 1,
      'EUR': 0.85,
      'GBP': 0.73,
      'JPY': 110
    };
    return Math.round(price * (rates[curr] || 1));
  };

  const symbol = getCurrencySymbol(currency);
  const roomPrice = convertPrice(room.price, currency);
  const originalPrice = room.originalPrice ? convertPrice(room.originalPrice, currency) : null;
  const subtotal = roomPrice * dates.nights;
  const taxes = Math.round(subtotal * 0.12);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + taxes + serviceFee;
  const savings = originalPrice ? (convertPrice(room.originalPrice!, currency) - roomPrice) * dates.nights : 0;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Booking Summary
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Hotel Info */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <img 
              src={hotel.image} 
              alt={hotel.name}
              className="w-20 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{hotel.name}</h3>
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

        <Separator />

        {/* Room Info */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <img 
              src={room.image} 
              alt={room.name}
              className="w-20 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">{room.name}</h4>
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

        <Separator />

        {/* Booking Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">Check-in</span>
            </div>
            <span className="font-medium">{formatDate(dates.checkIn)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">Check-out</span>
            </div>
            <span className="font-medium">{formatDate(dates.checkOut)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">Duration</span>
            </div>
            <span className="font-medium">{dates.nights} night{dates.nights > 1 ? 's' : ''}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-700">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">Guests</span>
            </div>
            <span className="font-medium">
              {guests.adults} adult{guests.adults > 1 ? 's' : ''}
              {guests.children > 0 && `, ${guests.children} child${guests.children > 1 ? 'ren' : ''}`}
            </span>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Price Breakdown</h4>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {symbol}{roomPrice} × {dates.nights} night{dates.nights > 1 ? 's' : ''}
            </span>
            <span className="font-medium">{symbol}{subtotal}</span>
          </div>
          
          {savings > 0 && (
            <div className="flex justify-between items-center text-emerald-600">
              <span>Discount savings</span>
              <span className="font-medium">-{symbol}{savings}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Service fee</span>
            <span className="font-medium">{symbol}{serviceFee}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Taxes & fees</span>
            <span className="font-medium">{symbol}{taxes}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total ({currency})</span>
            <span>{symbol}{total}</span>
          </div>
        </div>

        {/* Booking Benefits */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-3">Your Booking Includes</h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-blue-800">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
              <span>Free cancellation until 24 hours before check-in</span>
            </div>
            <div className="flex items-center text-sm text-blue-800">
              <Shield className="w-4 h-4 text-blue-600 mr-2" />
              <span>Price guarantee - we'll match lower prices</span>
            </div>
            <div className="flex items-center text-sm text-blue-800">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
              <span>Instant confirmation via email</span>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        {savings > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-600 text-white">
                Limited Time
              </Badge>
              <span className="font-semibold text-emerald-900">
                You're saving {symbol}{savings}!
              </span>
            </div>
            <p className="text-sm text-emerald-800">
              This exclusive discount is applied to your booking automatically.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingSummary;