import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import Fonts from '../../constants/Fonts';
import Avatar from '../../components/Avatar';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import TextButton from '../../components/TextButton';
import {LogoutDispatch} from '../../features/user';
import {
  ChannelList,
  useChannelContext,
  useChannelsContext,
} from 'stream-chat-react-native';
import {ChannelSort} from 'stream-chat';
import ChannelPreview from '../../components/ChannelPreview';
import AddFriends from '../../components/AddFriends';

const Home = () => {
  const {user} = useAppSelector(state => state.user);

  const filters = {members: {$in: [user?._id]}};
  const options = {limit: 20, messages_limit: 30};

  const sort: ChannelSort = {last_message_at: -1};
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StatusBar
        backgroundColor={Colors.light.background}
        barStyle="dark-content"
      />

      <SafeAreaView
        style={{
          paddingHorizontal: Sizes.Medium,
          backgroundColor: Colors.light.background,
          height: Sizes.height,
          width: Sizes.width,
        }}>
        {showModal && (
          <AddFriends showModal={showModal} setShowModal={setShowModal} />
        )}
        {/* <TextButton label='Logout'  onPress={()=> dispatch(LogoutDispatch())} /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: Sizes.Small,
          }}>
          <Text
            style={{
              fontFamily: Fonts.Bold,
              fontSize: Sizes.Xlarge,
              color: Colors.light.primary,
            }}>
            HushTalk
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 15,
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <Ionicons
                name="call-outline"
                size={26}
                color={Colors.light.primary}
              />
            </TouchableOpacity>
            {user?.avatar && <Avatar imageUrl={user?.avatar} />}
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            backgroundColor: Colors.light.input,
            paddingVertical: 10,
            paddingHorizontal: 15,
            height: 46,
            borderRadius: Sizes.Small,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <AntDesign
            name="search1"
            size={Sizes.Medium}
            color={Colors.light.icon}
          />
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: Sizes.Small,
              color: Colors.light.icon,
            }}>
            Search
          </Text>
        </View>

        <ChannelList
          options={options}
          LoadingIndicator={() => (
            <View style={{
              height: Sizes.height * 0.7,
              justifyContent: "center",
              alignItems: 'center'
            }}>
              <ActivityIndicator color={Colors.light.primary} />
            </View>
          )}
          Preview={ChannelPreview}
          filters={filters}
          sort={sort}
        />
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            position: 'absolute',
            bottom: 100,
            right: 20,
            backgroundColor: Colors.light.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="chat-plus"
            size={26}
            color={Colors.light.background}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Home;
