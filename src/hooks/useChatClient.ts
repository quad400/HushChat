// useChatClient.js

import { useCallback, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { chatApiKey } from "../constants/Env";
import { useAuth } from "../providers/AuthProvider";

export const chatClient = StreamChat.getInstance("nmaqz86rddhu");

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  const { user, chat_token } = useAuth();

  const setupClient = useCallback(async () => {
    if (!user || !chat_token) return;
    console.log("Setting up chat client");
    try {
      await chatClient.connectUser(
        {
          id: user._id,
          name: user.fullName,
          image: user.avatar,
        },
        chat_token
      );
      setClientIsReady(true);
      console.log("Chat client connected");
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `An error occurred while connecting the user: ${error.message}`
        );
      }
    }
  }, [user, chat_token]);

  useEffect(() => {
    setupClient();

  
    return () => {
      if (chatClient.userID) {
        chatClient.disconnectUser();
      }
    };
  }, [setupClient]);

  return {
    clientIsReady,
  };
};
