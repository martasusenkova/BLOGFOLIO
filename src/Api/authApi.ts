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

export const authApi = {
  async registerUser(userData: RegisterUserData): Promise<RegisterResponse> {
    const response = await axios.post<RegisterResponse>(
      `${BASE_URL}auth/users/`,
      userData
    );
    return response.data;
  },

  async activateUser(uid?: string, token?: string) {
    if (!uid || !token) throw new Error('UID or token missing');
    const response = await axios.post(`${BASE_URL}auth/users/activation/`, {
      uid,
      token,
    });
    return response.status === 204 ? { success: true } : response.data;
  },

  async signIn(data: SignInData): Promise<SignInResponse> {
    const response = await axios.post<SignInResponse>(
      `${BASE_URL}auth/jwt/create/`,
      data
    );
    return response.data;
  },
};
