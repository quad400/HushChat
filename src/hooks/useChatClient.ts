import { useCallback, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { chatApiKey } from "../constants/Env";
import { useAppSelector } from "./useRedux";

export const chatClient = StreamChat.getInstance("nmaqz86rddhu");

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);

  const { user } = useAppSelector(state=> state.user);

  const setupClient = useCallback(async () => {
    if (!user) return;
    console.log("Setting up chat client");
    try {
      await chatClient.connectUser(
        {
          id: user._id,
          name: user.fullName,
          image: user.avatar,
        },
        user.chatToken
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
  }, [user]);

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
