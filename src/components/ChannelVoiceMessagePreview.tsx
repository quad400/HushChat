import {useMemo} from 'react';
import {LatestMessagePreview} from 'stream-chat-react-native';
import {parseDurationTextToMs} from '../utils/chat';
import moment from 'moment';
import {StyleSheet, View} from 'react-native';
import {flex, sizes} from '../global';
import {colors} from '../theme';
import Mic from '../icons/Mic';
import {Text} from 'react-native';
import { get } from 'lodash';

const ChannelVoiceMessagePreview = ({
  latestMessagePreview,
}: {
  latestMessagePreview: LatestMessagePreview;
}) => {
  const firstAttchmentAudioLength = get(latestMessagePreview, [
    'messageObject',
    'attachments',
    0,
    'audio_length',
  ]);

  const audioLengthInSeconds = useMemo(
    () => parseDurationTextToMs(firstAttchmentAudioLength),
    [firstAttchmentAudioLength],
  );

  if (audioLengthInSeconds === 0) return null;

  const formattedAudioDuration = moment(audioLengthInSeconds).format('m:ss');

  return (
    <View style={styles.voiceMessagePreview}>
      <Mic
        pathFill={colors.dark.secondaryLight}
        width={sizes.ml}
        height={sizes.ml}
      />
      <Text style={styles.voiceMessagePreviewText}>
        {formattedAudioDuration}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  voiceMessagePreview: {
    ...flex.directionRowItemsCenter,
  },
  voiceMessagePreviewText: {
    marginHorizontal: sizes.s,
    color: colors.dark.secondaryLight,
    fontSize: 14,
  },
});

export default ChannelVoiceMessagePreview