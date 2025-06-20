'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Users, 
  Bed, 
  Maximize, 
  Plus, 
  Minus,
  Clock,
  Moon
} from 'lucide-react';
import { format } from 'date-fns';

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

interface Guests {
  adults: number;
  children: number;
}

interface RoomSelectorProps {
  rooms: Room[];
  selectedRoom: Room;
  onRoomSelect: (room: Room) => void;
  checkIn?: Date;
  checkOut?: Date;
  guests: Guests;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
  onGuestsChange: (guests: Guests) => void;
}

const RoomSelector = ({
  rooms,
  selectedRoom,
  onRoomSelect,
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange
}: RoomSelectorProps) => {
  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);
  const [rateType, setRateType] = useState<'nightly' | 'hourly'>('nightly');

  const updateGuests = (type: 'adults' | 'children', operation: 'increment' | 'decrement') => {
    onGuestsChange({
      ...guests,
      [type]: operation === 'increment' 
        ? guests[type] + 1 
        : Math.max(type === 'adults' ? 1 : 0, guests[type] - 1)
    });
  };

  const getGuestsSummary = () => {
    const total = guests.adults + guests.children;
    return `${total} guest${total !== 1 ? 's' : ''}`;
  };

  const getDiscountPercentage = () => {
    if (!selectedRoom.originalPrice) return null;
    return Math.round(((selectedRoom.originalPrice - selectedRoom.price) / selectedRoom.originalPrice) * 100);
  };

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

  const getHourlyRate = () => {
    return Math.round(selectedRoom.price / 24);
  };

  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Book Your Stay</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Rate Type Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={rateType === 'nightly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setRateType('nightly')}
            className={`flex-1 flex items-center justify-center gap-2 ${
              rateType === 'nightly' 
                ? 'bg-white shadow-sm' 
                : 'hover:bg-white/50'
            }`}
          >
            <Moon className="w-4 h-4" />
            Nightly
          </Button>
          <Button
            variant={rateType === 'hourly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setRateType('hourly')}
            className={`flex-1 flex items-center justify-center gap-2 ${
              rateType === 'hourly' 
                ? 'bg-white shadow-sm' 
                : 'hover:bg-white/50'
            }`}
          >
            <Clock className="w-4 h-4" />
            Hourly
          </Button>
        </div>

        {/* Selected Room Display */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <img 
              src={selectedRoom.images[0]} 
              alt={selectedRoom.name}
              className="w-16 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{selectedRoom.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Maximize className="w-3 h-3 mr-1" />
                  {selectedRoom.size}
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {selectedRoom.occupancy}
                </div>
                <div className="flex items-center">
                  <Bed className="w-3 h-3 mr-1" />
                  {selectedRoom.beds}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedRoom.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${selectedRoom.originalPrice}
                  </span>
                )}
                <span className="font-bold text-gray-900">
                  ${rateType === 'nightly' ? selectedRoom.price : getHourlyRate()}
                </span>
                <span className="text-sm text-gray-600">
                  per {rateType === 'nightly' ? 'night' : 'hour'}
                </span>
                {getDiscountPercentage() && (
                  <Badge className="bg-red-500 text-white text-xs">
                    -{getDiscountPercentage()}%
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-3 text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => {
              const currentIndex = rooms.findIndex(r => r.id === selectedRoom.id);
              const nextIndex = (currentIndex + 1) % rooms.length;
              onRoomSelect(rooms[nextIndex]);
            }}
          >
            Change Room
          </Button>
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Check-in */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Check-in
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-12"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "MMM dd") : "Select"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={onCheckInChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Check-out
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal h-12"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "MMM dd") : "Select"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={onCheckOutChange}
                    disabled={(date) => date < (checkIn || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Guests
            </label>
            <Popover open={guestPopoverOpen} onOpenChange={setGuestPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-12"
                >
                  <Users className="mr-2 h-4 w-4" />
                  {getGuestsSummary()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Adults</div>
                      <div className="text-sm text-gray-500">Ages 13+</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateGuests('adults', 'decrement')}
                        disabled={guests.adults <= 1}
                        className="w-8 h-8 rounded-full p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{guests.adults}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateGuests('adults', 'increment')}
                        className="w-8 h-8 rounded-full p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Children</div>
                      <div className="text-sm text-gray-500">Ages 2-12</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateGuests('children', 'decrement')}
                        disabled={guests.children <= 0}
                        className="w-8 h-8 rounded-full p-0"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{guests.children}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateGuests('children', 'increment')}
                        className="w-8 h-8 rounded-full p-0"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Price Summary */}
        {checkIn && checkOut && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <h4 className="font-semibold text-gray-900">Price Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  ${selectedRoom.price} × {calculateNights()} night{calculateNights() > 1 ? 's' : ''}
                </span>
                <span className="font-medium">${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & fees</span>
                <span className="font-medium">${Math.round(getTotalPrice() * 0.12)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${getTotalPrice() + Math.round(getTotalPrice() * 0.12)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomSelector;