'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Clock, ArrowRight } from 'lucide-react';

const ExperienceRecommendation = () => {
  const localGuides = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Paris, France",
      rating: 4.9,
      reviews: 124,
      specialties: ["Architecture", "Food Tours", "History"],
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$45/hour",
      description: "Expert in French culture and hidden gems of Paris"
    },
    {
      id: 2,
      name: "Marco Rossi",
      location: "Rome, Italy",
      rating: 4.8,
      reviews: 89,
      specialties: ["Ancient History", "Art", "Local Cuisine"],
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$40/hour",
      description: "Archaeological expert with 10+ years experience"
    },
    {
      id: 3,
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      rating: 5.0,
      reviews: 156,
      specialties: ["Culture", "Technology", "Traditional Arts"],
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "$55/hour",
      description: "Cultural ambassador and traditional arts specialist"
    }
  ];

  const destinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      type: "Island Paradise",
      image: "https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "From $150/night",
      rating: 4.7,
      properties: 180,
      highlights: ["Stunning sunsets", "Volcanic beaches", "Luxury resorts"]
    },
    {
      id: 2,
      name: "Bali, Indonesia",
      type: "Tropical Escape",
      image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "From $80/night",
      rating: 4.6,
      properties: 320,
      highlights: ["Rice terraces", "Temples", "Beach clubs"]
    },
    {
      id: 3,
      name: "Swiss Alps",
      type: "Mountain Adventure",
      image: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=600",
      price: "From $200/night",
      rating: 4.8,
      properties: 95,
      highlights: ["Skiing", "Hiking trails", "Alpine villages"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Local Guides Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Local Guides
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover authentic experiences with certified local experts who know the hidden gems of their cities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {localGuides.map(guide => (
              <Card key={guide.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white shadow-lg">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={guide.image} 
                      alt={guide.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800 border-0">
                        {guide.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{guide.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{guide.rating}</span>
                        <span className="text-sm text-gray-500">({guide.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{guide.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.specialties.map(specialty => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg group-hover:shadow-lg transition-all duration-200">
                      Book Guide
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Destinations Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the world's most sought-after destinations with carefully curated accommodations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map(destination => (
              <Card key={destination.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-emerald-600 text-white border-0">
                        {destination.type}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">{destination.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{destination.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center text-gray-600 mb-4">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{destination.properties} properties available</span>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {destination.highlights.map(highlight => (
                        <div key={highlight} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white rounded-lg group-hover:shadow-lg transition-all duration-200">
                      Explore Destination
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceRecommendation;