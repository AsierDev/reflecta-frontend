import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Interfaces
interface User {
  id: string;
  email: string;
  name: string | null;
}

interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

interface ProfileResponse {
  success: boolean;
  data: User;
}

// Function to login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
      email,
      password
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Error logging in');
    }
    throw new Error('Error connecting to server');
  }
};

// Function to register user
export const registerUser = async (email: string, name: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
      email,
      name,
      password
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Error registering user');
    }
    throw new Error('Error connecting to server');
  }
};

// Function to get user profile
export const getUserProfile = async (token: string) => {
  try {
    const response = await axios.get<ProfileResponse>(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Error getting profile');
    }
    throw new Error('Error connecting to server');
  }
}; 