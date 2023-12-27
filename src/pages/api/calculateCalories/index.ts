import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  bmiCategory: string;
  advice: string;
  idealWeight: number;
  meals: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  }[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { age, weight, height, gender, activity, goal, mealsPerDay = 3 } = req.body;

  const bmr = gender === 'male' ? 88.362 + 13.397 * parseFloat(weight) + 4.799 * parseFloat(height) - 5.677 * parseFloat(age) : 447.593 + 9.247 * parseFloat(weight) + 3.098 * parseFloat(height) - 4.33 * parseFloat(age);

  const tdee = bmr * activity;

  const totalCalories = goal === 'deficit' ? tdee - 500 : tdee + 500;

  let carbPercentage, proteinPercentage, fatPercentage;

  // Menyesuaikan persentase berdasarkan tujuan
  if (goal === 'deficit') {
    // cutting
    carbPercentage = 0.4;
    proteinPercentage = 0.4;
    fatPercentage = 0.2;
  } else {
    // bulking
    carbPercentage = 0.5;
    proteinPercentage = 0.3;
    fatPercentage = 0.2;
  }

  // Menghitung jumlah kalori untuk masing-masing nutrisi
  const carbCalories = totalCalories * carbPercentage;
  const proteinCalories = totalCalories * proteinPercentage;
  const fatCalories = totalCalories * fatPercentage;

  // Mengubah kalori menjadi gram
  const carbs = carbCalories / 4;
  const protein = proteinCalories / 4;
  const fat = fatCalories / 9;

  // Menghitung BMI
  const bmi = parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2);

  let bmiCategory, advice;

  if (bmi < 18.5) {
    bmiCategory = 'underweight';
    advice = 'Lakukan bulking';
  } else if (bmi < 25) {
    bmiCategory = 'ideal';
    advice = 'Pertahankan berat badan Anda';
  } else {
    bmiCategory = 'overweight';
    advice = 'Lakukan cutting';
  }

  // Menghitung berat badan ideal (untuk orang dewasa dengan tinggi lebih dari 150 cm)
  const idealWeight = 0.9 * (parseFloat(height) - 152) + 50;

  // Menghitung jumlah kalori, karbohidrat, protein, dan lemak per porsi makan
  // Menghitung jumlah kalori, karbohidrat, protein, dan lemak per porsi makan
  const caloriesPerMeal = totalCalories / mealsPerDay;
  const carbsPerMeal = carbs / mealsPerDay;
  const proteinPerMeal = protein / mealsPerDay;
  const fatPerMeal = fat / mealsPerDay;

  // Membuat array dari hasil perhitungan
  const meals = Array.from({ length: mealsPerDay }, () => ({ calories: caloriesPerMeal, carbs: carbsPerMeal, protein: proteinPerMeal, fat: fatPerMeal }));

  res.status(200).json({
    calories: totalCalories,
    carbs,
    protein,
    fat,
    bmiCategory,
    advice,
    idealWeight,
    meals,
  });
}
