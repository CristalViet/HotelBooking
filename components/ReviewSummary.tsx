'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, TrendingUp } from 'lucide-react';

interface ReviewSummaryProps {
  rating: number;
  totalReviews: number;
  reviews: any[];
}

const ReviewSummary = ({ rating, totalReviews, reviews }: ReviewSummaryProps) => {
  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(review => review.rating === stars).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, count, percentage };
  });

  // Calculate category scores (mock data for demo)
  const categoryScores = [
    { category: 'Cleanliness', score: 4.9 },
    { category: 'Service', score: 4.8 },
    { category: 'Location', score: 4.9 },
    { category: 'Value', score: 4.6 },
    { category: 'Amenities', score: 4.7 },
    { category: 'Comfort', score: 4.8 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-emerald-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 4.5) return 'bg-emerald-500';
    if (score >= 4.0) return 'bg-blue-500';
    if (score >= 3.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-0 shadow-lg h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">
          Guest Reviews
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {rating}
          </div>
          <div className="flex items-center justify-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-5 h-5 ${
                  i < Math.floor(rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <p className="text-gray-600">
            Based on {totalReviews.toLocaleString()} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Rating Breakdown</h4>
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center w-16">
                <span className="text-sm text-gray-600 mr-1">{stars}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1">
                <Progress 
                  value={percentage} 
                  className="h-2"
                />
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>

        {/* Category Scores */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Category Ratings</h4>
          <div className="space-y-3">
            {categoryScores.map(({ category, score }) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getProgressColor(score)}`}
                      style={{ width: `${(score / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                    {score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trends */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h4 className="font-semibold text-emerald-900">Recent Trends</h4>
          </div>
          <p className="text-sm text-emerald-800">
            Guest satisfaction has increased by 5% in the last 3 months, with particular improvements in service quality and amenities.
          </p>
        </div>

        {/* Guest Highlights */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">What Guests Love</h4>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
              <span className="text-gray-700">"Exceptional location and service"</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
              <span className="text-gray-700">"Beautiful rooms with amazing views"</span>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3" />
              <span className="text-gray-700">"Outstanding spa and wellness facilities"</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewSummary;