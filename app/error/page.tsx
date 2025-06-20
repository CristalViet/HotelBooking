'use client';

import React, { useState } from 'react';
import HeaderNavbar from '@/components/HeaderNavbar';
import { ErrorMessageDisplay } from '@/components/ErrorMessageDisplay';
import { RetryButton } from '@/components/RetryButton';
import { BackToHomeButton } from '@/components/BackToHomeButton';
import { SupportLink } from '@/components/SupportLink';
import { Search, AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function ErrorPage() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate retry action
    setTimeout(() => {
      setIsRetrying(false);
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Main Error Content */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're sorry, but something unexpected happened. Don't worry, our team has been notified and is working to fix this issue.
            </p>
          </div>

          {/* Error Details */}
          <div className="mb-12">
            <ErrorMessageDisplay
              type="error"
              title="Page Not Found"
              message="The page you're looking for doesn't exist or has been moved. Please check the URL and try again."
              details="Error Code: 404\nTimestamp: 2024-01-15T10:30:00Z\nRequest ID: req_123456789"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <BackToHomeButton 
              variant="primary" 
              size="lg"
              children="Go to Homepage"
            />
            <RetryButton 
              onRetry={handleRetry}
              isLoading={isRetrying}
              variant="outline"
              size="lg"
              children={isRetrying ? "Retrying..." : "Try Again"}
            />
          </div>

          {/* Support Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Need Help?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SupportLink 
                type="chat"
                variant="card"
              />
              <SupportLink 
                type="email"
                variant="card"
              />
              <SupportLink 
                type="help"
                variant="card"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <Search className="w-4 h-4" />
                Search Hotels
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <Home className="w-4 h-4" />
                Browse Destinations
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
                Check Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 