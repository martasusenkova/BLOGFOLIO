import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  authApi,
  RegisterUserData,
  RegisterResponse,
  SignInData,
  SignInResponse,
  RefreshResponse,
  ActivateResponse,
} from '../../../Api/authApi';
import axiosInstance from '../../../Api/axiosInstance';

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterUserData,
  { rejectValue: string }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    return await authApi.registerUser(userData);
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data || err.message || 'Registration failed'
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
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message || 'Login failed');
  }
});

export const activateUser = createAsyncThunk<
  ActivateResponse,
  { uid?: string; token?: string },
  { rejectValue: string }
>('auth/activateUser', async ({ uid, token }, { rejectWithValue }) => {
  try {
    return await authApi.activateUser(uid, token);
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || 'Activation failed'
    );
  }
});

export const refreshToken = createAsyncThunk<
  RefreshResponse,
  void,
  { rejectValue: string }
>('auth/refreshToken', async (_, { rejectWithValue }) => {
  try {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) throw new Error('No refresh token found');
    const data = await authApi.refreshToken({ refresh });
    localStorage.setItem('access', data.access);
    return data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data || err.message || 'Token refresh failed'
    );
  }
});

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    if (!access || !refresh) return { isLoggedIn: false };

    try {
      await axiosInstance.get('/auth/jwt/verify/', {
        params: { token: access },
      });
      return { isLoggedIn: true };
    } catch {
      try {
        const data = await dispatch(refreshToken() as any).unwrap();
        return { isLoggedIn: !!data.access };
      } catch {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return { isLoggedIn: false };
      }
    }
  }
);
