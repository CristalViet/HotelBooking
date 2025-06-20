'use client';

import React from 'react';
import { AlertTriangle, AlertCircle, XCircle, Info } from 'lucide-react';

interface ErrorMessageDisplayProps {
  type?: 'error' | 'warning' | 'info' | 'critical';
  title: string;
  message: string;
  details?: string;
  showIcon?: boolean;
}

export const ErrorMessageDisplay: React.FC<ErrorMessageDisplayProps> = ({
  type = 'error',
  title,
  message,
  details,
  showIcon = true
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <XCircle className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-500" />;
      default:
        return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getContainerStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-900';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  return (
    <div className={`rounded-xl border p-6 ${getContainerStyles()}`}>
      <div className="flex items-start gap-4">
        {showIcon && (
          <div className="flex-shrink-0 mt-1">
            {getIcon()}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm mb-3 leading-relaxed">{message}</p>
          
          {details && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium hover:opacity-80 transition-opacity">
                Technical Details
              </summary>
              <div className="mt-2 p-3 bg-white/50 rounded-lg">
                <pre className="text-xs font-mono whitespace-pre-wrap break-words">
                  {details}
                </pre>
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}; 