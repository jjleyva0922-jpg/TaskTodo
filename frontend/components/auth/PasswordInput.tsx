"use client";

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: any;
};

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = '', ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    return (
      <div className="mb-4">
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        <div className="relative">
          <input ref={ref} {...props} type={visible ? 'text' : 'password'} className={`w-full border rounded-md px-3 py-2 pr-10 bg-white dark:bg-slate-900 dark:border-slate-700 ${className}`} />
          <button type="button" onClick={() => setVisible((v) => !v)} className="absolute right-2 top-2 text-slate-500">
            {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
