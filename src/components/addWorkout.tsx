import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '@/lib/workoutSlice';
import { RootState, AppDispatch } from '@/lib/store';
import { setSearch, setLimit, setSkip } from '@/lib/searchSlice';

type WorkoutPlan = {
  nama: string;
  fotoWO: string;
  WaktuLatihan: string;
  Kategori: string;
  funFacts: string;
  energiYangdigunakan: string[];
  alat: string[];
  tutorial: string[];
};

type AddWorkOutProps = {
  setIsModalOpen: (isOpen: boolean) => void;
};

const AddWorkOut: React.FC<AddWorkOutProps> = ({ setIsModalOpen }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { search, limit, skip } = useSelector((state: RootState) => state.search);
  const [workout, setWorkout] = useState<WorkoutPlan>({
    nama: '',
    fotoWO: '',
    WaktuLatihan: '',
    Kategori: '',
    funFacts: '',
    energiYangdigunakan: [],
    alat: [],
    tutorial: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value.split(',') });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data);
      alert(data.message); // Menggunakan pesan dari respons API
      setIsModalOpen(false);
      // Tambahkan baris berikut untuk memperbarui data setelah penambahan berhasil
      dispatch(fetchWorkouts({ search, limit, skip }));
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message); // Menampilkan pesan kesalahan dari API
      }
    }
  };

  return (
    <>
      <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
        {/* <!-- Modal header --> */}
        <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Tambah WorkOut Plan</h3>
          <button
            type='button'
            onClick={() => setIsModalOpen(false)}
            className='end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
          >
            <svg className='h-3 w-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
              <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
            </svg>
            <span className='sr-only'>Close modal</span>
          </button>
        </div>
        {/* <!-- Modal body --> */}
        <div className='p-4 md:p-5'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='nama'>
                Nama:
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                id='nama'
                name='nama'
                type='text'
                onChange={handleChange}
                value={workout.nama}
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='fotoWO'>
                Foto WO:
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                id='fotoWO'
                name='fotoWO'
                type='text'
                onChange={handleChange}
                value={workout.fotoWO}
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='WaktuLatihan'>
                Waktu Latihan:
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                id='WaktuLatihan'
                name='WaktuLatihan'
                type='text'
                onChange={handleChange}
                value={workout.WaktuLatihan}
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='Kategori'>
                Kategori:
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                id='Kategori'
                name='Kategori'
                type='text'
                onChange={handleChange}
                value={workout.Kategori}
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='funFacts'>
                Fun Facts:
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                id='funFacts'
                name='funFacts'
                type='text'
                onChange={handleChange}
                value={workout.funFacts}
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='energiYangdigunakan'>
                Energi Yang Digunakan:
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                id='energiYangdigunakan'
                name='energiYangdigunakan'
                type='text'
                onChange={handleArrayChange}
                value={workout.energiYangdigunakan.join(',')}
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='alat'>
                Alat:
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                id='alat'
                name='alat'
                type='text'
                onChange={handleArrayChange}
                value={workout.alat.join(',')}
              />
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white' htmlFor='tutorial'>
                Tutorial:
              </label>
              <input
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400'
                id='tutorial'
                name='tutorial'
                type='text'
                onChange={handleArrayChange}
                value={workout.tutorial.join(',')}
              />
            </div>
            <button
              type='submit'
              className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddWorkOut;
