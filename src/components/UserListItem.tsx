import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAuth, User } from "../providers/AuthProvider";
import { useChatContext } from "stream-chat-expo";
import { router } from "expo-router";

const UserListItem = ({ user }: { user: User }) => {
  const { client } = useChatContext();
  const { user: me } = useAuth();

  const onPress = async () => {
    
    console.log(me?._id, user._id)
    if (!me) return;
    const channel = client.channel("messaging", {
      members: [me?._id, user._id],
    });
    // console.log(me._id, user._id);

    console.log(channel.cid)
    await channel.create();
    router.replace(`/(main)/channel/${channel.cid}`);
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 10,
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 14,
          color: "black",
        }}
      >
        {user?.fullName}
      </Text>
    </Pressable>
  );
};

export default UserListItem;
