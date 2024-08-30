import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StreamChat} from 'stream-chat';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {colors, theme} from './src/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Chat, OverlayProvider, ThemeProvider} from 'stream-chat-react-native';
import {Provider} from 'react-redux';
import {useChatClient} from './src/hooks/useChatClient';
import RootStack from './src/stack/RootStack';
import SplashScreen from 'react-native-splash-screen';
import {store} from './src/features/store';
import {useAppDispatch} from './src/hooks/useRedux';
import {
  GetUserDispatch,
  TokenDispatch,
  UserDispatch,
} from './src/features/user';

export const chatClient = StreamChat.getInstance('nmaqz86rddhu');

SplashScreen.hide();
const App = () => {
  useChatClient();
  
  const {bottom} = useSafeAreaInsets();
  
  useEffect(() => {
    store.dispatch(TokenDispatch());
    store.dispatch(UserDispatch());
  }, [store.dispatch]);

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <OverlayProvider bottomInset={bottom} value={{style: theme}}>
          <ThemeProvider style={theme}>
            <Chat client={chatClient}>
              <RootStack />
            </Chat>
          </ThemeProvider>
        </OverlayProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  );
};
