import {createSlice} from '@reduxjs/toolkit';
import {ChannelPreviewMessengerProps} from 'stream-chat-react-native-core/src/components/ChannelPreview/ChannelPreviewMessenger';
import {AppDispatch} from './store';

export type StreamChannel = ChannelPreviewMessengerProps['channel'];

interface ChatState {
  channel: StreamChannel | null;
  channelsToEditing: StreamChannel[];
}

const initialState: ChatState = {
  channel: null,
  channelsToEditing: [],
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    channel: (state, action) => {
      state.channel = action.payload;
    },
    channelsToEditing: (state, action) => {
      state.channelsToEditing = action.payload;
    },
  },
});

export const ChannelDispatch = (channel: StreamChannel) => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.channel(channel));
  };
};

export const ChannelsToEditingDispatch = (channels: StreamChannel[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(slice.actions.channelsToEditing(channels));
  };
};

export default slice.reducer;
