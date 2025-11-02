import { authApi, RegisterUserData } from '../authApi';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('authApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('registerUser calls axios.post and returns data', async () => {
    const mockData = { email: 'test@test.com', id: 1 };

    mockedAxios.post.mockResolvedValueOnce({ data: mockData } as any);

    const userData: RegisterUserData = {
      email: 'test@test.com',
      password: '123456',
      course_group: 18,
    };

    const result = await authApi.registerUser(userData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://studapi.teachmeskills.by/auth/users/',
      userData
    );
    expect(result).toEqual(mockData);
  });
});
