"use client";

import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}
