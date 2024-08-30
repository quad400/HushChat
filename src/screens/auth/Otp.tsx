import {Pressable, StatusBar, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OtpInput} from 'react-native-otp-entry';
import Sizes from '../../constants/Sizes';
import {Colors} from '../../constants/Colors';
import {View} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Fonts from '../../constants/Fonts';
import {useState} from 'react';
import TextButton from '../../components/TextButton';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {OtpDispatch} from '../../features/user';
import Message from '../../components/Message';

const Otp = ({route}: any) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [code, setCode] = useState('');
  const dispatch = useAppDispatch();

  const {email} = route.params;

  const {message, loading} = useAppSelector(state => state.user);

  const is_disabled = code === '';

  const activate = () => {
    const body = {
      code,
      email,
    };
    dispatch(OtpDispatch({body, navigation}));
  };

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
        {message && <Message message={message} />}

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
              marginTop: Sizes.Xlarge,
            }}>
            <Text
              style={{
                fontSize: Sizes.Xlarge,
                fontFamily: Fonts.Bold,
                color: Colors.light.primary,
                marginBottom: Sizes.Medium,
              }}>
              Verify Account
            </Text>
            <Text
              style={{
                fontSize: Sizes.Small,
                fontFamily: Fonts.Regular,
                color: Colors.light.text,
              }}>
              Ready to join the real deal of hush chat app
            </Text>
          </View>
          <OtpInput
            numberOfDigits={6}
            focusStickBlinkingDuration={500}
            onTextChange={setCode}
            theme={{
              focusStickStyle: {
                height: 25,
                backgroundColor: Colors.light.primary,
              },
              containerStyle: {
                justifyContent: 'space-between',
                alignSelf: 'center',
                marginTop: 10,
                marginHorizontal: 20,
                marginBottom: 50,
              },
              pinCodeContainerStyle: {
                minHeight: 40,
                height: 50,
                width: 50,
                borderWidth: 1,
                borderRadius: Sizes.Small,
                borderColor: Colors.light.border,
              },
              pinCodeTextStyle: {
                fontSize: Sizes.Medium,
                color: Colors.light.text,
                fontFamily: Fonts.Bold,
              },
            }}
          />

          <Pressable
            onPress={() => navigation.navigate('UpdateProfile')}
            style={{
              marginTop: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.light.primary,
                fontFamily: Fonts.Bold,
                fontSize: Sizes.Medium,
              }}>
              Resend Code
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <TextButton
            onPress={activate}
            label="Confirm"
            disabled={is_disabled}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Otp;
