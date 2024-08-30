import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Onboarding from '../screens/auth/Onboarding';
import Register from '../screens/auth/Register';
import Otp from '../screens/auth/Otp';
import UpdateProfile from '../screens/auth/UpdateProfile';
import Home from '../screens/chat/Home';
import {useAppSelector} from '../hooks/useRedux';
import Chat from '../screens/chat/Chat';

const Stack = createStackNavigator();

export enum ROOT_STACK {
  AUTH_STACK = 'AuthStack',
  CHANNEL_LIST = 'ChannelList',
  CHANNEL_SCREEN = 'ChannelScreen',
}

export default () => {
  const {token} = useAppSelector(state => state.user);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
      }}>
      {token ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
