import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import UserInterface from '../interfaces/User';
import api from '../services/api';

interface Credentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: UserInterface;
}

interface ContextShape {
  user: UserInterface;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<ContextShape>({} as ContextShape);

export const AuthProvider: React.FC = ({children}) => {
  const retrieveUserInfo = useCallback(async () => {
    const token = await AsyncStorage.getItem('@GoBarber-token');
    const user = await AsyncStorage.getItem('@GoBarber-user');

    if (token && user) {
      return {token, user: JSON.parse(user)};
    }

    return {} as AuthState;
  }, []);

  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    await AsyncStorage.setItem('@GoBarber-token', token);
    await AsyncStorage.setItem('@GoBarber-user', JSON.stringify(user));

    setData({token, user});

    return response.data;
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@GoBarber-token');
    await AsyncStorage.removeItem('@GoBarber-user');
    setData({} as AuthState);
  }, []);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber-token',
        '@GoBarber-user',
      ]);

      if (token[1] && user[1]) {
        setData({token: token[1], user: JSON.parse(user[1])});
      }
    }

    loadStorageData();
  }, [retrieveUserInfo]);

  return (
    <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): ContextShape {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
