import React, { useState } from 'react';
import Image from 'next/image';
import Layout from '@/components/rootLayout';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import ReactLoading from 'react-loading';
import '@/app/globals.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    setIsLoading(true);
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      toast.success(data.message); // Tampilkan toast sukses

      // Simpan token dan detail pengguna di cookies
      Cookies.set('token', data.token);
      Cookies.set('user', JSON.stringify(data.user));

      // Navigasi ke halaman utama
      router.push('/');
    } else {
      toast.error('Login failed'); // Tampilkan toast error
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <Layout>
        {isLoading ? (
          <div className='flex h-screen w-screen items-center justify-center'>
            <ReactLoading type='spokes' color='#000' />
          </div>
        ) : (
          <div>
            <div className='flex h-screen justify-center bg-gray-100 text-gray-900'>
              <div className='m-0 flex max-w-screen-xl flex-1 justify-center bg-white shadow sm:m-10 sm:rounded-lg'>
                <div className='p-6 sm:p-12 lg:w-1/2 xl:w-5/12'>
                  <div className='mt-12 flex flex-col items-center'>
                    <h1 className='text-2xl font-extrabold xl:text-3xl'>Sign in</h1>
                    <div className='mt-8 w-full flex-1'>
                      <div className='mx-auto max-w-xs'>
                        <input
                          className='w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-4 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none'
                          type='email'
                          value={user.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          placeholder='Email'
                        />
                        <input
                          className='mt-5 w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-4 text-sm font-medium placeholder-gray-500 focus:border-gray-400 focus:bg-white focus:outline-none'
                          type='password'
                          value={user.password}
                          onChange={(e) => setUser({ ...user, password: e.target.value })}
                          placeholder='Password'
                        />
                        <button
                          onClick={login}
                          disabled={isLoading}
                          className='focus:shadow-outline mt-5 flex w-full items-center justify-center rounded-lg bg-indigo-500 py-4 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none'
                        >
                          <svg className='-ml-2 h-6 w-6' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                            <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                            <circle cx='8.5' cy='7' r='4' />
                            <path d='M20 8v6M23 11h-6' />
                          </svg>
                          <span className='ml-3'>Sign in</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='hidden flex-1 bg-indigo-100 text-center lg:flex'>
                  <div
                    className='m-12 w-full bg-contain bg-center bg-no-repeat xl:m-16'
                    style={{ backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default LoginComponent;
