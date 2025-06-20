'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Users, Edit3, Filter } from 'lucide-react';

interface SearchSummaryHeaderProps {
  searchParams: {
    destination: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    totalResults: number;
  };
}

const SearchSummaryHeader = ({ searchParams }: SearchSummaryHeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Summary */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold text-lg">{searchParams.destination}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{searchParams.checkIn} - {searchParams.checkOut}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{searchParams.guests}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                {searchParams.totalResults} properties found
              </Badge>
              <span className="text-sm text-gray-500">
                Sorted by: Recommended
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
            >
              <Edit3 className="w-4 h-4" />
              Edit Search
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 lg:hidden hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSummaryHeader;