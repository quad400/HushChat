import {createSlice} from '@reduxjs/toolkit';
import {LoginType, RegisterType, User} from '../types';
import {AppDispatch} from './store';
import axios from 'axios';
import {baseUrl} from '../constants/Env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface UserState {
  token: null | string;
  user: null | User;
  loading: boolean;
  error: boolean;
  message: string | null;
  users: Array<User>;
  chat_token: string | null;
}

const initialState: UserState = {
  loading: false,
  token: null,
  user: null,
  error: false,
  message: null,
  users: [],
  chat_token: null,
};

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    message: (state, action) => {
      state.message = action.payload;
    },
    chat_token: (state, action) => {
      state.chat_token = action.payload;
    },
    user: (state, action) => {
      state.user = action.payload;
    },
    token: (state, action) => {
      state.token = action.payload;
    },
    users: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const MessageDispatch = (type: boolean | null) => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.message(type));
  };
};

export const LogoutDispatch = () => {
  return async (dispatch: AppDispatch) => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    dispatch(slice.actions.token(null));
    dispatch(slice.actions.user(null));
  };
};

export const UserDispatch = () => {
  return async (dispatch: AppDispatch) => {
    const user = await AsyncStorage.getItem('user');

    if (!user) return;
    const parsedUser = JSON.parse(user);
    dispatch(slice.actions.user(parsedUser));
  };
};

export const TokenDispatch = () => {
  return async (dispatch: AppDispatch) => {
    const token = await AsyncStorage.getItem('token');
    dispatch(slice.actions.token(token));
  };
};

export const RegisterDispatch = ({
  body,
  navigation,
}: {
  body: RegisterType;
  navigation: NavigationProp<ParamListBase>;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.loading(true));
      await axios.post(`${baseUrl}/auth/register`, body);
      navigation.navigate('Otp', {email: body.email});
    } catch (error: any) {
      dispatch(slice.actions.message(error?.response?.data?.message));
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const LoginDispatch = ({
  body,
  navigation,
}: {
  body: LoginType;
  navigation: NavigationProp<ParamListBase>;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.loading(true));
      const {data} = await axios.post(`${baseUrl}/auth/login`, body);
      console.log('end', data);

      await AsyncStorage.setItem('token', data.data.tokens.access);
      dispatch(slice.actions.token(data.data.tokens.access));
      dispatch(GetUserDispatch());
    } catch (error: any) {
      if (error?.response?.data?.message === 'Account not activated') {
        navigation.navigate('Otp', {email: body.email});
        return;
      }

      dispatch(slice.actions.message(error?.response?.data?.message));
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const OtpDispatch = ({
  body,
}: {
  body: any;
  navigation: NavigationProp<ParamListBase>;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(slice.actions.loading(true));
      const {data} = await axios.post(`${baseUrl}/auth/activate`, body);
      await AsyncStorage.setItem('token', data.data.tokens.access);
      dispatch(slice.actions.token(data.data.tokens.access));
    } catch (error: any) {
      dispatch(slice.actions.message(error?.response?.data?.message));
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const GetUserDispatch = () => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(slice.actions.loading(true));

      const token = await AsyncStorage.getItem('token');

      const {data} = await axios.get(`${baseUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = JSON.stringify(data.data);
      await AsyncStorage.setItem('user', user);

      dispatch(slice.actions.user(data.data));
    } catch (error: any) {
      console.log(error?.message);
      dispatch(slice.actions.message(error?.response?.data?.message));
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export const UsersDispatch = () => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(slice.actions.loading(true));

      const user = getState().user.user as User
      const {data} = await axios.get(`${baseUrl}/auth/users`);

      const users = data.data.filter((item: User)=> item._id !== user._id)
    
      dispatch(slice.actions.users(users));
    } catch (error: any) {
      console.log(error?.message);
      dispatch(slice.actions.message(error?.response?.data?.message));
    } finally {
      dispatch(slice.actions.loading(false));
    }
  };
};

export default slice.reducer;
