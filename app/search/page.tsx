'use client';

import React, { useState } from 'react';
import HeaderNavbar from '@/components/HeaderNavbar';
import SearchSummaryHeader from '@/components/SearchSummaryHeader';
import SidebarFilter from '@/components/SidebarFilter';
import HotelCard from '@/components/HotelCard';
import ListMapToggle from '@/components/ListMapToggle';
import MapView from '@/components/MapView';
import Pagination from '@/components/Pagination';
import FooterSection from '@/components/FooterSection';

export default function SearchResults() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [] as string[],
    propertyTypes: [] as string[],
    distance: 50
  });

  // Mock hotel data
  const hotels = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.8,
      reviews: 1247,
      price: 285,
      originalPrice: 320,
      distance: 0.8,
      location: "Downtown Paris",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Gym"],
      coordinates: { lat: 48.8566, lng: 2.3522 },
      featured: true,
      description: "Luxury hotel in the heart of Paris with stunning city views"
    },
    {
      id: 2,
      name: "Boutique Riverside Inn",
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.6,
      reviews: 892,
      price: 165,
      distance: 1.2,
      location: "Seine Riverbank",
      amenities: ["Free WiFi", "Restaurant", "Bar", "Terrace"],
      coordinates: { lat: 48.8606, lng: 2.3376 },
      featured: false,
      description: "Charming boutique hotel with river views and modern amenities"
    },
    {
      id: 3,
      name: "Modern City Suites",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.4,
      reviews: 634,
      price: 195,
      distance: 2.1,
      location: "Business District",
      amenities: ["Free WiFi", "Gym", "Business Center", "Parking"],
      coordinates: { lat: 48.8738, lng: 2.2950 },
      featured: false,
      description: "Contemporary suites perfect for business and leisure travelers"
    },
    {
      id: 4,
      name: "Historic Château Resort",
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.9,
      reviews: 456,
      price: 450,
      originalPrice: 520,
      distance: 15.5,
      location: "Versailles",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Golf", "Gardens"],
      coordinates: { lat: 48.8049, lng: 2.1204 },
      featured: true,
      description: "Magnificent château hotel with extensive grounds and luxury amenities"
    },
    {
      id: 5,
      name: "Cozy Garden Hotel",
      image: "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.3,
      reviews: 789,
      price: 125,
      distance: 3.2,
      location: "Montmartre",
      amenities: ["Free WiFi", "Garden", "Restaurant", "Pet Friendly"],
      coordinates: { lat: 48.8867, lng: 2.3431 },
      featured: false,
      description: "Intimate hotel with beautiful garden courtyard in artistic Montmartre"
    },
    {
      id: 6,
      name: "Executive Business Hotel",
      image: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4.5,
      reviews: 1123,
      price: 220,
      distance: 1.8,
      location: "La Défense",
      amenities: ["Free WiFi", "Gym", "Business Center", "Restaurant", "Bar"],
      coordinates: { lat: 48.8922, lng: 2.2358 },
      featured: false,
      description: "Premium business hotel with state-of-the-art facilities"
    }
  ];

  const searchParams = {
    destination: "Paris, France",
    checkIn: "Dec 15, 2024",
    checkOut: "Dec 18, 2024",
    guests: "2 guests, 1 room",
    totalResults: hotels.length
  };

  const hotelsPerPage = 4;
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);
  const startIndex = (currentPage - 1) * hotelsPerPage;
  const currentHotels = hotels.slice(startIndex, startIndex + hotelsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavbar />
      
      <div className="pt-16">
        <SearchSummaryHeader searchParams={searchParams} />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80 flex-shrink-0">
              <SidebarFilter 
                filters={filters} 
                onFiltersChange={setFilters}
                hotels={hotels}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* List/Map Toggle */}
              <div className="mb-6">
                <ListMapToggle 
                  viewMode={viewMode} 
                  onViewModeChange={setViewMode}
                  resultsCount={hotels.length}
                />
              </div>

              {/* Content Area */}
              {viewMode === 'list' ? (
                <div className="space-y-6">
                  {currentHotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                  
                  {/* Pagination */}
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-[800px] rounded-xl overflow-hidden shadow-lg">
                  <MapView hotels={hotels} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}