'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  Award, 
  CheckCircle, 
  Star, 
  CreditCard,
  Phone,
  Clock
} from 'lucide-react';

const TrustBadgeBar = () => {
  const trustBadges = [
    {
      icon: Shield,
      title: 'SSL Secured',
      description: '256-bit encryption',
      color: 'green'
    },
    {
      icon: Award,
      title: 'Verified Hotel',
      description: 'Quality assured',
      color: 'blue'
    },
    {
      icon: CheckCircle,
      title: 'Best Price',
      description: 'Guaranteed',
      color: 'emerald'
    },
    {
      icon: Star,
      title: '4.8/5 Rating',
      description: '10K+ reviews',
      color: 'yellow'
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Secure Payment',
      description: 'Your payment information is encrypted and secure'
    },
    {
      icon: CreditCard,
      title: 'No Hidden Fees',
      description: 'All taxes and fees are included in the final price'
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Customer service available around the clock'
    },
    {
      icon: Clock,
      title: 'Instant Confirmation',
      description: 'Receive booking confirmation immediately'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      'green': 'bg-green-100 text-green-800 border-green-200',
      'blue': 'bg-blue-100 text-blue-800 border-blue-200',
      'emerald': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'yellow': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colors[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">
            Trusted by Millions
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    badge.color === 'green' ? 'bg-green-100' :
                    badge.color === 'blue' ? 'bg-blue-100' :
                    badge.color === 'emerald' ? 'bg-emerald-100' :
                    'bg-yellow-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      badge.color === 'green' ? 'text-green-600' :
                      badge.color === 'blue' ? 'text-blue-600' :
                      badge.color === 'emerald' ? 'text-emerald-600' :
                      'text-yellow-600'
                    }`} />
                  </div>
                  <div className="text-xs font-medium text-gray-900">{badge.title}</div>
                  <div className="text-xs text-gray-600">{badge.description}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Security & Guarantees
          </h3>
          
          <div className="space-y-4">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{feature.title}</div>
                    <div className="text-xs text-gray-600">{feature.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Certifications & Partnerships
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">PCI DSS Compliant</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Verified
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">ISO 27001 Certified</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Verified
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">GDPR Compliant</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Verified
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Reviews Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-emerald-50">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center space-x-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-lg font-bold text-gray-900">4.8 out of 5</div>
          <div className="text-sm text-gray-600">Based on 50,000+ reviews</div>
          <div className="text-xs text-gray-500 mt-2">
            "Excellent booking experience and customer service"
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="border-0 shadow-lg border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Need Help?</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Our customer support team is available 24/7 to assist you with your booking.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium text-blue-600">+1 (800) 123-4567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-blue-600">support@stayfinder.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Live Chat:</span>
              <span className="font-medium text-emerald-600">Available now</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrustBadgeBar;