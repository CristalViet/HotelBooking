'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import HeaderNavbar from '@/components/HeaderNavbar';
import ImageCarousel from '@/components/ImageCarousel';
import HotelNameHeader from '@/components/HotelNameHeader';
import HotelInfoTabs from '@/components/HotelInfoTabs';
import RoomSelector from '@/components/RoomSelector';
import AmenityIcons from '@/components/AmenityIcons';
import NearbyExperience from '@/components/NearbyExperience';
import ReviewList from '@/components/ReviewList';
import ReviewSummary from '@/components/ReviewSummary';
import BookingCTA from '@/components/BookingCTA';
import FooterSection from '@/components/FooterSection';

export default function HotelDetailClient() {
  const params = useParams();
  const hotelId = params.id;

  // Mock hotel data - in a real app, this would come from an API
  const hotel = {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Downtown Paris, France",
    address: "123 Champs-Élysées, 75008 Paris, France",
    rating: 4.8,
    reviews: 1247,
    priceFrom: 285,
    description: "Experience luxury in the heart of Paris at the Grand Palace Hotel. Our elegant accommodations offer stunning city views, world-class amenities, and unparalleled service. Located on the famous Champs-Élysées, you'll be steps away from iconic landmarks, fine dining, and exclusive shopping.",
    images: [
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    amenities: [
      { id: 'wifi', name: 'Free WiFi', icon: 'Wifi', category: 'connectivity' },
      { id: 'pool', name: 'Swimming Pool', icon: 'Waves', category: 'recreation' },
      { id: 'spa', name: 'Spa & Wellness', icon: 'Sparkles', category: 'wellness' },
      { id: 'restaurant', name: 'Restaurant', icon: 'Utensils', category: 'dining' },
      { id: 'gym', name: 'Fitness Center', icon: 'Dumbbell', category: 'recreation' },
      { id: 'parking', name: 'Valet Parking', icon: 'Car', category: 'convenience' },
      { id: 'concierge', name: '24/7 Concierge', icon: 'Users', category: 'service' },
      { id: 'room-service', name: 'Room Service', icon: 'Coffee', category: 'service' },
      { id: 'business', name: 'Business Center', icon: 'Briefcase', category: 'business' },
      { id: 'laundry', name: 'Laundry Service', icon: 'Shirt', category: 'service' },
      { id: 'bar', name: 'Cocktail Bar', icon: 'Wine', category: 'dining' },
      { id: 'airport', name: 'Airport Shuttle', icon: 'Plane', category: 'transport' }
    ],
    rooms: [
      {
        id: 1,
        name: "Deluxe City View",
        size: "35 m²",
        occupancy: "2 guests",
        beds: "1 King Bed",
        price: 285,
        originalPrice: 320,
        images: ["https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600"],
        amenities: ["City View", "Free WiFi", "Air Conditioning", "Minibar", "Safe"],
        description: "Elegant room with panoramic city views and modern amenities."
      },
      {
        id: 2,
        name: "Executive Suite",
        size: "65 m²",
        occupancy: "4 guests",
        beds: "1 King Bed + Sofa Bed",
        price: 485,
        originalPrice: 550,
        images: ["https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600"],
        amenities: ["Separate Living Area", "Executive Lounge Access", "Free WiFi", "Kitchenette", "Balcony"],
        description: "Spacious suite with separate living area and executive privileges."
      },
      {
        id: 3,
        name: "Presidential Suite",
        size: "120 m²",
        occupancy: "6 guests",
        beds: "2 King Beds",
        price: 1200,
        images: ["https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600"],
        amenities: ["Panoramic Views", "Private Terrace", "Butler Service", "Jacuzzi", "Dining Room"],
        description: "Ultimate luxury with private terrace and personalized service."
      }
    ],
    nearbyExperiences: [
      {
        id: 1,
        name: "Louvre Museum",
        distance: "0.8 km",
        category: "Museum",
        rating: 4.9,
        image: "https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 2,
        name: "Arc de Triomphe",
        distance: "0.5 km",
        category: "Landmark",
        rating: 4.8,
        image: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 3,
        name: "Seine River Cruise",
        distance: "1.2 km",
        category: "Activity",
        rating: 4.7,
        image: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah Johnson",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
        rating: 5,
        date: "2024-01-15",
        title: "Exceptional Experience",
        content: "The Grand Palace Hotel exceeded all expectations. The staff was incredibly attentive, the room was luxurious with stunning city views, and the location couldn't be better. The spa was a highlight of our stay.",
        helpful: 24,
        roomType: "Executive Suite"
      },
      {
        id: 2,
        author: "Michael Chen",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
        rating: 4,
        date: "2024-01-10",
        title: "Great Location, Amazing Service",
        content: "Perfect location for exploring Paris. Walking distance to major attractions. The concierge team was extremely helpful with restaurant recommendations and tour bookings.",
        helpful: 18,
        roomType: "Deluxe City View"
      },
      {
        id: 3,
        author: "Emma Wilson",
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
        rating: 5,
        date: "2024-01-05",
        title: "Luxury at its Finest",
        content: "From check-in to check-out, everything was perfect. The Presidential Suite was absolutely stunning with incredible views. The butler service made us feel like royalty.",
        helpful: 31,
        roomType: "Presidential Suite"
      }
    ]
  };

  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0]);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavbar />
      
      <div className="pt-16">
        {/* Image Carousel */}
        <ImageCarousel images={hotel.images} hotelName={hotel.name} />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hotel Name Header */}
              <HotelNameHeader 
                name={hotel.name}
                location={hotel.location}
                address={hotel.address}
                rating={hotel.rating}
                reviews={hotel.reviews}
                priceFrom={hotel.priceFrom}
              />
              
              {/* Hotel Info Tabs */}
              <HotelInfoTabs 
                hotel={hotel}
                selectedRoom={selectedRoom}
                onRoomSelect={setSelectedRoom}
              />
            </div>
            
            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Room Selector */}
                <RoomSelector 
                  rooms={hotel.rooms}
                  selectedRoom={selectedRoom}
                  onRoomSelect={setSelectedRoom}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guests={guests}
                  onCheckInChange={setCheckIn}
                  onCheckOutChange={setCheckOut}
                  onGuestsChange={setGuests}
                />
                
                {/* Booking CTA */}
                <BookingCTA 
                  selectedRoom={selectedRoom}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guests={guests}
                />
              </div>
            </div>
          </div>
          
          {/* Additional Sections */}
          <div className="mt-12 space-y-12">
            {/* Amenities */}
            <AmenityIcons amenities={hotel.amenities} />
            
            {/* Nearby Experiences */}
            <NearbyExperience experiences={hotel.nearbyExperiences} />
            
            {/* Reviews Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <ReviewSummary 
                  rating={hotel.rating}
                  totalReviews={hotel.reviews}
                  reviews={hotel.reviews}
                />
              </div>
              <div className="lg:col-span-2">
                <ReviewList reviews={hotel.reviews} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FooterSection />
    </div>
  );
}
