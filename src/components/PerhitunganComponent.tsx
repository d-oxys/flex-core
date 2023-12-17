import { useState } from 'react';

const Home: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [activity, setActivity] = useState<number>(1.2);
  const [goal, setGoal] = useState<string>('');
  const [calories, setCalories] = useState<number>(0);

  const calculateCalories = () => {
    const bmr = gender === 'male' ? 88.362 + 13.397 * parseFloat(weight) + 4.799 * parseFloat(height) - 5.677 * parseFloat(age) : 447.593 + 9.247 * parseFloat(weight) + 3.098 * parseFloat(height) - 4.33 * parseFloat(age);

    const tdee = bmr * activity;

    const adjustedCalories = goal === 'deficit' ? tdee - 500 : tdee + 500;

    setCalories(adjustedCalories);
  };

  return (
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
        {calories > 0 && <p className='col-span-full'>Kebutuhan Kalori Anda: {calories.toFixed(2)} kalori/hari</p>}
      </div>
    </div>
  );
};

export default Home;
