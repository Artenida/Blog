// formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  username: string;
  password: string;
}

const initialState: FormState = {
  username: '',
  password: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    resetForm(state) {
      state.username = '';
      state.password = '';
    },
  },
});

export const { setUsername, setPassword, resetForm } = formSlice.actions;

export default formSlice.reducer;
