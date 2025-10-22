import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  authApi,
  RegisterUserData,
  RegisterResponse,
} from '../../../Api/authApi';

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterUserData,
  { rejectValue: string }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const data = await authApi.registerUser(userData);
    return data;
  } catch (err) {
    const error = err as { response?: { data?: any }; message?: string };
    return rejectWithValue(
      error.response?.data || error.message || 'Registration failed'
    );
  }
});
