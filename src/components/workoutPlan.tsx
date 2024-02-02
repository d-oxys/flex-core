/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Layout from '@/components/rootLayout';
import AddWorkOut from '@/components/addWorkout';
import Link from 'next/link';
import { Button, Card } from 'flowbite-react';
import Image from 'next/image';
import { rgbDataURL } from '@/helpers/rgbDataURL';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '@/lib/workoutSlice';
import { RootState, AppDispatch } from '@/lib/store';
import ReactLoading from 'react-loading';
import useDebounce from '@/lib/useDebounce';
import { db } from '@/lib/firebaseAdmin';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { setSearch, setLimit, setSkip } from '@/lib/searchSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetAllReport: React.FC = () => {
  const workoutPlans = useSelector((state: RootState) => state.workouts);
  const dispatch = useDispatch<AppDispatch>();
  const { search, limit, skip } = useSelector((state: RootState) => state.search);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 500);
  const [kategori, setKategori] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenLimit, setDropdownOpenLimit] = useState(false);

  useEffect(() => {
    const fetchKategori = async () => {
      const workoutCollection = collection(db, 'workouts');
      const workoutSnapshot = await getDocs(workoutCollection);
      let kategoriSet: Set<string> = new Set();
      workoutSnapshot.docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const kategoriDoc = doc.data().Kategori;
        kategoriSet.add(kategoriDoc);
      });
      setKategori(Array.from(kategoriSet));
    };

    fetchKategori();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchWorkouts({ search, limit, skip })).finally(() => setIsLoading(false));
  }, [debouncedSearchTerm, limit, skip, dispatch]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdownLimit = () => {
    setDropdownOpenLimit((prevState) => !prevState);
  };

  return (
    <Layout>
      <ToastContainer />
      <div className='container m-auto flex min-h-screen flex-col space-y-8 px-4 py-4 capitalize lg:px-12 xl:px-24'>
        <div className='pt-6 text-center'>
          <h1 className='text-base font-bold text-[#3056D3]'>Refrensi Latihan Workout</h1>
          <h2 className='mb-3 mt-1 text-2xl font-bold md:text-3xl'>Temukan Kekuatan Anda. </h2>
          <p className='mx-auto text-sm text-[#637381] md:w-3/4 md:text-base xl:w-1/2'>
            {' '}
            Mulailah perjalanan kebugaran Anda dengan kami. Dengan berbagai latihan dan komunitas yang mendukung, kami siap membantu Anda mencapai tujuan kebugaran Anda.
          </p>
        </div>

        <div>
          <div className='grid grid-cols-2 justify-center gap-3 md:flex md:flex-row md:justify-between md:gap-0'>
            <div className='md:flex md:flex-row md:space-x-4'>
              <div className='md:relative'>
                <button
                  onClick={toggleDropdown}
                  id='dropdownDefaultButton'
                  data-dropdown-toggle='dropdown'
                  className='inline-flex h-10 w-36 items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:h-12 md:w-40 md:text-sm'
                  type='button'
                >
                  Pilih Kategori
                  <svg className='ms-3 h-2.5 w-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
                  </svg>
                </button>
                <div id='dropdown' className={`absolute left-0 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700 ${dropdownOpen ? '' : 'hidden'}`}>
                  <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefaultButton'>
                    <li>
                      <a
                        onClick={() => {
                          dispatch(setSearch(''));
                          toggleDropdown();
                        }}
                        href='#'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        semua
                      </a>
                    </li>
                    {kategori.map((kat, index) => (
                      <li key={index}>
                        <a
                          onClick={() => {
                            dispatch(setSearch(kat));
                            toggleDropdown();
                          }}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          {kat}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='relative hidden md:relative md:flex'>
                <button
                  onClick={toggleDropdownLimit}
                  id='dropdownDefaultButton'
                  data-dropdown-toggle='dropdown'
                  className='inline-flex h-10 w-36 items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:h-12 md:w-40 md:text-sm'
                  type='button'
                >
                  Pilih Limit
                  <svg className='ms-3 h-2.5 w-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
                  </svg>
                </button>
                <div id='dropdown' className={`absolute left-0 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700 md:mt-14 ${dropdownOpenLimit ? '' : 'hidden'}`}>
                  <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefaultButton'>
                    {[5, 10, 20].map((value, index) => (
                      <li key={index}>
                        <a
                          onClick={() => {
                            dispatch(setLimit(value));
                            toggleDropdownLimit();
                          }}
                          href='#'
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          {value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='relative md:hidden'>
              <button
                onClick={toggleDropdownLimit}
                id='dropdownDefaultButton'
                data-dropdown-toggle='dropdown'
                className='inline-flex h-10 w-36 items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:h-12 md:w-40 md:text-sm'
                type='button'
              >
                Pilih Limit
                <svg className='ms-3 h-2.5 w-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
                </svg>
              </button>
              <div id='dropdown' className={`absolute left-0 mt-2 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700 ${dropdownOpenLimit ? '' : 'hidden'}`}>
                <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefaultButton'>
                  {[5, 10, 20].map((value, index) => (
                    <li key={index}>
                      <a
                        onClick={() => {
                          dispatch(setLimit(value));
                          toggleDropdownLimit();
                        }}
                        href='#'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        {value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='md:relative'>
              <button
                onClick={() => setIsModalOpen(true)}
                className='inline-flex h-10 w-36 items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:h-12 md:w-40 md:text-sm'
                type='button'
              >
                Tambah Artikel
              </button>
            </div>
          </div>

          {/* <!-- Main modal --> */}
          {isModalOpen && (
            <div id='authentication-modal' tabIndex={-1} aria-hidden='true' className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50'>
              <div className='relative max-h-[calc(100%-2rem)] w-full max-w-md overflow-auto rounded-md bg-white p-4 shadow-lg md:max-w-xl'>
                {/* <!-- Modal content --> */}
                <AddWorkOut setIsModalOpen={setIsModalOpen} />
              </div>
            </div>
          )}

          {isLoading ? (
            // Tampilkan komponen loading jika data sedang di-fetch
            <div className='flex h-screen items-center justify-center'>
              <ReactLoading type='spokes' color='#000' />
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-5 pt-8 md:grid-cols-2 xl:grid-cols-3'>
              {/* Tampilkan kartu jika data sudah selesai di-fetch */}
              {workoutPlans.map((workoutPlan, index) => (
                <Link href={`/workout/${workoutPlan.id}`} key={index}>
                  <Card className='h-[26rem]'>
                    <Image src={workoutPlan.fileURL} alt={`Gambar ${workoutPlan.nama}`} width='500' height='300' priority={true} placeholder='blur' blurDataURL={rgbDataURL(237, 181, 6)} className='h-52 object-cover object-center' />
                    <h4 className='text-center font-bold'>{workoutPlan.nama}</h4>
                    <p>Kategori : {workoutPlan.Kategori}</p>
                    <div className='my-2 line-clamp-2'>
                      <p>{workoutPlan.funFacts}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GetAllReport;
