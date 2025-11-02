import axios from 'axios';

const BASE_URL = 'https://studapi.teachmeskills.by/';

export interface RegisterUserData {
  email: string;
  password: string;
  username?: string;
  course_group: number;
}

export interface RegisterResponse {
  email: string;
  id: number;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  access: string;
  refresh: string;
}

export interface ActivateResponse {
  success: boolean;
}

export interface RefreshResponse {
  access: string;
}

export const authApi = {
  async registerUser(userData: RegisterUserData): Promise<RegisterResponse> {
    const response = await axios.post<RegisterResponse>(
      `${BASE_URL}auth/users/`,
      userData
    );
    return response.data;
  },

  async activateUser(uid?: string, token?: string): Promise<ActivateResponse> {
    if (!uid || !token) throw new Error('UID or token missing');
    await axios.post(`${BASE_URL}auth/users/activation/`, { uid, token });
    return { success: true };
  },

  async signIn(data: SignInData): Promise<SignInResponse> {
    const response = await axios.post<SignInResponse>(
      `${BASE_URL}auth/jwt/create/`,
      data
    );
    return response.data;
  },

  async refreshToken(data: { refresh: string }): Promise<RefreshResponse> {
    const response = await fetch(`${BASE_URL}auth/jwt/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Failed to refresh token');
    const json = await response.json();
    return json as RefreshResponse;
  },
};
