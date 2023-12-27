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
  }, [mealsPerDay]);

  return (
    <>
      <div>
        <div>
          <div>
            <h3>Menghitung Kebutuhan Kalori</h3>
            <input type='number' placeholder='Usia (Tahun)' value={age} onChange={(e) => setAge(e.target.value)} />
            <input type='number' placeholder='Berat Badan (kg)' value={weight} onChange={(e) => setWeight(e.target.value)} />
            <input type='number' placeholder='Tinggi Badan (cm)' value={height} onChange={(e) => setHeight(e.target.value)} />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value=''>Pilih Jenis Kelamin</option>
              <option value='male'>Pria</option>
              <option value='female'>Wanita</option>
            </select>
            <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))}>
              <option value={1.2}>Sedikit atau tidak ada olahraga</option>
              <option value={1.375}>Olahraga ringan (1-3 hari per minggu)</option>
              <option value={1.55}>Olahraga sedang (3-5 hari per minggu)</option>
              <option value={1.725}>Olahraga berat (6-7 hari per minggu)</option>
              <option value={1.9}>Olahraga sangat berat (2x latihan per hari, latihan berat)</option>
            </select>
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value=''>Pilih Tujuan</option>
              <option value='deficit'>Defisit Kalori (Penurunan Berat Badan)</option>
              <option value='surplus'>Surplus Kalori (Peningkatan Berat Badan)</option>
            </select>
            <button onClick={calculateCalories}>Hitung Kalori</button>
          </div>
        </div>

        <div>
          <h1>Hasil Perhitungan</h1>
          <Tabs.Item title='Rangkuman' tabIndex={0}>
            <div>
              <div>
                <h2>
                  Berat Anda Tergolong: <span>{nutrition.bmiCategory}</span>
                </h2>
                <h2>
                  Saran: <span>{nutrition.advice}</span>
                </h2>
                <h2>
                  Berat Badan Ideal Anda: <span>{nutrition.idealWeight?.toFixed(2)} kg</span>
                </h2>
              </div>

              <h1>Energi Yang Di Butuhkan Per Hari</h1>

              <div>
                <div>
                  <h2>Total Energi</h2>
                  <h3>{nutrition.calories?.toFixed(2)}</h3>
                  <p>Energi</p>
                </div>

                <div>
                  <div>
                    <NutritionBox Icon={LuWheat} result={parseFloat(nutrition.carbs?.toFixed(2))} title='Karbohidrat' />
                    <NutritionBox Icon={MdOutlineEggAlt} result={parseFloat(nutrition.protein?.toFixed(2))} title='Protein' />
                    <NutritionBox Icon={GiAlmond} result={parseFloat(nutrition.fat?.toFixed(2))} title='Lemak' />
                  </div>
                </div>
              </div>

              <h1>Konsumsi Gizi Seimbang yang disarankan</h1>
              <select value={mealsPerDay} onChange={(e) => setMealsPerDay(parseInt(e.target.value))}>
                <option value={3}>3 kali sehari</option>
                <option value={4}>4 kali sehari</option>
                <option value={5}>5 kali sehari</option>
                {/* Tambahkan lebih banyak opsi jika diperlukan */}
              </select>
              <div>
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
      </div>
    </>
  );
};

export default Home;
