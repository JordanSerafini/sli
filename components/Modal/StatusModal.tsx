import React from 'react';
import Button from '../ui/Button';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  title: string;
  message: string;
}

const StatusModal = ({ isOpen, onClose, type, title, message }: StatusModalProps) => {
  if (!isOpen) return null;

  const bgColor = type === 'success' ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900';
  const iconColor = type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const titleColor = type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="relative w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform transition-all duration-300">
        {/* Icon */}
        <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${bgColor} mb-4`}>
          {type === 'success' ? (
            <svg
              className={`h-6 w-6 ${iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className={`h-6 w-6 ${iconColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>

        {/* Title */}
        <h3 className={`text-lg font-medium text-center ${titleColor} mb-2`}>
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center mb-6">
          {message}
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <Button 
            onClick={onClose}
            className={type === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal; 