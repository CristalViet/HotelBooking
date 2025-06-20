'use client';

import React, { useState } from 'react';
import HeaderNavbar from '@/components/HeaderNavbar';
import { ErrorMessageDisplay } from '@/components/ErrorMessageDisplay';
import { RetryButton } from '@/components/RetryButton';
import { BackToHomeButton } from '@/components/BackToHomeButton';
import { SupportLink } from '@/components/SupportLink';
import { Server, AlertCircle, RefreshCw } from 'lucide-react';

export default function ServerErrorPage() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate retry action
    setTimeout(() => {
      setIsRetrying(false);
      window.location.reload();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavbar />
      
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Main 500 Content */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center">
              <Server className="w-12 h-12 text-red-600" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Server Error
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're experiencing technical difficulties. Our team has been notified and is working to resolve this issue as quickly as possible.
            </p>
          </div>

          {/* Error Details */}
          <div className="mb-12">
            <ErrorMessageDisplay
              type="critical"
              title="Internal Server Error"
              message="Something went wrong on our end. This is not your fault - it's a technical issue we're working to fix."
              details="Error Code: 500\nServer: web-01\nTimestamp: 2024-01-15T10:30:00Z\nRequest ID: req_987654321"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <RetryButton 
              onRetry={handleRetry}
              isLoading={isRetrying}
              variant="primary"
              size="lg"
              children={isRetrying ? "Retrying..." : "Try Again"}
            />
            <BackToHomeButton 
              variant="outline"
              size="lg"
              children="Go to Homepage"
            />
          </div>

          {/* Status Information */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              System Status
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold text-green-800">Website</h3>
                <p className="text-sm text-green-600">Operational</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold text-yellow-800">Booking System</h3>
                <p className="text-sm text-yellow-600">Maintenance</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <h3 className="font-semibold text-green-800">Support</h3>
                <p className="text-sm text-green-600">Available</p>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Get Help
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SupportLink 
                type="chat"
                variant="card"
                title="Live Chat"
                description="Get immediate assistance from our support team"
                contactInfo="Available 24/7"
              />
              <SupportLink 
                type="email"
                variant="card"
                title="Email Support"
                description="Send us a detailed message about the issue"
                contactInfo="support@stayfinder.com"
              />
            </div>
          </div>

          {/* Alternative Actions */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What you can do while we fix this:
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
                Check Status Page
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                <AlertCircle className="w-4 h-4" />
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 