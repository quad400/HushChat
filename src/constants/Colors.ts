/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { DeepPartial, Theme } from "stream-chat-react-native";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const primary = "#131313"

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    primary: primary,
    border: "#CFCFCF",
    tint: tintColorLight,
    input: "#8a8888",
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    secondaryBackground: '#282c2e',
    primary: primary,
    input: "#8a8888",
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};



export const getTheme = (colorScheme: 'dark' | 'light'): DeepPartial<Theme> => ({
  colors: colorScheme === 'dark' ? { black: '#FFFFFF' } : { black: '#000000' },
});