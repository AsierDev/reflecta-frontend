import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, registerUser, getUserProfile } from '../services/authService';

interface User {
  id: string;
  email: string;
  name: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if there's a stored token and load user profile
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getUserProfile(token);
          setUser(userData);
        } catch (error) {
          console.error('Error loading profile:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, [token]);

  // Login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, token } = await loginUser(email, password);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      setError('Invalid credentials');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register user
  const register = async (email: string, name: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, token } = await registerUser(email, name, password);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      setError('Error registering user');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 