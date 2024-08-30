import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {Pressable, Text, View} from 'react-native';
import {
  ChannelPreviewMessengerProps,
  useTheme,
  ChannelPreviewTitle,
  Check,
  CheckAll,
  LatestMessagePreview,
  useChannelPreviewDisplayName,
  ChannelPreviewMessage,
} from 'stream-chat-react-native';
import ChannelAvatar from './ChannelAvatar';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {
  ChannelDispatch,
  ChannelsToEditingDispatch,
  StreamChannel,
} from '../features/chat';
import {get} from 'lodash';
import HushView from './HushView';
import {flex, sizes} from '../global';
import {colors} from '../theme';
import Muted from '../icons/Muted';
import Pinned from '../icons/Pin';
import {StyleSheet} from 'react-native';
import ChannelVoiceMessagePreview from './ChannelVoiceMessagePreview';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import {Colors} from '../constants/Colors';

const ChannelPreview = ({
  channel,
  latestMessagePreview,
  formatLatestMessageDate,
}: ChannelPreviewMessengerProps) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const {channelsToEditing} = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const displayName = useChannelPreviewDisplayName(channel);

  const {
    theme: {
      channelPreview: {checkAllIcon, checkIcon, date, message},
      colors: {grey},
    },
  } = useTheme();
  const isPinned = false;

  const {status, messageObject} = latestMessagePreview;
  const latestMessageDate = messageObject?.created_at;

  const isVoiceMessage =
    get(latestMessagePreview, ['messageObject', 'attachments', 0, 'type']) ===
    'voice-message';

  const isChannelMuted = channel.muteStatus().muted;

  const toggleChannelSelectionForEditing = (selectedChannel: StreamChannel) => {
    const existsInSelectedChannels =
      channelsToEditing.includes(selectedChannel);
    const channels = existsInSelectedChannels
      ? channelsToEditing.filter(c => c !== selectedChannel)
      : [...channelsToEditing, selectedChannel];

    dispatch(ChannelsToEditingDispatch(channels));
  };

  const isSelectedForEditing = channelsToEditing.includes(channel);

  const handleOnPress = () => {
    // dispatch(ChannelDispatch(channel));
    navigation.navigate('Register');
  };

  const handleOnLongPress = () => toggleChannelSelectionForEditing(channel);

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={handleOnPress}
      // onLongPress={handleOnLongPress}
      >
      <ChannelAvatar
        channel={channel}
        isSelected={isSelectedForEditing}
        size={48}
      />

      <View style={{flex: 1, marginHorizontal: sizes.l}}>
        <Text
          style={{
            fontFamily: Fonts.Medium,
            fontSize: Sizes.Medium,
            color: Colors.light.primary,
          }}>
          {displayName}
        </Text>
        <View style={{flexDirection: 'row', marginTop: sizes.xs}}>
          <HushView isEnabled={status === 2}>
            <CheckAll pathFill={grey} {...checkAllIcon} />
          </HushView>
          <HushView isEnabled={status === 1}>
            <Check pathFill={grey} {...checkIcon} />
          </HushView>
          <HushView isEnabled={isVoiceMessage}>
            <ChannelVoiceMessagePreview
              latestMessagePreview={latestMessagePreview}
            />
          </HushView>
            <ChannelPreviewMessage
              latestMessagePreview={latestMessagePreview}
            />
        </View>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <Text style={[styles.date, {color: grey}, date]}>
          <>
            {formatLatestMessageDate && latestMessageDate
              ? formatLatestMessageDate(new Date(latestMessageDate))
              : latestMessagePreview.created_at}
          </>
        </Text>
        <View style={flex.directionRowContentEnd}>
          <HushView isEnabled={isChannelMuted}>
            <View style={{marginRight: 12}}>
              <Muted pathFill={colors.dark.secondaryLight} width={16} />
            </View>
          </HushView>
          <HushView isEnabled={isPinned}>
            <Pinned pathFill={colors.dark.secondaryLight} width={16} />
          </HushView>
        </View>
      </View>
    </Pressable>
  );
};

export default ChannelPreview;

const styles = StyleSheet.create({
  container: {
    ...flex.directionRow1,
    padding: sizes.l,
    backgroundColor: colors.dark.background,
    margin: 0,
  },
  contentContainer: {flex: 1},
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {fontSize: 14, fontWeight: '700'},
  date: {
    fontSize: 12,
    marginLeft: 2,
    textAlign: 'right',
  },
  bold: {fontWeight: '600'},
  message: {
    flexShrink: 1,
    fontSize: 12,
  },
});
