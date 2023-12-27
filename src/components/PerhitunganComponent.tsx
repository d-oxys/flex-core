import { useState, useEffect } from 'react';
import { Button, Select, Tabs, TextInput } from 'flowbite-react';
import { FormLabel, InterpretationLabelBtn, NutritionBox, PerDayNutritionBox, validationDto } from '@/components/PsgPageComponents';
import { MdOutlineEggAlt } from 'react-icons/md';
import { LuWheat } from 'react-icons/lu';
import { GiAlmond } from 'react-icons/gi';
import { toast } from 'react-toastify';

type Meal = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

type Nutrition = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  bmiCategory?: string;
  advice?: string;
  idealWeight?: number;
  meals: Meal[];
};

const Home: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [activity, setActivity] = useState<number>(1.2);
  const [goal, setGoal] = useState<string>('');
  const [mealsPerDay, setMealsPerDay] = useState<number>(3);
  const [nutrition, setNutrition] = useState<Nutrition>({ calories: 0, carbs: 0, protein: 0, fat: 0, meals: [] });

  const calculateCalories = async () => {
    const response = await fetch('/api/calculateCalories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age,
        weight,
        height,
        gender,
        activity,
        goal,
        mealsPerDay,
      }),
    });

    const data = await response.json();

    setNutrition(data);
  };

  useEffect(() => {
    calculateCalories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mealsPerDay]);

  return (
    <>
      <div className='container mx-auto px-6 py-7 md:px-14 lg:px-24 xl:px-28'>
        <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2'>
          <h3 className='col-span-full mb-4 text-lg font-bold'>Menghitung Kebutuhan Kalori</h3>
          <input className='mb-4 w-full rounded-md border p-2' type='number' placeholder='Usia (Tahun)' value={age} onChange={(e) => setAge(e.target.value)} />
          <input className='mb-4 w-full rounded-md border p-2' type='number' placeholder='Berat Badan (kg)' value={weight} onChange={(e) => setWeight(e.target.value)} />
          <input className='mb-4 w-full rounded-md border p-2' type='number' placeholder='Tinggi Badan (cm)' value={height} onChange={(e) => setHeight(e.target.value)} />
          <select className='mb-4 w-full rounded-md border p-2' value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value=''>Pilih Jenis Kelamin</option>
            <option value='male'>Pria</option>
            <option value='female'>Wanita</option>
          </select>
          <select className='mb-4 w-full rounded-md border p-2' value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))}>
            <option value={1.2}>Sedikit atau tidak ada olahraga</option>
            <option value={1.375}>Olahraga ringan (1-3 hari per minggu)</option>
            <option value={1.55}>Olahraga sedang (3-5 hari per minggu)</option>
            <option value={1.725}>Olahraga berat (6-7 hari per minggu)</option>
            <option value={1.9}>Olahraga sangat berat (2x latihan per hari, latihan berat)</option>
          </select>
          <select className='mb-4 w-full rounded-md border p-2' value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value=''>Pilih Tujuan</option>
            <option value='deficit'>Defisit Kalori (Penurunan Berat Badan)</option>
            <option value='surplus'>Surplus Kalori (Peningkatan Berat Badan)</option>
          </select>
          <button className='col-span-full mb-4 w-full rounded-md bg-blue-500 p-2 text-white' onClick={calculateCalories}>
            Hitung Kalori
          </button>
        </div>
      </div>

      <div className='flex flex-col space-y-4'>
        <h1 className='text-center text-2xl font-bold'>Hasil Perhitungan</h1>
        <Tabs.Item title='Rangkuman' tabIndex={0}>
          <div className='mx-auto space-y-8 rounded-md border border-gray-200 px-5 pb-6 xl:w-10/12'>
            <div className='mx-auto grid gap-x-3 gap-y-2 border-b p-4 lg:grid-cols-3'>
              <h2>
                Berat Anda Tergolong: <span className='font-bold'>{nutrition.bmiCategory}</span>
              </h2>
              <h2>
                Saran: <span className='font-bold'>{nutrition.advice}</span>
              </h2>
              <h2>
                Berat Badan Ideal Anda: <span className='font-bold'>{nutrition.idealWeight?.toFixed(2)} kg</span>
              </h2>
            </div>

            <h1 className='text-center text-lg font-bold lg:text-2xl'>Energi Yang Di Butuhkan Per Hari</h1>

            <div className='flex flex-col items-center justify-center space-y-12 lg:flex-row lg:justify-center lg:space-x-14 xl:space-x-20'>
              <div className='flex h-[150px] w-[150px] flex-col items-center justify-center space-y-2 rounded-full border-8 border-[#32B6C1] lg:h-[180px] lg:w-[180px]'>
                <h2 className='lg:text-lg'>Total Energi</h2>
                <h3 className='text-3xl font-bold'>{nutrition.calories?.toFixed(2)}</h3>
                <p>Energi</p>
              </div>

              <div className='flex flex-row items-center space-x-3 text-center md:space-x-6 xl:space-x-10'>
                <NutritionBox Icon={LuWheat} result={parseFloat(nutrition.carbs?.toFixed(2))} title='Karbohidrat' />

                <NutritionBox Icon={MdOutlineEggAlt} result={parseFloat(nutrition.protein?.toFixed(2))} title='Protein' />

                <NutritionBox Icon={GiAlmond} result={parseFloat(nutrition.fat?.toFixed(2))} title='Lemak' />
              </div>
            </div>

            <h1 className='pt-5 text-center text-xl font-bold lg:text-2xl'>Konsumsi Gizi Seimbang yang disarankan</h1>

            <div className='w-full rounded-md border border-b-0'>
              <select value={mealsPerDay} onChange={(e) => setMealsPerDay(parseInt(e.target.value))}>
                <option value={3}>3 kali sehari</option>
                <option value={4}>4 kali sehari</option>
                <option value={5}>5 kali sehari</option>
                {/* Tambahkan lebih banyak opsi jika diperlukan */}
              </select>
              <div>
                {nutrition.meals.map((meal, index) => (
                  <PerDayNutritionBox
                    key={index}
                    time={`Makan ke-${index + 1}`}
                    nutritionNeeds={{
                      energy: meal.calories?.toFixed(2),
                      carbo: meal.carbs?.toFixed(2),
                      fat: meal.fat?.toFixed(2),
                      protein: meal.protein?.toFixed(2),
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Tabs.Item>
      </div>
    </>
  );
};

export default Home;
