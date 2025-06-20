'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Users,
  Shield,
  Star,
  Clock
} from 'lucide-react';

interface FormGuestInfoProps {
  onGuestInfoChange: (guestInfo: any) => void;
  guestInfo: any;
}

const FormGuestInfo = ({ onGuestInfoChange, guestInfo }: FormGuestInfoProps) => {
  const [formData, setFormData] = useState({
    // Primary Guest
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Preferences
    specialRequests: '',
    arrivalTime: '',
    dietaryRestrictions: [],
    accessibility: [],
    
    // Additional Guests
    additionalGuests: [],
    
    // Preferences
    newsletter: false,
    smsUpdates: false,
    loyaltyProgram: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Italy', 'Spain', 'Netherlands', 'Japan', 'South Korea', 'Singapore'
  ];

  const arrivalTimes = [
    'Before 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM', 
    '6:00 PM - 9:00 PM', '9:00 PM - 12:00 AM', 'After 12:00 AM'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Dairy-Free', 'Nut Allergy'
  ];

  const accessibilityOptions = [
    'Wheelchair Accessible', 'Hearing Impaired', 'Visual Impaired', 'Mobility Assistance'
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    onGuestInfoChange(newFormData);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }

    // Real-time validation
    if (field === 'email' && value && !validateEmail(value)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
    }
    if (field === 'phone' && value && !validatePhone(value)) {
      setErrors({ ...errors, phone: 'Please enter a valid phone number' });
    }
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    const newFormData = { ...formData, [field]: newArray };
    setFormData(newFormData);
    onGuestInfoChange(newFormData);
  };

  const addAdditionalGuest = () => {
    const newGuest = { firstName: '', lastName: '', age: '' };
    const newFormData = { 
      ...formData, 
      additionalGuests: [...formData.additionalGuests, newGuest] 
    };
    setFormData(newFormData);
    onGuestInfoChange(newFormData);
  };

  const updateAdditionalGuest = (index: number, field: string, value: string) => {
    const updatedGuests = formData.additionalGuests.map((guest, i) => 
      i === index ? { ...guest, [field]: value } : guest
    );
    const newFormData = { ...formData, additionalGuests: updatedGuests };
    setFormData(newFormData);
    onGuestInfoChange(newFormData);
  };

  const removeAdditionalGuest = (index: number) => {
    const updatedGuests = formData.additionalGuests.filter((_, i) => i !== index);
    const newFormData = { ...formData, additionalGuests: updatedGuests };
    setFormData(newFormData);
    onGuestInfoChange(newFormData);
  };

  return (
    <div className="space-y-8">
      {/* Primary Guest Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Primary Guest Information
          </CardTitle>
          <p className="text-gray-600">
            Please provide the details for the main guest. This person will be responsible for the booking.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address *
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number *
              </Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                Date of Birth
              </Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="arrivalTime" className="text-sm font-medium text-gray-700">
                Expected Arrival Time
              </Label>
              <Select 
                value={formData.arrivalTime} 
                onValueChange={(value) => handleInputChange('arrivalTime', value)}
              >
                <SelectTrigger className="mt-1">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Select arrival time" />
                </SelectTrigger>
                <SelectContent>
                  {arrivalTimes.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Address Information
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              Street Address
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                City
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="New York"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                State/Province
              </Label>
              <Input
                id="state"
                type="text"
                placeholder="NY"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                ZIP/Postal Code
              </Label>
              <Input
                id="zipCode"
                type="text"
                placeholder="10001"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="country" className="text-sm font-medium text-gray-700">
              Country
            </Label>
            <Select 
              value={formData.country} 
              onValueChange={(value) => handleInputChange('country', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Additional Guests */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Additional Guests
          </CardTitle>
          <p className="text-gray-600">
            Add information for other guests staying in the room.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {formData.additionalGuests.map((guest, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Guest {index + 2}</h4>
                <button
                  onClick={() => removeAdditionalGuest(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="First name"
                    value={guest.firstName}
                    onChange={(e) => updateAdditionalGuest(index, 'firstName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={guest.lastName}
                    onChange={(e) => updateAdditionalGuest(index, 'lastName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Age
                  </Label>
                  <Input
                    type="number"
                    placeholder="Age"
                    value={guest.age}
                    onChange={(e) => updateAdditionalGuest(index, 'age', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            onClick={addAdditionalGuest}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            + Add Another Guest
          </button>
        </CardContent>
      </Card>

      {/* Special Requests & Preferences */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Star className="w-5 h-5 mr-2 text-blue-600" />
            Special Requests & Preferences
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Special Requests */}
          <div>
            <Label htmlFor="specialRequests" className="text-sm font-medium text-gray-700">
              Special Requests
            </Label>
            <Textarea
              id="specialRequests"
              placeholder="Any special requests or notes for the hotel (e.g., room preferences, celebration, etc.)"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Dietary Restrictions */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Dietary Restrictions
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dietary-${option}`}
                    checked={formData.dietaryRestrictions.includes(option)}
                    onCheckedChange={(checked) => 
                      handleArrayChange('dietaryRestrictions', option, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`dietary-${option}`} 
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility Needs */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Accessibility Needs
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {accessibilityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`accessibility-${option}`}
                    checked={formData.accessibility.includes(option)}
                    onCheckedChange={(checked) => 
                      handleArrayChange('accessibility', option, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`accessibility-${option}`} 
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Preferences */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Communication Preferences
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, newsletter: checked as boolean })
                }
              />
              <div className="flex-1">
                <Label htmlFor="newsletter" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Subscribe to newsletter
                </Label>
                <p className="text-xs text-gray-500">
                  Receive travel tips, exclusive deals, and destination guides
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="smsUpdates"
                checked={formData.smsUpdates}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, smsUpdates: checked as boolean })
                }
              />
              <div className="flex-1">
                <Label htmlFor="smsUpdates" className="text-sm font-medium text-gray-700 cursor-pointer">
                  SMS booking updates
                </Label>
                <p className="text-xs text-gray-500">
                  Get text messages about your booking status and check-in details
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="loyaltyProgram"
                checked={formData.loyaltyProgram}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, loyaltyProgram: checked as boolean })
                }
              />
              <div className="flex-1">
                <Label htmlFor="loyaltyProgram" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Join StayFinder Rewards
                  <Badge className="ml-2 bg-gold-100 text-gold-800">Free</Badge>
                </Label>
                <p className="text-xs text-gray-500">
                  Earn points on every booking and unlock exclusive member benefits
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormGuestInfo;