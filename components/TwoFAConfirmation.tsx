'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Smartphone, 
  Mail, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

interface TwoFAConfirmationProps {
  onVerificationComplete: (verified: boolean) => void;
  isVerified: boolean;
}

const TwoFAConfirmation = ({ onVerificationComplete, isVerified }: TwoFAConfirmationProps) => {
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'email'>('sms');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (codeSent && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [codeSent, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sendVerificationCode = async () => {
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setCodeSent(true);
      setTimeLeft(300);
      setIsLoading(false);
    }, 2000);
  };

  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError('Please enter a 6-digit verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate verification
    setTimeout(() => {
      if (verificationCode === '123456') {
        onVerificationComplete(true);
        setIsLoading(false);
      } else {
        setAttempts(attempts + 1);
        setError('Invalid verification code. Please try again.');
        setVerificationCode('');
        setIsLoading(false);
        
        if (attempts >= 2) {
          setError('Too many failed attempts. Please request a new code.');
          setCodeSent(false);
          setAttempts(0);
        }
      }
    }, 1500);
  };

  const resendCode = () => {
    setCodeSent(false);
    setVerificationCode('');
    setError('');
    setAttempts(0);
    sendVerificationCode();
  };

  if (isVerified) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Verification Complete
          </h3>
          <p className="text-gray-600">
            Your identity has been successfully verified. You can now proceed with your booking.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Two-Factor Authentication
        </CardTitle>
        <p className="text-gray-600">
          For your security, we need to verify your identity before completing the booking.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!codeSent ? (
          <>
            {/* Verification Method Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Choose verification method:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setVerificationMethod('sms')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    verificationMethod === 'sms'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      verificationMethod === 'sms' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Smartphone className={`w-6 h-6 ${
                        verificationMethod === 'sms' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="text-left">
                      <h4 className={`font-semibold ${
                        verificationMethod === 'sms' ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        SMS Verification
                      </h4>
                      <p className={`text-sm ${
                        verificationMethod === 'sms' ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        Send code to +1 (555) ***-4567
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setVerificationMethod('email')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    verificationMethod === 'email'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      verificationMethod === 'email' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Mail className={`w-6 h-6 ${
                        verificationMethod === 'email' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="text-left">
                      <h4 className={`font-semibold ${
                        verificationMethod === 'email' ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        Email Verification
                      </h4>
                      <p className={`text-sm ${
                        verificationMethod === 'email' ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        Send code to j***@example.com
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Send Code Button */}
            <Button
              onClick={sendVerificationCode}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending Code...
                </div>
              ) : (
                `Send Verification Code via ${verificationMethod === 'sms' ? 'SMS' : 'Email'}`
              )}
            </Button>
          </>
        ) : (
          <>
            {/* Code Input */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {verificationMethod === 'sms' ? (
                    <Smartphone className="w-8 h-8 text-blue-600" />
                  ) : (
                    <Mail className="w-8 h-8 text-blue-600" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Enter Verification Code
                </h3>
                <p className="text-gray-600">
                  We've sent a 6-digit code to your {verificationMethod === 'sms' ? 'phone' : 'email'}.
                  Please enter it below.
                </p>
              </div>

              <div className="max-w-xs mx-auto">
                <Input
                  type="text"
                  placeholder="000000"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').substring(0, 6);
                    setVerificationCode(value);
                    setError('');
                  }}
                  className="text-center text-2xl font-mono tracking-widest h-14"
                  maxLength={6}
                />
              </div>

              {error && (
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Timer */}
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    Code expires in {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              {/* Verify Button */}
              <Button
                onClick={verifyCode}
                disabled={isLoading || verificationCode.length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  'Verify Code'
                )}
              </Button>

              {/* Resend Code */}
              <div className="text-center">
                <button
                  onClick={resendCode}
                  disabled={timeLeft > 0}
                  className="text-blue-600 hover:text-blue-700 text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {timeLeft > 0 ? `Resend code in ${formatTime(timeLeft)}` : 'Resend code'}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Security Notice */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Why do we need this?</h4>
              <p className="text-sm text-blue-800">
                Two-factor authentication helps protect your booking and personal information from unauthorized access. 
                This extra security step ensures that only you can complete this transaction.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900 mb-1">Demo Mode</h4>
              <p className="text-sm text-yellow-800">
                For demonstration purposes, use the code <Badge className="mx-1 bg-yellow-200 text-yellow-800">123456</Badge> 
                to complete verification.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TwoFAConfirmation;