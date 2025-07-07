import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-gray-700">{label}</label>
      )}
      <input
        {...props}
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-main-color outline-none"
      />
    </div>
  );
} 