import {Pressable, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import Sizes from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import TextButton from '../../components/TextButton';
import CustomInput from '../../components/CustomInput';
import {useState} from 'react';

const Login = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [secure, setSecure] = useState<boolean>(true);
  const [isFocused, setisFocused] = useState(false);

  return (
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
          <Icon name="arrowleft" size={24} color={Colors.light.primary} />
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
            Login Account
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

        <CustomInput
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />

        <View
          style={{
            marginTop: 20,
            borderWidth: 1,
            borderRadius: 5,
            height: 50,
            borderColor: isFocused ? Colors.light.primary : Colors.light.border,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            keyboardType="default"
            secureTextEntry={secure}
            selectionColor={Colors.light.primary}
            autoCapitalize="none"
            autoComplete="off"
            cursorColor={Colors.light.primary}
            autoCorrect={false}
            style={{
              color: Colors.light.text,
              marginLeft: 10,
              fontFamily: Fonts.Regular,
              fontSize: Sizes.Small,
              width: '85%',
              height: 58,
            }}
          />
          <Pressable
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setSecure(!secure)}>
            {secure ? (
              <FontAwesome5Icon name="eye-slash" size={18} color="#8F8282" />
            ) : (
              <FontAwesome5Icon name="eye" size={18} color="#8F8282" />
            )}
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: Sizes.Small,
            alignItems: 'center',
            gap: 10
          }}>
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: Sizes.Small,
              color: Colors.light.text,
            }}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                fontFamily: Fonts.SemiBold,
                fontSize: Sizes.Small,
                color: Colors.light.text,
              }}>
              Register
            </Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <TextButton
          label="Continue"
          onPress={() => navigation.navigate('Otp')}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
