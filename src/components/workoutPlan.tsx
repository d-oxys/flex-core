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

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchWorkouts({ search, limit, skip })).finally(() => setIsLoading(false));
  }, [debouncedSearchTerm, limit, skip, dispatch]);

  return (
    <Layout>
      <ToastContainer />
      <div className='container m-auto flex min-h-screen flex-col space-y-8 px-4 py-4 capitalize lg:px-12 xl:px-24'>
        <div className='pt-6 text-center'>
          <h1 className='text-base font-bold text-[#3056D3]'>Refrensi Resep Untuk Memenuhi Kebutuhan Kalori</h1>
          <h2 className='mb-3 mt-1 text-2xl font-bold md:text-3xl'>Lorem ipsum dolor sit. </h2>
          <p className='mx-auto text-sm text-[#637381] md:w-3/4 md:text-base xl:w-1/2'> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt adipisci beatae eligendi quidem quisquam.</p>
        </div>
        <div>
          <input type='text' value={search} onChange={(e) => dispatch(setSearch(e.target.value))} placeholder='Search' />
          <input type='number' value={limit} onChange={(e) => dispatch(setLimit(Number(e.target.value)))} placeholder='Limit' />
          <input type='number' value={skip} onChange={(e) => dispatch(setSkip(Number(e.target.value)))} placeholder='Skip' />
          <button
            onClick={() => setIsModalOpen(true)}
            className='block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            type='button'
          >
            Toggle modal
          </button>

          {/* <!-- Main modal --> */}
          {isModalOpen && (
            <div id='authentication-modal' tabIndex={-1} aria-hidden='true' className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50'>
              <div className='relative max-h-[calc(100%-2rem)] w-full max-w-md overflow-auto rounded-md bg-white p-4 shadow-lg'>
                {/* <!-- Modal content --> */}
                <AddWorkOut setIsModalOpen={setIsModalOpen} />
              </div>
            </div>
          )}

          {isLoading ? (
            // Tampilkan komponen loading jika data sedang di-fetch
            <div className='flex h-16 items-center justify-center'>
              <ReactLoading type='spokes' color='#000' />
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
              {/* Tampilkan kartu jika data sudah selesai di-fetch */}
              {workoutPlans.map((workoutPlan, index) => (
                <Link href={`/workout/${workoutPlan.id}`} key={index}>
                  <Card>
                    <Image src={workoutPlan.fotoWO} alt={`Gambar ${workoutPlan.nama}`} width='500' height='300' priority={true} placeholder='blur' blurDataURL={rgbDataURL(237, 181, 6)} className='h-52 object-cover object-center' />
                    <h4 className='text-center font-bold'>{workoutPlan.nama}</h4>
                    <p>Kategori : {workoutPlan.Kategori}</p>
                    <div className='line-clamp-2'>
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
