'use client';
import CustomFooter from '@/components/CustomFooter';
import CustomNavbar from '@/components/CustomNavbar';
import React from 'react';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={poppins.className}>
      <CustomNavbar />
      {children}
      <CustomFooter />
    </div>
  );
}
