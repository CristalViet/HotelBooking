'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  Star, 
  Gift, 
  Crown, 
  Zap, 
  TrendingUp,
  Sparkles,
  Trophy,
  Target,
  ArrowRight
} from 'lucide-react';

interface LoyaltyPointsEarnedProps {
  loyaltyData: {
    earned: number;
    previousBalance: number;
    newBalance: number;
    tier: string;
    nextTier: string;
    pointsToNextTier: number;
  };
}

const LoyaltyPointsEarned = ({ loyaltyData }: LoyaltyPointsEarnedProps) => {
  const [animatedPoints, setAnimatedPoints] = useState(loyaltyData.previousBalance);
  const [showEarned, setShowEarned] = useState(false);

  const { earned, previousBalance, newBalance, tier, nextTier, pointsToNextTier } = loyaltyData;

  useEffect(() => {
    // Animate points counter
    const timer = setTimeout(() => {
      setShowEarned(true);
      
      const duration = 2000;
      const steps = 60;
      const increment = earned / steps;
      let current = previousBalance;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= newBalance) {
          current = newBalance;
          clearInterval(interval);
        }
        setAnimatedPoints(Math.round(current));
      }, duration / steps);
      
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timer);
  }, [earned, previousBalance, newBalance]);

  const getTierIcon = (tierName: string) => {
    switch (tierName.toLowerCase()) {
      case 'bronze':
        return Award;
      case 'silver':
        return Star;
      case 'gold':
        return Crown;
      case 'platinum':
        return Trophy;
      case 'diamond':
        return Sparkles;
      default:
        return Award;
    }
  };

  const getTierColor = (tierName: string) => {
    switch (tierName.toLowerCase()) {
      case 'bronze':
        return 'from-orange-400 to-orange-600';
      case 'silver':
        return 'from-gray-400 to-gray-600';
      case 'gold':
        return 'from-yellow-400 to-yellow-600';
      case 'platinum':
        return 'from-purple-400 to-purple-600';
      case 'diamond':
        return 'from-blue-400 to-blue-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getTierBenefits = (tierName: string) => {
    const benefits: { [key: string]: string[] } = {
      'bronze': ['5% bonus points', 'Birthday rewards', 'Member-only deals'],
      'silver': ['10% bonus points', 'Free room upgrades', 'Late checkout'],
      'gold': ['15% bonus points', 'Lounge access', 'Free breakfast', 'Priority support'],
      'platinum': ['20% bonus points', 'Suite upgrades', 'Free spa credits', 'Personal concierge'],
      'diamond': ['25% bonus points', 'Guaranteed upgrades', 'Free transfers', 'VIP experiences']
    };
    return benefits[tierName.toLowerCase()] || [];
  };

  const progressPercentage = ((newBalance - (newBalance - pointsToNextTier)) / pointsToNextTier) * 100;

  const TierIcon = getTierIcon(tier);
  const NextTierIcon = getTierIcon(nextTier);

  return (
    <div className="space-y-6">
      {/* Points Earned Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
        <CardContent className="p-8 text-center">
          <div className="relative">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-4 w-8 h-8 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-6 w-6 h-6 bg-purple-400 rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-8 right-8 w-4 h-4 bg-emerald-400 rounded-full animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Congratulations! 🎉
              </h3>
              
              <p className="text-gray-600 mb-6">
                You've earned loyalty points with this booking
              </p>

              <div className="space-y-4">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                  +{earned.toLocaleString()} Points
                </div>
                
                <div className="text-lg text-gray-700">
                  Total Balance: <span className="font-bold text-gray-900">{animatedPoints.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Tier Status */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <TierIcon className="w-5 h-5 mr-2 text-yellow-600" />
            Your Tier Status
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Tier */}
          <div className="text-center">
            <div className={`w-16 h-16 bg-gradient-to-r ${getTierColor(tier)} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <TierIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {tier} Member
            </h3>
            <Badge className={`bg-gradient-to-r ${getTierColor(tier)} text-white border-0`}>
              Current Tier
            </Badge>
          </div>

          {/* Progress to Next Tier */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Progress to {nextTier}</span>
              <span className="text-sm text-gray-600">
                {pointsToNextTier.toLocaleString()} points to go
              </span>
            </div>
            
            <Progress value={progressPercentage} className="h-3" />
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{tier}</span>
              <span>{nextTier}</span>
            </div>
          </div>

          {/* Next Tier Preview */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center mb-3">
              <NextTierIcon className="w-5 h-5 mr-2 text-purple-600" />
              <h4 className="font-semibold text-gray-900">Unlock {nextTier} Benefits</h4>
            </div>
            <div className="space-y-2">
              {getTierBenefits(nextTier).slice(0, 3).map((benefit, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Tier Benefits */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Gift className="w-5 h-5 mr-2 text-emerald-600" />
            Your {tier} Benefits
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {getTierBenefits(tier).map((benefit, index) => (
              <div key={index} className="flex items-center p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <Gift className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-emerald-900 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Points Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Award className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-blue-900">Booking Reward</div>
                  <div className="text-sm text-blue-700">Grand Palace Hotel</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-900">+{earned.toLocaleString()}</div>
                <div className="text-xs text-blue-700">Today</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <Star className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Review Bonus</div>
                  <div className="text-sm text-gray-600">Hotel Lumière</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">+50</div>
                <div className="text-xs text-gray-600">2 days ago</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <Target className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Referral Bonus</div>
                  <div className="text-sm text-gray-600">Friend signup</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">+500</div>
                <div className="text-xs text-gray-600">1 week ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Redeem Points CTA */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ready to Use Your Points?
          </h3>
          <p className="text-gray-600 mb-6">
            Redeem your {newBalance.toLocaleString()} points for free nights, upgrades, and exclusive experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <Gift className="w-4 h-4 mr-2" />
              Redeem Points
            </Button>
            <Button variant="outline">
              <ArrowRight className="w-4 h-4 mr-2" />
              View Rewards Catalog
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyPointsEarned;