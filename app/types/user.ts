export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  memberSince: string;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  loyaltyPoints: number;
  language: string;
}

export interface Trip {
  id: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingReference: string;
  totalAmount: number;
  currency: string;
  hotelName: string;
  roomType: string;
  guests: number;
  image: string;
}

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  benefits: string[];
}