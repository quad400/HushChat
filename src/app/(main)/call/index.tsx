import { View, Text } from "react-native";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { useAuth } from "@/src/providers/AuthProvider";


const Call = () => {

    const {user, chat_token} = useAuth()

    if(!user) return null

    const apiKey = process. env.EXPO_PUBLIC_STREAM_API_KEY;
    const userId = "66a8f126b9e6f08fb4737451";
    const token = chat_token
    const callId = "my-call-id";
    const useR: User = { id: userId };
    
    const client = new StreamVideoClient({ apiKey, user: useR, token });
    const call = client.call("default", callId);
    call.join({ create: true });
  
  
    return (
    <StreamVideo client={client}>
      <StreamCall call={call}>{/* Your UI */}</StreamCall>
    </StreamVideo>
  );
};

export default Call;
