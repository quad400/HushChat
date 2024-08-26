/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
import AuthProvider from './src/providers/AuthProvider';
import {useChatClient} from './src/hooks/useChatClient';
import RootStack from './src/stack/RootStack';
import SplashScreen from 'react-native-splash-screen'

export const chatClient = StreamChat.getInstance('nmaqz86rddhu');

const App = () => {
  const {bottom} = useSafeAreaInsets();
  const [clientReady, setClientReady] = useState<boolean>(false);

  useChatClient();

  useEffect(()=> {
    SplashScreen.hide()
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <OverlayProvider bottomInset={bottom} value={{style: theme}}>
        <ThemeProvider style={theme}>
          <Chat client={chatClient} enableOfflineSupport>
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
      <AuthProvider>
        <App />
      </AuthProvider>
    </SafeAreaProvider>
  );
};
