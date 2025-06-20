'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Download, 
  Smartphone, 
  Monitor, 
  CheckCircle,
  Clock,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface AddToCalendarButtonProps {
  bookingData: {
    hotelName: string;
    address: string;
    checkIn: Date;
    checkOut: Date;
    bookingId: string;
  };
}

const AddToCalendarButton = ({ bookingData }: AddToCalendarButtonProps) => {
  const [selectedCalendar, setSelectedCalendar] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { hotelName, address, checkIn, checkOut, bookingId } = bookingData;

  const calendarOptions = [
    {
      id: 'google',
      name: 'Google Calendar',
      icon: Monitor,
      description: 'Add to your Google Calendar',
      color: 'blue'
    },
    {
      id: 'outlook',
      name: 'Outlook',
      icon: Monitor,
      description: 'Add to Microsoft Outlook',
      color: 'indigo'
    },
    {
      id: 'apple',
      name: 'Apple Calendar',
      icon: Smartphone,
      description: 'Add to iPhone/Mac Calendar',
      color: 'gray'
    },
    {
      id: 'ics',
      name: 'Download ICS',
      icon: Download,
      description: 'Download calendar file',
      color: 'emerald'
    }
  ];

  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const generateCalendarUrl = (type: string) => {
    const title = `Hotel Stay: ${hotelName}`;
    const details = `Booking ID: ${bookingId}\nHotel: ${hotelName}\nAddress: ${address}`;
    const startDate = formatDateForCalendar(checkIn);
    const endDate = formatDateForCalendar(checkOut);

    switch (type) {
      case 'google':
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(address)}`;
      
      case 'outlook':
        return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${startDate}&enddt=${endDate}&body=${encodeURIComponent(details)}&location=${encodeURIComponent(address)}`;
      
      case 'apple':
        return generateICSFile();
      
      case 'ics':
        return generateICSFile();
      
      default:
        return '';
    }
  };

  const generateICSFile = () => {
    const startDate = formatDateForCalendar(checkIn);
    const endDate = formatDateForCalendar(checkOut);
    const title = `Hotel Stay: ${hotelName}`;
    const details = `Booking ID: ${bookingId}\\nHotel: ${hotelName}\\nAddress: ${address}`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//StayFinder//EN
BEGIN:VEVENT
UID:${bookingId}@stayfinder.com
DTSTAMP:${formatDateForCalendar(new Date())}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${title}
DESCRIPTION:${details}
LOCATION:${address}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `hotel-booking-${bookingId}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return url;
  };

  const handleAddToCalendar = async (calendarType: string) => {
    setSelectedCalendar(calendarType);
    setIsAdding(true);

    // Simulate adding to calendar
    setTimeout(() => {
      if (calendarType === 'ics' || calendarType === 'apple') {
        generateICSFile();
      } else {
        const url = generateCalendarUrl(calendarType);
        window.open(url, '_blank');
      }
      
      setIsAdding(false);
      setIsAdded(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsAdded(false);
        setSelectedCalendar('');
      }, 3000);
    }, 1500);
  };

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      'blue': 'bg-blue-100 text-blue-800 border-blue-200',
      'indigo': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'gray': 'bg-gray-100 text-gray-800 border-gray-200',
      'emerald': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    return colors[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (isAdded) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Added to Calendar!
          </h3>
          <p className="text-gray-600">
            Your hotel booking has been successfully added to your calendar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Add to Calendar
        </CardTitle>
        <p className="text-gray-600">
          Never miss your trip! Add your hotel booking to your calendar for easy access.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Booking Preview */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-3">Calendar Event Preview</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-blue-600 mr-2" />
              <span className="font-medium text-blue-900">Hotel Stay: {hotelName}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-800">
                {checkIn.toLocaleDateString()} - {checkOut.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-blue-800">{address}</span>
            </div>
            <div className="flex items-center">
              <Badge className="bg-blue-200 text-blue-800 text-xs">
                Booking ID: {bookingId}
              </Badge>
            </div>
          </div>
        </div>

        {/* Calendar Options */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Choose your calendar:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calendarOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedCalendar === option.id;
              const isLoading = isAdding && isSelected;
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleAddToCalendar(option.id)}
                  disabled={isAdding}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected && isLoading
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  } ${isAdding ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      option.color === 'blue' ? 'bg-blue-100' :
                      option.color === 'indigo' ? 'bg-indigo-100' :
                      option.color === 'gray' ? 'bg-gray-100' :
                      'bg-emerald-100'
                    }`}>
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      ) : (
                        <Icon className={`w-6 h-6 ${
                          option.color === 'blue' ? 'text-blue-600' :
                          option.color === 'indigo' ? 'text-indigo-600' :
                          option.color === 'gray' ? 'text-gray-600' :
                          'text-emerald-600'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{option.name}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    {option.id !== 'ics' && option.id !== 'apple' && (
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">What gets added to your calendar:</h4>
          <div className="space-y-1 text-sm text-gray-700">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
              <span>Hotel name and booking details</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
              <span>Check-in and check-out dates</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
              <span>Hotel address and contact information</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
              <span>Your booking confirmation number</span>
            </div>
          </div>
        </div>

        {/* Quick Add Button */}
        <Button 
          onClick={() => handleAddToCalendar('google')}
          disabled={isAdding}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
        >
          {isAdding ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding to Calendar...
            </div>
          ) : (
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Quick Add to Google Calendar
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddToCalendarButton;