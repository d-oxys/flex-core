/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
    setIsLoading(false);
  }, []);

  const logout = () => {
    const confirmLogout = window.confirm('Apakah Anda yakin ingin logout?');
    if (confirmLogout) {
      Cookies.remove('token');
      Cookies.remove('user');
      setIsLoggedIn(false);
      window.location.reload();
    }
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Ganti dengan konten placeholder atau spinner loading Anda
  }

  return (
    <>
      <nav className='border-gray-200 bg-white dark:bg-gray-900'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <div className='flex w-1/3 justify-start'>
            <a href='https://flowbite.com/' className='flex items-center'>
              <img src='https://flowbite.com/docs/images/logo.svg' className='mr-3 h-8' alt='Flowbite Logo' />
              <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>Logo</span>
            </a>
          </div>
          <button
            onClick={toggleNavbar}
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg className='h-5 w-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
              <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M1 1h15M1 7h15M1 13h15' />
            </svg>
          </button>
          <div className={`w-full md:block md:w-auto ${isNavbarOpen ? 'block' : 'hidden'} z-10`} id='navbar-default'>
            <ul className='mt-4 flex flex-col justify-center rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900'>
              <li>
                <Link href='/' className='block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500' aria-current='page'>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/perhitungan'
                  className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Perhitungan
                </Link>
              </li>
              <li>
                <Link
                  href='/resep'
                  className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                >
                  Resep
                </Link>
              </li>
              {isLoggedIn ? (
                <li>
                  <Link
                    href='/workout'
                    className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                  >
                    Workout
                  </Link>
                </li>
              ) : (
                <li></li>
              )}
              <li className='block md:hidden'>
                {isLoggedIn ? (
                  <button
                    onClick={logout}
                    className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href='/login'
                    className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div className='hidden w-1/3 justify-end md:flex'>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
              >
                Logout
              </button>
            ) : (
              <Link
                href='/login'
                className='block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
