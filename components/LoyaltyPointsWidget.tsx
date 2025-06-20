'use client'

import React from 'react';
import { Award, Gift, TrendingUp, Star } from 'lucide-react';
import { User, LoyaltyTier } from '../types/user';

interface LoyaltyPointsWidgetProps {
  user: User;
}

export const LoyaltyPointsWidget: React.FC<LoyaltyPointsWidgetProps> = ({ user }) => {
  const loyaltyTiers: LoyaltyTier[] = [
    {
      name: 'Bronze',
      minPoints: 0,
      maxPoints: 999,
      color: 'amber',
      benefits: ['5% discount on bookings', 'Priority customer support']
    },
    {
      name: 'Silver',
      minPoints: 1000,
      maxPoints: 4999,
      color: 'gray',
      benefits: ['10% discount on bookings', 'Free room upgrades', 'Late checkout']
    },
    {
      name: 'Gold',
      minPoints: 5000,
      maxPoints: 14999,
      color: 'yellow',
      benefits: ['15% discount on bookings', 'Complimentary breakfast', 'Airport lounge access']
    },
    {
      name: 'Platinum',
      minPoints: 15000,
      maxPoints: Infinity,
      color: 'purple',
      benefits: ['20% discount on bookings', 'Concierge service', 'Personal travel advisor']
    }
  ];

  const currentTier = loyaltyTiers.find(tier => tier.name === user.loyaltyTier);
  const nextTier = loyaltyTiers.find(tier => tier.minPoints > user.loyaltyPoints);
  
  const progress = currentTier && nextTier 
    ? ((user.loyaltyPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  const pointsToNext = nextTier ? nextTier.minPoints - user.loyaltyPoints : 0;

  const getTierIcon = (tierName: string) => {
    switch (tierName) {
      case 'Bronze': return <Award className="w-5 h-5 text-amber-600" />;
      case 'Silver': return <Award className="w-5 h-5 text-gray-600" />;
      case 'Gold': return <Star className="w-5 h-5 text-yellow-600" />;
      case 'Platinum': return <Star className="w-5 h-5 text-purple-600" />;
      default: return <Award className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTierGradient = (tierName: string) => {
    switch (tierName) {
      case 'Bronze': return 'from-amber-500 to-amber-600';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Platinum': return 'from-purple-500 to-purple-700';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTierGradient(user.loyaltyTier)} flex items-center justify-center text-white`}>
          {getTierIcon(user.loyaltyTier)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Loyalty Status</h3>
          <p className="text-gray-600">{user.loyaltyTier} Member</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {user.loyaltyPoints.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>

        {nextTier && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Progress to {nextTier.name}</span>
              <span className="text-sm text-gray-600">{pointsToNext} points to go</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${getTierGradient(nextTier.name)} transition-all duration-500`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        {currentTier && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Your Benefits
            </h4>
            <ul className="space-y-2">
              {currentTier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-center pt-4 border-t border-gray-100">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
            <TrendingUp className="w-4 h-4" />
            View Points History
          </button>
        </div>
      </div>
    </div>
  );
};