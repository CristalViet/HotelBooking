'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  CheckCircle, 
  Gift, 
  Star, 
  Users, 
  RefreshCw,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

interface SubmitReviewButtonProps {
  reviewData: {
    overallRating: number;
    categoryRatings: {
      cleanliness: number;
      service: number;
      location: number;
      value: number;
      amenities: number;
      comfort: number;
    };
    title: string;
    feedback: string;
    photos: File[];
    wouldRecommend: boolean | null;
    tripType: string;
    roomType: string;
    stayDuration: string;
  };
  bookingData: {
    bookingId: string;
    hotel: {
      name: string;
    };
  };
  isComplete: boolean;
}

const SubmitReviewButton = ({ reviewData, bookingData, isComplete }: SubmitReviewButtonProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async () => {
    if (!isComplete) return;

    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 3000);
  };

  const getCompletionStatus = () => {
    const requirements = [
      { label: 'Overall rating', completed: reviewData.overallRating > 0 },
      { label: 'Review title', completed: reviewData.title.trim() !== '' },
      { label: 'Detailed feedback', completed: reviewData.feedback.trim().length >= 50 },
      { label: 'Recommendation', completed: reviewData.wouldRecommend !== null }
    ];

    const completedCount = requirements.filter(req => req.completed).length;
    return { requirements, completedCount, total: requirements.length };
  };

  const { requirements, completedCount, total } = getCompletionStatus();

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
        <CardContent className="p-8 text-center">
          {/* Success Animation */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            {/* Animated sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You! 🎉
          </h2>
          
          <p className="text-lg text-gray-600 mb-6">
            Your review has been submitted successfully and will help other travelers make informed decisions.
          </p>

          {/* Rewards Earned */}
          <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rewards Earned</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="font-semibold text-yellow-900">100 Points</div>
                  <div className="text-sm text-yellow-700">Review bonus</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-purple-900">Reviewer Badge</div>
                  <div className="text-sm text-purple-700">First review</div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">What's Next?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Users className="w-4 h-4 mr-2" />
                View Your Review
              </Button>
              <Button variant="outline">
                <Gift className="w-4 h-4 mr-2" />
                Redeem Points
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Your review will be visible to other travelers within 24 hours after moderation.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Completion Status */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Review Progress</h3>
            <Badge className={`${
              isComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {completedCount}/{total} Complete
            </Badge>
          </div>
          
          <div className="space-y-3">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  req.completed ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {req.completed ? (
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  )}
                </div>
                <span className={`text-sm ${
                  req.completed ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
          
          {!isComplete && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  Please complete all required fields to submit your review
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Preview */}
      {isComplete && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Review Preview</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
            </div>
            
            {showPreview && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < reviewData.overallRating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{reviewData.title}</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {reviewData.feedback}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Trip type: {reviewData.tripType || 'Not specified'}</span>
                    <span>•</span>
                    <span>Room: {reviewData.roomType || bookingData.hotel.name}</span>
                    {reviewData.photos.length > 0 && (
                      <>
                        <span>•</span>
                        <span>{reviewData.photos.length} photo{reviewData.photos.length > 1 ? 's' : ''}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-emerald-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to Share Your Experience?
          </h3>
          
          <p className="text-gray-600 mb-6">
            Your review will help thousands of travelers make informed decisions and earn you valuable rewards.
          </p>

          <Button
            onClick={handleSubmit}
            disabled={!isComplete || isSubmitting}
            className={`px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
              isComplete && !isSubmitting
                ? 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Submitting Review...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Submit Review
              </div>
            )}
          </Button>

          {isComplete && (
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Gift className="w-4 h-4 mr-1 text-yellow-600" />
                <span>Earn 100 points</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-blue-600" />
                <span>Help travelers</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-purple-600" />
                <span>Build reputation</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitReviewButton;