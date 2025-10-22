import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  authApi,
  RegisterUserData,
  RegisterResponse,
  SignInData,
  SignInResponse,
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

export const activateUser = createAsyncThunk<
  { success: boolean },
  { uid?: string; token?: string },
  { rejectValue: string }
>('auth/activateUser', async ({ uid, token }, { rejectWithValue }) => {
  try {
    const data = (await authApi.activateUser(uid, token)) as {
      success: boolean;
    };
    return data;
  } catch (err) {
    const error = err as { response?: { data?: any }; message?: string };
    return rejectWithValue(
      error.response?.data || error.message || 'Activation failed'
    );
  }
});

export const signIn = createAsyncThunk<
  SignInResponse,
  SignInData,
  { rejectValue: string }
>('auth/signIn', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authApi.signIn(credentials);

    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);

    return data;
  } catch (err) {
    const error = err as { response?: { data?: any }; message?: string };
    return rejectWithValue(
      error.response?.data || error.message || 'Login failed'
    );
  }
});
