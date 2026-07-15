import React from 'react';
import { FieldError } from 'react-hook-form';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError | undefined;
};

const FormInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        <input ref={ref} {...props} className={`w-full border rounded-md px-3 py-2 bg-white dark:bg-slate-900 dark:border-slate-700 ${className}`} />
        {error && <p className="mt-1 text-xs text-red-600">{error.message}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
