'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home, ArrowLeft } from 'lucide-react';

interface BackToHomeButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
  fallbackPath?: string;
}

export const BackToHomeButton: React.FC<BackToHomeButtonProps> = ({
  variant = 'outline',
  size = 'md',
  showIcon = true,
  children = 'Back to Home',
  className = '',
  fallbackPath = '/'
}) => {
  const router = useRouter();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white shadow-sm hover:shadow-md';
      case 'outline':
        return 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400';
      default:
        return 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const handleClick = () => {
    try {
      router.push(fallbackPath);
    } catch (error) {
      // Fallback to window.location if router fails
      window.location.href = fallbackPath;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
    >
      {showIcon && (
        <Home className="w-4 h-4" />
      )}
      {children}
    </button>
  );
}; 