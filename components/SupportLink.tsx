'use client';

import React from 'react';
import { MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';

interface SupportLinkProps {
  type?: 'chat' | 'email' | 'phone' | 'help';
  title?: string;
  description?: string;
  contactInfo?: string;
  href?: string;
  variant?: 'card' | 'button' | 'inline';
  className?: string;
}

export const SupportLink: React.FC<SupportLinkProps> = ({
  type = 'help',
  title,
  description,
  contactInfo,
  href,
  variant = 'card',
  className = ''
}) => {
  const getIcon = () => {
    switch (type) {
      case 'chat':
        return <MessageCircle className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'phone':
        return <Phone className="w-5 h-5" />;
      case 'help':
        return <HelpCircle className="w-5 h-5" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  const getDefaultContent = () => {
    switch (type) {
      case 'chat':
        return {
          title: 'Live Chat Support',
          description: 'Get instant help from our support team',
          contactInfo: 'Available 24/7'
        };
      case 'email':
        return {
          title: 'Email Support',
          description: 'Send us a detailed message',
          contactInfo: 'support@stayfinder.com'
        };
      case 'phone':
        return {
          title: 'Phone Support',
          description: 'Speak directly with our team',
          contactInfo: '+1 (555) 123-4567'
        };
      case 'help':
        return {
          title: 'Help Center',
          description: 'Find answers to common questions',
          contactInfo: 'Browse articles & guides'
        };
      default:
        return {
          title: 'Get Help',
          description: 'We\'re here to help you',
          contactInfo: 'Contact support'
        };
    }
  };

  const content = {
    title: title || getDefaultContent().title,
    description: description || getDefaultContent().description,
    contactInfo: contactInfo || getDefaultContent().contactInfo
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'card':
        return 'block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200';
      case 'button':
        return 'inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors';
      case 'inline':
        return 'inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline transition-colors';
      default:
        return 'block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200';
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault();
      // Default behavior - could open modal or redirect to support page
      window.open('/support', '_blank');
    }
  };

  return (
    <a
      href={href || '#'}
      onClick={handleClick}
      className={`${getVariantStyles()} ${className}`}
    >
      {variant === 'card' ? (
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 text-blue-600">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{content.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{content.description}</p>
            <p className="text-sm font-medium text-blue-600">{content.contactInfo}</p>
          </div>
        </div>
      ) : (
        <>
          {getIcon()}
          <span>{content.title}</span>
        </>
      )}
    </a>
  );
}; 