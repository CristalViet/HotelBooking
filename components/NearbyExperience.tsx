'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Navigation, ExternalLink } from 'lucide-react';

interface Experience {
  id: number;
  name: string;
  distance: string;
  category: string;
  rating: number;
  image: string;
}

interface NearbyExperienceProps {
  experiences: Experience[];
}

const NearbyExperience = ({ experiences }: NearbyExperienceProps) => {
  const additionalExperiences = [
    {
      id: 4,
      name: "Eiffel Tower",
      distance: "2.1 km",
      category: "Landmark",
      rating: 4.9,
      image: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      name: "Champs-Élysées Shopping",
      distance: "0.2 km",
      category: "Shopping",
      rating: 4.6,
      image: "https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 6,
      name: "Notre-Dame Cathedral",
      distance: "3.5 km",
      category: "Historic Site",
      rating: 4.8,
      image: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const allExperiences = [...experiences, ...additionalExperiences];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Museum': 'bg-purple-100 text-purple-800 border-purple-200',
      'Landmark': 'bg-blue-100 text-blue-800 border-blue-200',
      'Activity': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Shopping': 'bg-orange-100 text-orange-800 border-orange-200',
      'Historic Site': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
          <MapPin className="w-6 h-6 mr-3 text-blue-600" />
          Nearby Experiences
        </CardTitle>
        <p className="text-gray-600">
          Discover amazing attractions and activities within walking distance of the hotel.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Featured Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allExperiences.map((experience) => (
            <Card 
              key={experience.id} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={experience.image} 
                    alt={experience.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className={getCategoryColor(experience.category)}>
                      {experience.category}
                    </Badge>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-xs font-medium">{experience.rating}</span>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{experience.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Navigation className="w-3 h-3 mr-1" />
                        <span className="text-sm">{experience.distance}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{Math.round(parseFloat(experience.distance) * 12)} min walk</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="p-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 group-hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Quick Access Section */}
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Getting Around Paris
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Navigation className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">Metro Station</h4>
              </div>
              <p className="text-sm text-gray-600">Charles de Gaulle-Étoile</p>
              <p className="text-xs text-gray-500">2 min walk</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="font-medium text-gray-900">Bus Stop</h4>
              </div>
              <p className="text-sm text-gray-600">Multiple lines</p>
              <p className="text-xs text-gray-500">1 min walk</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <h4 className="font-medium text-gray-900">Taxi Stand</h4>
              </div>
              <p className="text-sm text-gray-600">24/7 available</p>
              <p className="text-xs text-gray-500">Right outside</p>
            </div>
          </div>
        </div>
        
        {/* View More Button */}
        <div className="text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8">
            <MapPin className="w-4 h-4 mr-2" />
            View All Nearby Attractions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbyExperience;