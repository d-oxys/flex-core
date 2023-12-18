import CustomFooter from '@/components/CustomFooter';
import CustomNavbar from '@/components/CustomNavbar';
import React from 'react';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='font-poppins'>
      <CustomNavbar />
      {children}
      <CustomFooter />
    </div>
  );
}
