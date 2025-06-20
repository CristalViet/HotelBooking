'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Shield, 
  CreditCard, 
  Calendar, 
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

interface PolicyAgreementProps {
  onPoliciesAccepted: (accepted: boolean) => void;
  policiesAccepted: boolean;
}

const PolicyAgreement = ({ onPoliciesAccepted, policiesAccepted }: PolicyAgreementProps) => {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    cancellation: false,
    payment: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const policies = [
    {
      id: 'terms',
      title: 'Terms & Conditions',
      icon: FileText,
      description: 'General terms of service and booking conditions',
      required: true,
      link: '#'
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: Shield,
      description: 'How we collect, use, and protect your personal information',
      required: true,
      link: '#'
    },
    {
      id: 'cancellation',
      title: 'Cancellation Policy',
      icon: Calendar,
      description: 'Cancellation and refund terms for your booking',
      required: true,
      link: '#'
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: CreditCard,
      description: 'Payment processing and billing information',
      required: true,
      link: '#'
    }
  ];

  const handleAgreementChange = (policyId: string, checked: boolean) => {
    const newAgreements = { ...agreements, [policyId]: checked };
    setAgreements(newAgreements);
    
    const allRequired = policies
      .filter(p => p.required)
      .every(p => newAgreements[p.id as keyof typeof newAgreements]);
    
    onPoliciesAccepted(allRequired);
  };

  const handleCompleteBooking = async () => {
    setIsProcessing(true);
    
    // Simulate booking completion
    setTimeout(() => {
      setIsProcessing(false);
      // In a real app, this would redirect to confirmation page
      alert('Booking completed successfully! You will receive a confirmation email shortly.');
    }, 3000);
  };

  const allRequiredAccepted = policies
    .filter(p => p.required)
    .every(p => agreements[p.id as keyof typeof agreements]);

  return (
    <div className="space-y-8">
      {/* Policies Agreement */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Terms & Policies Agreement
          </CardTitle>
          <p className="text-gray-600">
            Please review and accept the following policies to complete your booking.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {policies.map((policy) => {
            const Icon = policy.icon;
            const isAccepted = agreements[policy.id as keyof typeof agreements];
            
            return (
              <div
                key={policy.id}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  isAccepted 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <Checkbox
                      id={policy.id}
                      checked={isAccepted}
                      onCheckedChange={(checked) => 
                        handleAgreementChange(policy.id, checked as boolean)
                      }
                      className="mt-1"
                    />
                    
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isAccepted ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        isAccepted ? 'text-green-600' : 'text-gray-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${
                          isAccepted ? 'text-green-900' : 'text-gray-900'
                        }`}>
                          {policy.title}
                        </h3>
                        {policy.required && (
                          <Badge variant="outline" className="text-xs">
                            Required
                          </Badge>
                        )}
                        {isAccepted && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <p className={`text-sm ${
                        isAccepted ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        {policy.description}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Key Policy Highlights */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Key Policy Highlights
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Cancellation</h4>
              </div>
              <p className="text-sm text-blue-800">
                Free cancellation until 24 hours before check-in. After that, first night is non-refundable.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center space-x-3 mb-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">Payment</h4>
              </div>
              <p className="text-sm text-green-800">
                No payment required today. You'll be charged at the hotel upon check-in.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-purple-900">Privacy</h4>
              </div>
              <p className="text-sm text-purple-800">
                Your personal information is encrypted and never shared with third parties.
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-orange-900">Check-in</h4>
              </div>
              <p className="text-sm text-orange-800">
                Check-in from 3:00 PM. Early check-in subject to availability and may incur charges.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Card className="border-0 shadow-lg border-l-4 border-l-yellow-500">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
              <div className="space-y-2 text-sm text-yellow-800">
                <p>
                  • By completing this booking, you agree to all terms and conditions listed above.
                </p>
                <p>
                  • Hotel policies may vary and additional terms may apply at the property.
                </p>
                <p>
                  • Please review all policies carefully as they are legally binding.
                </p>
                <p>
                  • Contact customer service if you have questions about any policy.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complete Booking Button */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-emerald-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Complete Your Booking?
          </h3>
          <p className="text-gray-600 mb-6">
            You're just one click away from securing your stay at Grand Palace Hotel.
          </p>
          
          <Button
            onClick={handleCompleteBooking}
            disabled={!allRequiredAccepted || isProcessing}
            className={`px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
              allRequiredAccepted && !isProcessing
                ? 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Processing Booking...
              </div>
            ) : (
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Booking
              </div>
            )}
          </Button>
          
          {!allRequiredAccepted && (
            <p className="text-sm text-red-600 mt-3">
              Please accept all required policies to continue
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyAgreement;