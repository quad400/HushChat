import axios from 'axios';
import {baseUrl} from '../constants/Env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../providers/AuthProvider';

export const signIn = async (email: string, password: string) => {
  try {
    const {data} = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });

    console.log(data.data.tokens.access);
    await AsyncStorage.setItem('token', data.data.tokens.access);
    return data.data.tokens.access;
  } catch (error: any) {
    console.log(error?.response?.data);
    throw new Error(error.response?.data?.message);
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    await axios.post(`${baseUrl}/auth/register`, {
      email,
      password,
    });
  } catch (error: any) {
    console.log(error.response.data);
  }
};

export async function fetchProfile({userToken}: {userToken: string | null}) {
  try {
    const {data} = await axios.get(`${baseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(data);
    // setProfile(data);
  } catch (error: any) {
    console.log(error.response.data);
  }
}
