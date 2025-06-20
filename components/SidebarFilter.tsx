'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Star, Wifi, Car, Coffee, Utensils, Dumbbell, Waves, Space as Spa, PawPrint, Building, Home, TreePine, MapPin, X } from 'lucide-react';

interface SidebarFilterProps {
  filters: {
    priceRange: number[];
    rating: number;
    amenities: string[];
    propertyTypes: string[];
    distance: number;
  };
  onFiltersChange: (filters: any) => void;
  hotels: any[];
}

const SidebarFilter = ({ filters, onFiltersChange, hotels }: SidebarFilterProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const amenityOptions = [
    { id: 'wifi', label: 'Free WiFi', icon: Wifi, count: 156 },
    { id: 'parking', label: 'Free Parking', icon: Car, count: 89 },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee, count: 134 },
    { id: 'restaurant', label: 'Restaurant', icon: Utensils, count: 98 },
    { id: 'gym', label: 'Fitness Center', icon: Dumbbell, count: 67 },
    { id: 'pool', label: 'Swimming Pool', icon: Waves, count: 45 },
    { id: 'spa', label: 'Spa Services', icon: Spa, count: 32 },
    { id: 'pets', label: 'Pet Friendly', icon: PawPrint, count: 78 }
  ];

  const propertyTypes = [
    { id: 'hotel', label: 'Hotels', icon: Building, count: 89 },
    { id: 'apartment', label: 'Apartments', icon: Home, count: 45 },
    { id: 'resort', label: 'Resorts', icon: TreePine, count: 23 },
    { id: 'villa', label: 'Villas', icon: Home, count: 12 }
  ];

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating: filters.rating === rating ? 0 : rating });
  };

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    const updatedAmenities = checked
      ? [...filters.amenities, amenityId]
      : filters.amenities.filter(id => id !== amenityId);
    onFiltersChange({ ...filters, amenities: updatedAmenities });
  };

  const handlePropertyTypeChange = (typeId: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...filters.propertyTypes, typeId]
      : filters.propertyTypes.filter(id => id !== typeId);
    onFiltersChange({ ...filters, propertyTypes: updatedTypes });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      priceRange: [0, 1000],
      rating: 0,
      amenities: [],
      propertyTypes: [],
      distance: 50
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    if (filters.rating > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.propertyTypes.length > 0) count++;
    if (filters.distance < 50) count++;
    return count;
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center">
              <span>Filters</span>
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </CardTitle>
            {getActiveFilterCount() > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Price Range */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-emerald-600" />
            Price per night
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={1000}
              min={0}
              step={25}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}+</span>
          </div>
        </CardContent>
      </Card>

      {/* Star Rating */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            Star Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center space-x-3">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <label 
                htmlFor={`rating-${rating}`}
                className="flex items-center space-x-2 cursor-pointer flex-1"
              >
                <div className="flex items-center">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">& up</span>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Property Type */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center">
            <Building className="w-4 h-4 mr-2 text-blue-600" />
            Property Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {propertyTypes.map(type => {
            const Icon = type.icon;
            return (
              <div key={type.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`type-${type.id}`}
                  checked={filters.propertyTypes.includes(type.id)}
                  onCheckedChange={(checked) => handlePropertyTypeChange(type.id, checked as boolean)}
                />
                <label 
                  htmlFor={`type-${type.id}`}
                  className="flex items-center justify-between cursor-pointer flex-1"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{type.label}</span>
                  </div>
                  <span className="text-xs text-gray-400">({type.count})</span>
                </label>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center">
            <Wifi className="w-4 h-4 mr-2 text-purple-600" />
            Amenities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {amenityOptions.map(amenity => {
            const Icon = amenity.icon;
            return (
              <div key={amenity.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`amenity-${amenity.id}`}
                  checked={filters.amenities.includes(amenity.id)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                />
                <label 
                  htmlFor={`amenity-${amenity.id}`}
                  className="flex items-center justify-between cursor-pointer flex-1"
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{amenity.label}</span>
                  </div>
                  <span className="text-xs text-gray-400">({amenity.count})</span>
                </label>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Distance */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-red-600" />
            Distance from center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={[filters.distance]}
              onValueChange={(value) => onFiltersChange({ ...filters, distance: value[0] })}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
          <div className="text-center text-sm text-gray-600">
            Within {filters.distance} km
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarFilter;