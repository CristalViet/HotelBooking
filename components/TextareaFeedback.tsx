'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Users, 
  Calendar,
  Bed,
  Lightbulb
} from 'lucide-react';

interface TextareaFeedbackProps {
  reviewData: {
    title: string;
    feedback: string;
    wouldRecommend: boolean | null;
    tripType: string;
    roomType: string;
    stayDuration: string;
  };
  onFeedbackChange: (field: string, value: string | boolean) => void;
  bookingData: {
    room: {
      name: string;
    };
    dates: {
      nights: number;
    };
  };
}

const TextareaFeedback = ({ reviewData, onFeedbackChange, bookingData }: TextareaFeedbackProps) => {
  const [titleCharCount, setTitleCharCount] = useState(reviewData.title.length);
  const [feedbackCharCount, setFeedbackCharCount] = useState(reviewData.feedback.length);

  const maxTitleLength = 100;
  const maxFeedbackLength = 2000;
  const minFeedbackLength = 50;

  const tripTypes = [
    'Business',
    'Leisure',
    'Family vacation',
    'Romantic getaway',
    'Solo travel',
    'Group travel',
    'Wedding',
    'Anniversary',
    'Other'
  ];

  const stayDurations = [
    '1 night',
    '2-3 nights',
    '4-7 nights',
    '1-2 weeks',
    'More than 2 weeks'
  ];

  const handleTitleChange = (value: string) => {
    if (value.length <= maxTitleLength) {
      setTitleCharCount(value.length);
      onFeedbackChange('title', value);
    }
  };

  const handleFeedbackChange = (value: string) => {
    if (value.length <= maxFeedbackLength) {
      setFeedbackCharCount(value.length);
      onFeedbackChange('feedback', value);
    }
  };

  const suggestedTopics = [
    'Room cleanliness and comfort',
    'Staff service and friendliness',
    'Hotel location and accessibility',
    'Amenities and facilities',
    'Food and dining experience',
    'Value for money',
    'Check-in/check-out process',
    'Noise levels and atmosphere'
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
          Share Your Experience
        </CardTitle>
        <p className="text-gray-600">
          Tell other travelers about your stay. Your detailed feedback helps everyone make better decisions.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Trip Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="tripType" className="text-sm font-medium text-gray-700">
              Trip Type
            </Label>
            <Select value={reviewData.tripType} onValueChange={(value) => onFeedbackChange('tripType', value)}>
              <SelectTrigger className="mt-1">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Select trip type" />
              </SelectTrigger>
              <SelectContent>
                {tripTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="roomType" className="text-sm font-medium text-gray-700">
              Room Type
            </Label>
            <Input
              id="roomType"
              value={reviewData.roomType || bookingData.room.name}
              onChange={(e) => onFeedbackChange('roomType', e.target.value)}
              placeholder="e.g., Deluxe Room"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="stayDuration" className="text-sm font-medium text-gray-700">
              Stay Duration
            </Label>
            <Select value={reviewData.stayDuration} onValueChange={(value) => onFeedbackChange('stayDuration', value)}>
              <SelectTrigger className="mt-1">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {stayDurations.map((duration) => (
                  <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recommendation */}
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Would you recommend this hotel to others? *
          </Label>
          <div className="flex gap-4">
            <button
              onClick={() => onFeedbackChange('wouldRecommend', true)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
                reviewData.wouldRecommend === true
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  reviewData.wouldRecommend === true ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <ThumbsUp className={`w-6 h-6 ${
                    reviewData.wouldRecommend === true ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="text-left">
                  <h4 className={`font-semibold ${
                    reviewData.wouldRecommend === true ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    Yes, I'd recommend
                  </h4>
                  <p className={`text-sm ${
                    reviewData.wouldRecommend === true ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    Great experience overall
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => onFeedbackChange('wouldRecommend', false)}
              className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
                reviewData.wouldRecommend === false
                  ? 'border-red-500 bg-red-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  reviewData.wouldRecommend === false ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <ThumbsDown className={`w-6 h-6 ${
                    reviewData.wouldRecommend === false ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="text-left">
                  <h4 className={`font-semibold ${
                    reviewData.wouldRecommend === false ? 'text-red-900' : 'text-gray-900'
                  }`}>
                    No, I wouldn't
                  </h4>
                  <p className={`text-sm ${
                    reviewData.wouldRecommend === false ? 'text-red-700' : 'text-gray-600'
                  }`}>
                    Had some issues
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Review Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Review Title *
          </Label>
          <div className="relative">
            <Input
              id="title"
              value={reviewData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Summarize your experience in a few words"
              className="pr-16"
              required
            />
            <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${
              titleCharCount > maxTitleLength * 0.9 ? 'text-red-500' : 'text-gray-400'
            }`}>
              {titleCharCount}/{maxTitleLength}
            </div>
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="space-y-4">
          <Label htmlFor="feedback" className="text-sm font-medium text-gray-700">
            Detailed Review *
          </Label>
          <Textarea
            id="feedback"
            value={reviewData.feedback}
            onChange={(e) => handleFeedbackChange(e.target.value)}
            placeholder="Share the details of your experience. What did you love? What could be improved? Help other travelers by being specific about your stay."
            rows={6}
            className="resize-none"
            required
          />
          <div className="flex justify-between items-center">
            <div className={`text-xs ${
              feedbackCharCount < minFeedbackLength 
                ? 'text-red-500' 
                : feedbackCharCount > maxFeedbackLength * 0.9 
                  ? 'text-orange-500' 
                  : 'text-gray-400'
            }`}>
              {feedbackCharCount < minFeedbackLength 
                ? `${minFeedbackLength - feedbackCharCount} more characters needed`
                : `${feedbackCharCount}/${maxFeedbackLength} characters`
              }
            </div>
            {feedbackCharCount >= minFeedbackLength && (
              <Badge className="bg-green-100 text-green-800">
                Good length
              </Badge>
            )}
          </div>
        </div>

        {/* Writing Tips */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Writing Tips</h4>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-blue-800 mb-3">
              Consider mentioning these aspects in your review:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedTopics.map((topic, index) => (
                <div key={index} className="flex items-center text-sm text-blue-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Pro tip:</strong> Specific details are more helpful than general statements. 
                Instead of "good service,\" try "the front desk staff helped us find a great local restaurant."
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextareaFeedback;