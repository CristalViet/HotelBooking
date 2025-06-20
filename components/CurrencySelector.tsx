'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Globe } from 'lucide-react';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }: CurrencySelectorProps) => {
  const currencies = [
    { 
      code: 'USD', 
      name: 'US Dollar', 
      symbol: '$', 
      flag: '🇺🇸',
      rate: 1.00,
      popular: true
    },
    { 
      code: 'EUR', 
      name: 'Euro', 
      symbol: '€', 
      flag: '🇪🇺',
      rate: 0.85,
      popular: true
    },
    { 
      code: 'GBP', 
      name: 'British Pound', 
      symbol: '£', 
      flag: '🇬🇧',
      rate: 0.73,
      popular: true
    },
    { 
      code: 'JPY', 
      name: 'Japanese Yen', 
      symbol: '¥', 
      flag: '🇯🇵',
      rate: 110.25,
      popular: false
    },
    { 
      code: 'CAD', 
      name: 'Canadian Dollar', 
      symbol: 'C$', 
      flag: '🇨🇦',
      rate: 1.25,
      popular: false
    },
    { 
      code: 'AUD', 
      name: 'Australian Dollar', 
      symbol: 'A$', 
      flag: '🇦🇺',
      rate: 1.35,
      popular: false
    },
    { 
      code: 'CHF', 
      name: 'Swiss Franc', 
      symbol: 'CHF', 
      flag: '🇨🇭',
      rate: 0.92,
      popular: false
    },
    { 
      code: 'CNY', 
      name: 'Chinese Yuan', 
      symbol: '¥', 
      flag: '🇨🇳',
      rate: 6.45,
      popular: false
    }
  ];

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);
  const popularCurrencies = currencies.filter(c => c.popular);

  const convertAmount = (amount: number, fromRate: number, toRate: number) => {
    return ((amount / fromRate) * toRate).toFixed(2);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-blue-600" />
          Currency & Pricing
        </CardTitle>
        <p className="text-gray-600">
          Select your preferred currency. Prices will be converted at current exchange rates.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Popular Currencies Quick Select */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Popular Currencies</h3>
          <div className="grid grid-cols-3 gap-3">
            {popularCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => onCurrencyChange(currency.code)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedCurrency === currency.code
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{currency.flag}</div>
                  <div className={`font-semibold text-sm ${
                    selectedCurrency === currency.code ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {currency.code}
                  </div>
                  <div className={`text-xs ${
                    selectedCurrency === currency.code ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {currency.symbol}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* All Currencies Dropdown */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">All Currencies</h3>
          <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="w-full h-12">
              <SelectValue>
                {selectedCurrencyData && (
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{selectedCurrencyData.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{selectedCurrencyData.code} - {selectedCurrencyData.name}</div>
                      <div className="text-sm text-gray-500">1 USD = {selectedCurrencyData.rate} {selectedCurrencyData.code}</div>
                    </div>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center space-x-3 py-1">
                    <span className="text-lg">{currency.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{currency.code}</span>
                        <span className="text-gray-600">-</span>
                        <span className="text-gray-600">{currency.name}</span>
                        {currency.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        1 USD = {currency.rate} {currency.code}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Exchange Rate Info */}
        {selectedCurrencyData && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">Exchange Rate Information</h4>
                <p className="text-sm text-blue-700">Current rates as of today</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <div className="text-gray-600">1 USD equals</div>
                <div className="font-bold text-lg text-gray-900">
                  {selectedCurrencyData.rate} {selectedCurrencyData.code}
                </div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-gray-600">1 {selectedCurrencyData.code} equals</div>
                <div className="font-bold text-lg text-gray-900">
                  {(1 / selectedCurrencyData.rate).toFixed(4)} USD
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-blue-700">
              <div className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3" />
                <span>Exchange rates are updated daily and may include a small conversion fee</span>
              </div>
            </div>
          </div>
        )}

        {/* Sample Price Conversion */}
        {selectedCurrency !== 'USD' && selectedCurrencyData && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Price Examples</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">$100 USD</span>
                <span className="font-medium">
                  {selectedCurrencyData.symbol}{convertAmount(100, 1, selectedCurrencyData.rate)} {selectedCurrencyData.code}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">$250 USD</span>
                <span className="font-medium">
                  {selectedCurrencyData.symbol}{convertAmount(250, 1, selectedCurrencyData.rate)} {selectedCurrencyData.code}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">$500 USD</span>
                <span className="font-medium">
                  {selectedCurrencyData.symbol}{convertAmount(500, 1, selectedCurrencyData.rate)} {selectedCurrencyData.code}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencySelector;