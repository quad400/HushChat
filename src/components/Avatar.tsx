import AntDesign from 'react-native-vector-icons/AntDesign';
import {Image, Pressable, View} from 'react-native';
import {Colors} from '../constants/Colors';

const Avatar = ({imageUrl}: {imageUrl: string | undefined}) => {
  return (
    <Image
      source={{uri: imageUrl}}
      resizeMode="contain"
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
      }}
    />
  );
};

export default Avatar;
