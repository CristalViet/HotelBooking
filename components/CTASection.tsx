'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Download, Mail, Bell, Gift, Star } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-emerald-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        {/* App Download Section */}
        <div className="mb-20">
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-emerald-500">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-12 lg:p-16 text-white">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        Get the StayFinder App
                      </h2>
                      <p className="text-blue-100">Travel smarter with exclusive mobile features</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 mr-3 text-yellow-300" />
                      <span>Exclusive mobile-only deals up to 25% off</span>
                    </div>
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 mr-3 text-yellow-300" />
                      <span>Instant notifications for price drops</span>
                    </div>
                    <div className="flex items-center">
                      <Gift className="w-5 h-5 mr-3 text-yellow-300" />
                      <span>Earn loyalty points with every booking</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      <div className="text-left">
                        <div className="text-xs">Download on the</div>
                        <div className="font-semibold">App Store</div>
                      </div>
                    </Button>
                    <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      <div className="text-left">
                        <div className="text-xs">Get it on</div>
                        <div className="font-semibold">Google Play</div>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <div className="relative p-8 lg:p-12 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 bg-white/20 rounded-full absolute -top-8 -left-8 animate-pulse"></div>
                    <div className="w-48 h-48 bg-white/10 rounded-full absolute top-8 right-8 animate-pulse delay-300"></div>
                    <img 
                      src="https://images.pexels.com/photos/4050334/pexels-photo-4050334.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Mobile App"
                      className="relative z-10 w-72 h-auto rounded-3xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Signup Section */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto border-0 shadow-xl bg-white">
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Stay in the Loop
                  </h2>
                  <p className="text-gray-600">Get exclusive deals and travel inspiration</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join over 100,000 travelers who receive our weekly newsletter with hand-picked deals, 
                travel tips, and destination guides delivered straight to their inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <Input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 h-12 px-4 border-gray-300 focus:border-blue-500 rounded-lg"
                />
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
              
              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  100K+ Subscribers
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Weekly Updates
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Exclusive Deals
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTASection;