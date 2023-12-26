// Di dalam file store.ts Anda
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import workoutReducer from './workoutSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    workouts: workoutReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

// Tambahkan definisi untuk AppDispatch dan AppThunk
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
