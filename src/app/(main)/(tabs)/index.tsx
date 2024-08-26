import { useState } from "react";
import { ChannelList } from "stream-chat-expo";
import { Channel as ChannelType } from "stream-chat";
import { Link, router, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { StatusBar } from "expo-status-bar";

export default function MainTab() {
  const { user } = useAuth();

  if (!user) return;

  const filters = { members: { $in: [user._id] } };
  const options = { limit: 20, messages_limit: 30 };

  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <SafeAreaView
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: Colors.light.background,
        }}
      >
        <View
          style={{
            height: 50,
            borderWidth: 1,
            borderBottomColor: "#cfd2d4",
            paddingHorizontal: 16,
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: Colors.light.text,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Chats
          </Text>
          <Link href="/(main)/users" asChild>
            <FontAwesome5
              name="users"
              size={24}
              color="gray"
            />
          </Link>
        </View>
        <ChannelList
          filters={filters}
          sort={{ last_updated: -1 }}
          options={options}
          onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
        />
      </SafeAreaView>
    </>
  );
}
