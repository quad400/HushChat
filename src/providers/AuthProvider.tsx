import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../constants/Env";

export type User = {
  _id: string;
  email: string;
  fullName: string;
  avatar: string;
};

type AuthContextProps = {
  user: User | null;
  token: string | null;
  chat_token: string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  chat_token: null,
  logout: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [chatToken, setChatToken] = useState<string | null>(null);

  async function getToken() {
    const token = await AsyncStorage.getItem("token");
    setUserToken(token);
    console.log(token);
  }

  console.log(user)
  async function fetchProfile({ userToken }: { userToken: string | null }) {
    try {
      const { data } = await axios.get(`${baseUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUser(data?.data?.user);
      setChatToken(data?.data?.chat_token);
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  const logout = async () => {
    setUser(null);
    setUserToken(null);
    setChatToken(null);
    await AsyncStorage.removeItem("token");
  };

  useEffect(() => {
    getToken();
    if (userToken) {
      fetchProfile({ userToken });
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{ user: user, token: userToken, chat_token: chatToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
