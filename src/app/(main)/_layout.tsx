import { useAuth } from "@/src/providers/AuthProvider";
import { chatClient, useChatClient } from "@/src/hooks/useChatClient";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { Colors, getTheme } from "@/src/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";
import { Chat, OverlayProvider,DeepPartial, Theme } from "stream-chat-expo";
import { useEffect, useState } from "react";

export default function HomeLayout() {
  const { token } = useAuth();

  const { clientIsReady } = useChatClient();
 
  
    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState(getTheme("dark"));
  
    useEffect(() => {
      setTheme(getTheme("dark"));
    }, [colorScheme]);

 if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!clientIsReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.light.background,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <AntDesign name="wechat" size={40} color={Colors.light.primary} />
          <Text
            style={{
              color: Colors.light.tint,
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              padding: 5,
            }}
          >
            Chat
            <Text
              style={{
                color: Colors.light.primary,
              }}
            >
              Me
            </Text>
          </Text>
        </View>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }


  return (
    <OverlayProvider>
      <Chat client={chatClient}>
      <Stack screenOptions={{
        // headerShown: false
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Stack.Screen name="call" />
      </Chat>
    </OverlayProvider>
  );
}
