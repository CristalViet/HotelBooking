'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  ArrowRight,
  Compass,
  Camera,
  Utensils,
  Music,
  Mountain,
  Waves
} from 'lucide-react';

interface ContinueExploringExperiencesProps {
  currentLocation: string;
}

const ContinueExploringExperiences = ({ currentLocation }: ContinueExploringExperiencesProps) => {
  const experiences = [
    {
      id: 1,
      name: "Seine River Evening Cruise",
      category: "Sightseeing",
      icon: Waves,
      image: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 2341,
      duration: "2 hours",
      price: 45,
      distance: "0.5 km",
      description: "Romantic evening cruise with dinner and city lights",
      highlights: ["Dinner included", "City lights", "Live commentary"],
      popular: true
    },
    {
      id: 2,
      name: "Louvre Museum Skip-the-Line",
      category: "Culture",
      icon: Camera,
      image: "https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 5672,
      duration: "3 hours",
      price: 65,
      distance: "0.8 km",
      description: "Guided tour of the world's most famous art museum",
      highlights: ["Skip the line", "Expert guide", "Mona Lisa viewing"],
      popular: true
    },
    {
      id: 3,
      name: "Montmartre Food Walking Tour",
      category: "Food & Drink",
      icon: Utensils,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 1456,
      duration: "4 hours",
      price: 85,
      distance: "2.3 km",
      description: "Taste authentic French cuisine in historic Montmartre",
      highlights: ["Local tastings", "Historic sites", "Small groups"],
      popular: false
    },
    {
      id: 4,
      name: "Versailles Palace Day Trip",
      category: "History",
      icon: Mountain,
      image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 3421,
      duration: "8 hours",
      price: 120,
      distance: "25 km",
      description: "Full day exploring the opulent Palace of Versailles",
      highlights: ["Palace tour", "Gardens access", "Transportation"],
      popular: false
    },
    {
      id: 5,
      name: "Latin Quarter Jazz Night",
      category: "Nightlife",
      icon: Music,
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 892,
      duration: "3 hours",
      price: 55,
      distance: "1.8 km",
      description: "Experience Paris nightlife with live jazz and cocktails",
      highlights: ["Live music", "Cocktails", "Historic venues"],
      popular: false
    },
    {
      id: 6,
      name: "Photography Walking Tour",
      category: "Photography",
      icon: Camera,
      image: "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 567,
      duration: "3 hours",
      price: 75,
      distance: "1.2 km",
      description: "Capture Paris's beauty with a professional photographer",
      highlights: ["Pro tips", "Hidden spots", "Photo editing"],
      popular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Experiences', count: experiences.length },
    { id: 'sightseeing', name: 'Sightseeing', count: 2 },
    { id: 'culture', name: 'Culture', count: 1 },
    { id: 'food', name: 'Food & Drink', count: 1 },
    { id: 'history', name: 'History', count: 1 },
    { id: 'nightlife', name: 'Nightlife', count: 1 }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Sightseeing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Culture': 'bg-purple-100 text-purple-800 border-purple-200',
      'Food & Drink': 'bg-orange-100 text-orange-800 border-orange-200',
      'History': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Nightlife': 'bg-pink-100 text-pink-800 border-pink-200',
      'Photography': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
          <Compass className="w-6 h-6 mr-3 text-blue-600" />
          Continue Exploring {currentLocation.split(',')[0]}
        </CardTitle>
        <p className="text-gray-600">
          Make the most of your trip with these amazing experiences near your hotel.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge 
              key={category.id}
              variant="outline" 
              className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Popular Experiences */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Popular Experiences</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.filter(exp => exp.popular).map((experience) => {
              const Icon = experience.icon;
              
              return (
                <Card key={experience.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 overflow-hidden cursor-pointer">
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
                      
                      {/* Popular Badge */}
                      {experience.popular && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-orange-500 text-white">
                            Popular
                          </Badge>
                        </div>
                      )}
                      
                      {/* Price */}
                      <div className="absolute bottom-3 right-3 bg-white/90 rounded-full px-3 py-1">
                        <span className="font-bold text-gray-900">${experience.price}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {experience.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{experience.description}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ml-3 ${
                          experience.category === 'Sightseeing' ? 'bg-blue-100' :
                          experience.category === 'Culture' ? 'bg-purple-100' :
                          experience.category === 'Food & Drink' ? 'bg-orange-100' :
                          'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            experience.category === 'Sightseeing' ? 'text-blue-600' :
                            experience.category === 'Culture' ? 'text-purple-600' :
                            experience.category === 'Food & Drink' ? 'text-orange-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{experience.rating}</span>
                            <span className="ml-1">({experience.reviews})</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{experience.distance}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.highlights.slice(0, 3).map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-lg transition-all duration-200">
                        Book Experience
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* All Experiences */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">More Experiences</h3>
          
          <div className="space-y-4">
            {experiences.filter(exp => !exp.popular).map((experience) => {
              const Icon = experience.icon;
              
              return (
                <Card key={experience.id} className="group hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={experience.image} 
                        alt={experience.name}
                        className="w-20 h-16 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {experience.name}
                            </h4>
                            <p className="text-sm text-gray-600">{experience.description}</p>
                          </div>
                          <Badge className={getCategoryColor(experience.category)}>
                            {experience.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{experience.rating} ({experience.reviews})</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{experience.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{experience.distance}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <span className="font-bold text-lg text-gray-900">${experience.price}</span>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-8 border border-blue-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-gray-600 mb-6">
            Our local experts can help you discover hidden gems and create custom experiences just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Users className="w-4 h-4 mr-2" />
              Contact Local Expert
            </Button>
            <Button variant="outline">
              <Compass className="w-4 h-4 mr-2" />
              Browse All Experiences
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContinueExploringExperiences;