import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from './authThunks';

interface AuthState {
  userEmail: string | null;
  isRegistered: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userEmail: null,
  isRegistered: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegistrationState: (state) => {
      state.isRegistered = false;
      state.userEmail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isRegistered = true;
        state.userEmail = action.payload?.email || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Registration failed. Try again.';
      });
  },
});

export const { resetRegistrationState } = authSlice.actions;
export default authSlice.reducer;
