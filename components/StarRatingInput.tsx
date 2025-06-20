'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface StarRatingInputProps {
  title: string;
  description?: string;
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: 'small' | 'medium' | 'large';
  required?: boolean;
}

const StarRatingInput = ({ 
  title, 
  description, 
  rating, 
  onRatingChange, 
  size = 'medium',
  required = false 
}: StarRatingInputProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const starSizes = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const containerSizes = {
    small: 'gap-1',
    medium: 'gap-2',
    large: 'gap-3'
  };

  const ratingLabels = [
    'Poor',
    'Fair', 
    'Good',
    'Very Good',
    'Excellent'
  ];

  const ratingDescriptions = [
    'Disappointing experience',
    'Below expectations',
    'Met expectations',
    'Exceeded expectations',
    'Outstanding experience'
  ];

  const handleStarClick = (starRating: number) => {
    onRatingChange(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoverRating(starRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  if (size === 'large') {
    return (
      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </CardTitle>
          {description && (
            <p className="text-gray-600 text-lg">{description}</p>
          )}
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          {/* Stars */}
          <div 
            className={`flex items-center justify-center ${containerSizes[size]}`}
            onMouseLeave={handleMouseLeave}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                className="transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                <Star
                  className={`${starSizes[size]} transition-all duration-200 ${
                    star <= displayRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-300'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Rating Label */}
          {displayRating > 0 && (
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900">
                {ratingLabels[displayRating - 1]}
              </div>
              <div className="text-gray-600">
                {ratingDescriptions[displayRating - 1]}
              </div>
            </div>
          )}

          {/* Rating Scale */}
          <div className="flex justify-between text-xs text-gray-500 max-w-md mx-auto">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">
          {title}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h4>
        {displayRating > 0 && (
          <span className="text-sm font-medium text-gray-700">
            {ratingLabels[displayRating - 1]}
          </span>
        )}
      </div>
      
      <div 
        className={`flex items-center ${containerSizes[size]}`}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            className="transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            <Star
              className={`${starSizes[size]} transition-all duration-200 ${
                star <= displayRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </button>
        ))}
      </div>
      
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default StarRatingInput;