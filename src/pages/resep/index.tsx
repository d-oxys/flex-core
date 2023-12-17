import CustomFooter from '@/components/CustomFooter';
import CustomNavbar from '@/components/CustomNavbar';
import ResepComp from '@/components/resep';
import { Poppins } from 'next/font/google';
import React from 'react';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const Resep = () => {
  return (
    <div className={poppins.className}>
      <CustomNavbar />
      <div className='bg-white'>
        <ResepComp />
      </div>
      <CustomFooter />
    </div>
  );
};

export default Resep;
