'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';

const FilterChips = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const priceFilters = [
    { id: 'budget', label: 'Under $100', icon: DollarSign },
    { id: 'mid', label: '$100-300', icon: DollarSign },
    { id: 'luxury', label: '$300+', icon: DollarSign },
  ];

  const ratingFilters = [
    { id: '5star', label: '5 Stars', icon: Star },
    { id: '4star', label: '4+ Stars', icon: Star },
    { id: '3star', label: '3+ Stars', icon: Star },
  ];

  const amenityFilters = [
    { id: 'wifi', label: 'Free WiFi', icon: Wifi },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee },
    { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Filters
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quickly find properties that match your preferences with our most popular filter options.
          </p>
        </div>

        <div className="space-y-8">
          {/* Price Filters */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-emerald-600" />
              Price Range
            </h3>
            <div className="flex flex-wrap gap-3">
              {priceFilters.map(filter => {
                const Icon = filter.icon;
                const isActive = activeFilters.includes(filter.id);
                return (
                  <Button
                    key={filter.id}
                    variant={isActive ? "default" : "outline"}
                    onClick={() => toggleFilter(filter.id)}
                    className={`rounded-full px-6 py-3 transition-all duration-200 ${
                      isActive 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg' 
                        : 'border-gray-300 hover:border-emerald-500 hover:text-emerald-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Rating Filters */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Star Rating
            </h3>
            <div className="flex flex-wrap gap-3">
              {ratingFilters.map(filter => {
                const Icon = filter.icon;
                const isActive = activeFilters.includes(filter.id);
                return (
                  <Button
                    key={filter.id}
                    variant={isActive ? "default" : "outline"}
                    onClick={() => toggleFilter(filter.id)}
                    className={`rounded-full px-6 py-3 transition-all duration-200 ${
                      isActive 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg' 
                        : 'border-gray-300 hover:border-yellow-500 hover:text-yellow-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Amenity Filters */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Wifi className="w-5 h-5 mr-2 text-blue-600" />
              Popular Amenities
            </h3>
            <div className="flex flex-wrap gap-3">
              {amenityFilters.map(filter => {
                const Icon = filter.icon;
                const isActive = activeFilters.includes(filter.id);
                return (
                  <Button
                    key={filter.id}
                    variant={isActive ? "default" : "outline"}
                    onClick={() => toggleFilter(filter.id)}
                    className={`rounded-full px-6 py-3 transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                        : 'border-gray-300 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {activeFilters.length > 0 && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-800">Active Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map(filter => (
                    <Badge key={filter} variant="secondary" className="px-3 py-1">
                      {[...priceFilters, ...ratingFilters, ...amenityFilters]
                        .find(f => f.id === filter)?.label}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setActiveFilters([])}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear All
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterChips;