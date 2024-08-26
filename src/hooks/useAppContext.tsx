// AppContext.js

import React, { createContext, PropsWithChildren, useState } from "react";
import { Channel as ChannelType } from "stream-chat";

type AppContextProps = {
  channel: any;
  setChannel: (channel: any) => void;
  thread: any;
  setThread: (thread: any) => void;
};

export const AppContext = createContext<AppContextProps>({
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
