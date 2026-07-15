import React from 'react';

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="min-w-full bg-white border">{children}</table>;
}

export function Thead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-slate-50 text-slate-700">{children}</thead>;
}

export function Tbody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export default Table;
