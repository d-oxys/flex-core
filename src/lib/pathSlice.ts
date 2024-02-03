// Di dalam file pathSlice.ts Anda
import { createSlice } from '@reduxjs/toolkit';

export const pathSlice = createSlice({
  name: 'path',
  initialState: '/',
  reducers: {
    setPath: (state, action) => action.payload,
  },
});

export const { setPath } = pathSlice.actions;

export default pathSlice.reducer;
