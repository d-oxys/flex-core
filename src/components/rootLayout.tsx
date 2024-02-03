'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import CustomFooter from '@/components/CustomFooter';
import CustomNavbar from '@/components/CustomNavbar';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className={poppins.className}>
        <CustomNavbar />
        {children}
        <CustomFooter />
      </div>
    </Provider>
  );
}
