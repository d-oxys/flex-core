// workoutSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Definisikan tipe data untuk WorkoutPlan
type WorkoutPlan = {
  nama: string;
  id: string;
  fotoWO: string;
  WaktuLatihan: string;
  Kategori: string;
  funFacts: string;
  energiYangdigunakan: string[];
  alat: string[];
  tutorial: string[];
  fileURL: string;
};

// Action untuk mengambil data workout
// workoutSlice.ts
export const fetchWorkouts = createAsyncThunk<WorkoutPlan[], { search: string; limit: number; skip: number }>('workouts/fetchWorkouts', async ({ search, limit, skip }) => {
  const response = await fetch(`/api/workout?q=${search}&l=${limit}&s=${skip}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.workoutPlans;
});

// Slice untuk state workout
const workoutSlice = createSlice({
  name: 'workouts',
  initialState: [] as WorkoutPlan[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<WorkoutPlan[]>) => {
      return action.payload;
    });
  },
});

export default workoutSlice.reducer;
