'use client';

import React from 'react';
import HeaderNavbar from '@/components/HeaderNavbar';
import { ErrorMessageDisplay } from '@/components/ErrorMessageDisplay';
import { BackToHomeButton } from '@/components/BackToHomeButton';
import { SupportLink } from '@/components/SupportLink';
import { Search, MapPin, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Main 404 Content */}
          <div className="text-center mb-12">
            <div className="text-8xl md:text-9xl font-bold text-gray-200 mb-4">
              404
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Error Details */}
          <div className="mb-12">
            <ErrorMessageDisplay
              type="warning"
              title="Page Not Found"
              message="The requested page could not be found on our servers. Please check the URL and try again."
              details="Error Code: 404\nPath: /invalid-page\nTimestamp: 2024-01-15T10:30:00Z"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <BackToHomeButton 
              variant="primary" 
              size="lg"
              children="Go to Homepage"
            />
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg font-medium transition-all duration-200"
            >
              <Compass className="w-4 h-4" />
              Go Back
            </button>
          </div>

          {/* Popular Destinations */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Popular Destinations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Paris, France', icon: '🗼' },
                { name: 'Tokyo, Japan', icon: '🗾' },
                { name: 'New York, USA', icon: '🗽' }
              ].map((destination, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  <span className="text-2xl">{destination.icon}</span>
                  <span className="font-medium text-gray-900">{destination.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Need Help Finding Something?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SupportLink 
                type="help"
                variant="card"
                title="Search Hotels"
                description="Find the perfect accommodation for your next trip"
                contactInfo="Browse our extensive collection"
              />
              <SupportLink 
                type="chat"
                variant="card"
                title="Contact Support"
                description="Get help from our customer service team"
                contactInfo="Available 24/7"
              />
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Try Searching Instead
            </h3>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for hotels, destinations..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 