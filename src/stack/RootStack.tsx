import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../providers/AuthProvider';
import Login from '../screens/auth/Login';
import Onboarding from '../screens/auth/Onboarding';
import Register from '../screens/auth/Register';
import Otp from '../screens/auth/Otp';
import UpdateProfile from '../screens/auth/UpdateProfile';

const Stack = createStackNavigator();

export enum ROOT_STACK {
  AUTH_STACK = 'AuthStack',
  CHANNEL_LIST = 'ChannelList',
  CHANNEL_SCREEN = 'ChannelScreen',
}

export default () => {
  const {token} = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={token ? ROOT_STACK.CHANNEL_LIST : ROOT_STACK.AUTH_STACK}
      screenOptions={{
        headerTitleStyle: {alignSelf: 'center', fontWeight: 'bold'},
      }}>
      <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{headerShown: false}} />


    </Stack.Navigator>
  );
};
