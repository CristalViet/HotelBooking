'use client'

import React, { useState } from 'react';
import { ProfileHeader } from '../../components/ProfileHeader';
import { MyTripsList } from '../../components/MyTripsList';
import { LoyaltyPointsWidget } from '../../components/LoyaltyPointsWidget';
import { LanguagePreference } from '../../components/LanguagePreference';
import { LogoutButton } from '../../components/LogoutButton';
import { EditProfileModal } from '../../components/EditProfileModal';
import { User, Trip } from '../types/user';

export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'March 2020',
    loyaltyTier: 'Gold',
    loyaltyPoints: 8750,
    language: 'en'
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [trips] = useState<Trip[]>([
    {
      id: '1',
      destination: 'Paris, France',
      departureDate: '2024-12-15',
      returnDate: '2024-12-22',
      status: 'upcoming',
      bookingReference: 'PF2024001',
      totalAmount: 2850,
      currency: '$',
      hotelName: 'Hotel des Grands Boulevards',
      roomType: 'Deluxe Suite',
      guests: 2,
      image: 'https://images.pexels.com/photos/161853/eiffel-tower-paris-france-tower-161853.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      destination: 'Tokyo, Japan',
      departureDate: '2024-03-10',
      returnDate: '2024-03-17',
      status: 'completed',
      bookingReference: 'TJ2024002',
      totalAmount: 3200,
      currency: '$',
      hotelName: 'Park Hyatt Tokyo',
      roomType: 'City View Room',
      guests: 1,
      image: 'https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      destination: 'Santorini, Greece',
      departureDate: '2024-08-05',
      returnDate: '2024-08-12',
      status: 'completed',
      bookingReference: 'SG2024003',
      totalAmount: 2100,
      currency: '$',
      hotelName: 'Canaves Oia Suites',
      roomType: 'Infinity Pool Suite',
      guests: 2,
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedUser: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  const handleLanguageChange = (language: string) => {
    setUser(prev => ({ ...prev, language }));
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader user={user} onEditProfile={handleEditProfile} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MyTripsList trips={trips} />
          </div>
          
          <div className="space-y-8">
            <LoyaltyPointsWidget user={user} />
            <LanguagePreference 
              currentLanguage={user.language} 
              onLanguageChange={handleLanguageChange} 
            />
            <LogoutButton onLogout={handleLogout} />
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
};