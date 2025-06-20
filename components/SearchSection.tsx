'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Search, MapPin, Calendar as CalendarIcon, Users, Minus, Plus } from 'lucide-react';
import { format } from 'date-fns';

const SearchSection = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  });
  const [guestPopoverOpen, setGuestPopoverOpen] = useState(false);

  const updateGuests = (type: string, operation: 'increment' | 'decrement') => {
    setGuests(prev => ({
      ...prev,
      [type]: operation === 'increment' 
        ? prev[type as keyof typeof prev] + 1 
        : Math.max(0, prev[type as keyof typeof prev] - 1)
    }));
  };

  const getGuestsSummary = () => {
    const total = guests.adults + guests.children;
    return `${total} guest${total !== 1 ? 's' : ''}, ${guests.rooms} room${guests.rooms !== 1 ? 's' : ''}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Location Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Where to?</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search destinations..."
              className="pl-10 h-12 border-gray-200 focus:border-blue-500 rounded-xl"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal border-gray-200 hover:border-blue-500 rounded-xl"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal border-gray-200 hover:border-blue-500 rounded-xl"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Guests</label>
          <Popover open={guestPopoverOpen} onOpenChange={setGuestPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal border-gray-200 hover:border-blue-500 rounded-xl"
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

                {/* Rooms */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Rooms</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateGuests('rooms', 'decrement')}
                      disabled={guests.rooms <= 1}
                      className="w-8 h-8 rounded-full p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{guests.rooms}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateGuests('rooms', 'increment')}
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

      {/* Search Button */}
      <div className="mt-8 flex justify-center">
        <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          <Search className="w-5 h-5 mr-2" />
          Search Properties
        </Button>
      </div>
    </div>
  );
};

export default SearchSection;