'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Wifi, 
  Car, 
  Coffee, 
  Utensils,
  Dumbbell,
  Waves,
  Sparkles,
  Users,
  Briefcase,
  Shirt,
  Wine,
  Plane
} from 'lucide-react';

interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: string;
}

interface AmenityIconsProps {
  amenities: Amenity[];
}

const AmenityIcons = ({ amenities }: AmenityIconsProps) => {
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

  const categories = {
    'connectivity': { name: 'Connectivity', color: 'blue' },
    'recreation': { name: 'Recreation', color: 'emerald' },
    'wellness': { name: 'Wellness', color: 'purple' },
    'dining': { name: 'Dining', color: 'orange' },
    'service': { name: 'Services', color: 'pink' },
    'business': { name: 'Business', color: 'gray' },
    'convenience': { name: 'Convenience', color: 'indigo' },
    'transport': { name: 'Transportation', color: 'red' }
  };

  const groupedAmenities = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as { [key: string]: Amenity[] });

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Hotel Amenities & Services
        </CardTitle>
        <p className="text-gray-600">
          Enjoy world-class facilities and services designed for your comfort and convenience.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {Object.entries(groupedAmenities).map(([category, categoryAmenities]) => {
          const categoryInfo = categories[category as keyof typeof categories] || { name: category, color: 'gray' };
          
          return (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <div className={`w-3 h-3 bg-${categoryInfo.color}-500 rounded-full mr-3`} />
                {categoryInfo.name}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryAmenities.map((amenity) => {
                  const Icon = amenityIcons[amenity.id] || Coffee;
                  
                  return (
                    <div 
                      key={amenity.id}
                      className="group flex items-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200"
                    >
                      <div className={`w-12 h-12 bg-${categoryInfo.color}-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-${categoryInfo.color}-200 transition-colors`}>
                        <Icon className={`w-6 h-6 text-${categoryInfo.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">
                          {amenity.name}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        
        {/* Additional Services */}
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Services Available
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                <span className="text-gray-700">Personal shopping service</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                <span className="text-gray-700">Private dining arrangements</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                <span className="text-gray-700">Event planning services</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                <span className="text-gray-700">Babysitting services</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                <span className="text-gray-700">Pet care services</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                <span className="text-gray-700">Tour guide arrangements</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmenityIcons;