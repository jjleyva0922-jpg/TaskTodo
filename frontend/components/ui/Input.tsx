"use client";

import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>(({ label, className = '', ...props }, ref) => {
  return (
    <label className="block">
      {label && <div className="text-sm mb-1 text-slate-700">{label}</div>}
      <input ref={ref} className={`w-full border rounded px-3 py-2 ${className}`} {...props} />
    </label>
  );
});

Input.displayName = 'Input';

export default Input;
