import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { SignInResponse, authApi, SignInData } from '../Api/authApi';

interface AuthContextType {
  user: string | null;
  isLoggedIn: boolean;
  userName: string | null;
  signIn: (data: SignInData, callback?: () => void) => Promise<void>;
  signOut: () => void;
  isAuthLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    if (access && refresh) {
      const storedUser = localStorage.getItem('userEmail');
      setUser(storedUser);
    }

    setIsAuthLoaded(true);
  }, []);

  const signIn = async (data: SignInData, callback?: () => void) => {
    try {
      const tokens: SignInResponse = await authApi.signIn(data);
      localStorage.setItem('access', tokens.access);
      localStorage.setItem('refresh', tokens.refresh);
      localStorage.setItem('userEmail', data.email);

      setUser(data.email);
      if (callback) callback();
    } catch (err: any) {
      console.error('Sign In failed:', err.response?.data || err.message);
      alert(err.response?.data?.detail || 'Sign In failed');
    }
  };

  const signOut = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  const isLoggedIn = !!user;
  const userName = user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        userName,
        signIn,
        signOut,
        isAuthLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
