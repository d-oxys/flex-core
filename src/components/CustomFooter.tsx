'use client';
import { Footer } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLocationArrow, FaMapMarkerAlt } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';
import TncLogo from '../../public/images/tnc_logo.png';

const CustomFooter = () => {
  return (
    <>
      <Footer container className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
        <div className='mt-10 w-full'>
          <div className='flex w-full flex-col space-y-7 md:flex-row md:space-x-8'>
            <Link href='/' className='relative flex flex-row items-center justify-center sm:justify-start'>
              <Image src={TncLogo} className='max-w-md' width={40} height={40} priority={true} alt='Flowbite Logo' />
              <span className='text-primary-2 self-center whitespace-nowrap text-lg font-semibold sm:text-xl '>FLEXCORE KALORI KALKULATOR</span>
            </Link>

            <div className='flex w-full flex-col space-y-7 md:flex-row md:justify-evenly md:space-y-0'>
              <div className='md:max-w-[200px]'>
                <h2 className='mb-6 flex items-center space-x-3 text-lg font-semibold text-gray-500'>
                  <FaMapMarkerAlt className='mr-2 text-xl' />
                  Lokasi Kami
                </h2>

                <Footer.LinkGroup>
                  <p className='leading-relaxed'>Jl. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi.</p>
                </Footer.LinkGroup>
              </div>

              <div>
                <h2 className='mb-6 flex items-center space-x-3 text-lg font-semibold text-gray-500'>
                  <GoMail className='mr-2 text-xl' />
                  Kontak Kami
                </h2>

                <Footer.LinkGroup col>
                  <p className='text-paragraph'>info@flexcore.com</p>

                  <p className='text-paragraph'>+62818118888</p>
                </Footer.LinkGroup>
              </div>

              <div>
                <h2 className='mb-6 flex items-center space-x-3 text-lg font-semibold text-gray-500'>
                  <FaLocationArrow className='mr-2 text-xl' />
                  Navigasi
                </h2>

                <Footer.LinkGroup col>
                  <li>
                    <Link href='/' className='hover:text-primary-2 duration-500'>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href='/perhitungan' className='hover:text-primary-2 duration-500'>
                      Perhitungan
                    </Link>
                  </li>
                  <li>
                    <Link href='/resep' className='hover:text-primary-2 duration-500'>
                      Resep
                    </Link>
                  </li>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
        </div>
      </Footer>
      <hr className='mt-2 border-gray-200 dark:border-gray-700 sm:mx-auto' />
      <div className='flex items-center justify-center p-4'>
        <span className='block text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
          © 2023{' '}
          <a href='https://www.linkedin.com/in/michsannr/' className='hover:underline'>
            FlexCore™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </>
  );
};

export default CustomFooter;
