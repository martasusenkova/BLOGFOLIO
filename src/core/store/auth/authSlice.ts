import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './authThunks';

interface AuthState {
  userEmail: string;
  loading: boolean;
  error: string | null | undefined;
  isRegistered: boolean;
}
const initialState: AuthState = {
  userEmail: '',
  loading: false,
  error: null,
  isRegistered: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isRegistered = true;
        state.userEmail = action.payload.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Registration failed';
      });
  },
});

export default authSlice.reducer;
