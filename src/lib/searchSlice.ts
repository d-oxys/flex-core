import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
  search: string;
  limit: number;
  skip: number;
};

const initialState: SearchState = {
  search: '',
  limit: 20,
  skip: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
  },
});

export const { setSearch, setLimit, setSkip } = searchSlice.actions;

export default searchSlice.reducer;
