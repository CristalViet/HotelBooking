'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Shield, 
  Lock,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}

const PaymentMethodSelector = ({ selectedMethod, onMethodChange }: PaymentMethodSelectorProps) => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [showCVV, setShowCVV] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Smartphone,
      description: 'Pay with your PayPal account',
      popular: false
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: Smartphone,
      description: 'Touch ID or Face ID',
      popular: false
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: Smartphone,
      description: 'Pay with Google',
      popular: false
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank transfer',
      popular: false
    }
  ];

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'American Express';
    return '';
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Payment Method
        </CardTitle>
        <p className="text-gray-600">
          Choose your preferred payment method. All transactions are secured with 256-bit SSL encryption.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Payment Method Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <div
                key={method.id}
                onClick={() => onMethodChange(method.id)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {method.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">
                    Popular
                  </Badge>
                )}
                
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isSelected ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      isSelected ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {method.name}
                    </h3>
                    <p className={`text-sm ${
                      isSelected ? 'text-blue-700' : 'text-gray-600'
                    }`}>
                      {method.description}
                    </p>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Details Form */}
        {selectedMethod === 'card' && (
          <div className="space-y-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Card Details
            </h3>
            
            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
                  Card Number
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({
                      ...cardDetails,
                      number: formatCardNumber(e.target.value)
                    })}
                    maxLength={19}
                    className="pr-20"
                  />
                  {getCardType(cardDetails.number) && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Badge variant="outline" className="text-xs">
                        {getCardType(cardDetails.number)}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <Label htmlFor="cardName" className="text-sm font-medium text-gray-700">
                  Cardholder Name
                </Label>
                <Input
                  id="cardName"
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({
                    ...cardDetails,
                    name: e.target.value
                  })}
                  className="mt-1"
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-sm font-medium text-gray-700">
                    Expiry Date
                  </Label>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({
                      ...cardDetails,
                      expiry: formatExpiry(e.target.value)
                    })}
                    maxLength={5}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cvv" className="text-sm font-medium text-gray-700">
                    CVV
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="cvv"
                      type={showCVV ? "text" : "password"}
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({
                        ...cardDetails,
                        cvv: e.target.value.replace(/\D/g, '').substring(0, 4)
                      })}
                      maxLength={4}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCVV(!showCVV)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showCVV ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900">Billing Address</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                      Country
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                        <SelectItem value="de">Germany</SelectItem>
                        <SelectItem value="fr">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                      ZIP/Postal Code
                    </Label>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="12345"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* E-wallet Options */}
        {(selectedMethod === 'paypal' || selectedMethod === 'apple-pay' || selectedMethod === 'google-pay') && (
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Smartphone className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedMethod === 'paypal' && 'PayPal'}
                  {selectedMethod === 'apple-pay' && 'Apple Pay'}
                  {selectedMethod === 'google-pay' && 'Google Pay'}
                </h3>
                <p className="text-gray-600">
                  You'll be redirected to complete your payment securely.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Continue with {selectedMethod === 'paypal' && 'PayPal'}
                {selectedMethod === 'apple-pay' && 'Apple Pay'}
                {selectedMethod === 'google-pay' && 'Google Pay'}
              </Button>
            </div>
          </div>
        )}

        {/* Bank Transfer */}
        {selectedMethod === 'bank-transfer' && (
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Bank Transfer Details
              </h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">StayFinder Payments Ltd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sort Code:</span>
                    <span className="font-medium">12-34-56</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-medium">BOOKING-{Date.now()}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Please include the reference number with your transfer. Your booking will be confirmed once payment is received (usually within 1-2 business days).
              </p>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-green-900">Secure Payment</h4>
              <p className="text-sm text-green-800">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodSelector;