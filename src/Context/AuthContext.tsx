import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  userName: string | undefined;
  signIn: () => void;
  signOut: () => void;
  goToHome: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const signIn = useCallback(() => {
    setIsLoggedIn(true);
    setUserName('Marta Susenkova');
    console.log('User signed in');
  }, []);

  const signOut = useCallback(() => {
    setIsLoggedIn(false);
    setUserName(undefined);
    console.log('User signed out');
  }, []);

  const goToHome = () => {
    console.log('Navigate to Home');
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userName, signIn, signOut, goToHome }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
