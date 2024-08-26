import {
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Sizes from '../../constants/Sizes';
import {Colors} from '../../constants/Colors';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../../constants/Fonts';
import {useState} from 'react';
import TextButton from '../../components/TextButton';
import CustomInput from '../../components/CustomInput';
import useImageSelector from '../../hooks/useImageSelector';

const UpdateProfile = () => {
  const navigation = useNavigation<any>();

  const [fullname, setFullname] = useState<string>('');
  const {imageUri, selectImage, uploadStatus} = useImageSelector();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView
        style={{
          width: Sizes.width,
          height: Sizes.height,
          backgroundColor: Colors.light.background,
          paddingHorizontal: Sizes.Medium,
          paddingTop: Sizes.Large,
        }}>
        <View
          style={{
            flex: 4,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesignIcon
              name="arrowleft"
              size={24}
              color={Colors.light.primary}
            />
          </TouchableOpacity>
          <View
            style={{
              marginVertical: Sizes.Xlarge,
            }}>
            <Text
              style={{
                fontSize: Sizes.Xlarge,
                fontFamily: Fonts.Bold,
                color: Colors.light.primary,
                marginBottom: Sizes.Medium,
              }}>
              What's your name?
            </Text>
            <Text
              style={{
                fontSize: Sizes.Small,
                fontFamily: Fonts.Regular,
                color: Colors.light.text,
              }}>
              Enter your name and add a profile picture
            </Text>
          </View>

          {imageUri ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                gap: 10,
              }}>
              <View
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: Sizes.Small,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{
                    uri: imageUri,
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  resizeMode="cover"
                />
                {uploadStatus && (
                  <View
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator color={Colors.light.background} />
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={selectImage}>
                <AntDesignIcon
                  name="edit"
                  size={24}
                  color={Colors.light.primary}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Pressable
              onPress={selectImage}
              style={{
                borderWidth: 1,
                borderColor: Colors.light.primary,
                borderRadius: Sizes.Small,
                height: 80,
                width: 80,
                borderStyle: 'dashed',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIconsIcon
                name="add-photo-alternate"
                size={40}
                color={Colors.light.primary}
              />
            </Pressable>
          )}

          <CustomInput
            placeholder="Full Name"
            onChangeText={setFullname}
            value={fullname}
          />
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <TextButton
            onPress={() => navigation.navigate('UpdateProfile')}
            label="Continue"
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default UpdateProfile;
