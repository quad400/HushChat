import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Sizes from '../constants/Sizes';
import {Colors} from '../constants/Colors';
import Fonts from '../constants/Fonts';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {UsersDispatch} from '../features/user';
import Avatar from './Avatar';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import {User} from '../types';
import {chatClient} from '../../App';

interface AddFriendsProps {
  showModal: boolean;
  setShowModal: (type: boolean) => void;
}

const AddFriends = ({setShowModal, showModal}: AddFriendsProps) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const {users, loading, user} = useAppSelector(state => state.user);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(UsersDispatch());
    }
  }, [dispatch]);

  const onPress = async (friend: User) => {
    if (!user || !friend) return;

    const channel = chatClient.channel('messaging', {
      members: [friend?._id, user._id],
    });

    console.log(channel.cid);
    await channel.create();
    navigation.navigate('Chat', {item: channel});
  };

  const handleRefresh = useCallback(() => {
    dispatch(UsersDispatch());
  }, []);

  return (
    <Modal visible={showModal} transparent={true} animationType="slide">
      <View
        style={{
          height: Sizes.height,
          width: Sizes.width,
          paddingTop: 15,
          backgroundColor: Colors.light.background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: Sizes.Medium,
            gap: 10,
          }}>
          <TouchableOpacity onPress={() => setShowModal(!showModal)}>
            <AntDesign
              name="arrowleft"
              size={26}
              color={Colors.light.primary}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontFamily: Fonts.SemiBold,
                fontSize: 20,
                color: Colors.light.primary,
              }}>
              Select Friends
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Medium,
                fontSize: Sizes.Small,
                color: Colors.light.primary,
              }}>
              {users.length === 1 ? `1 friends` : `$${users.length} friends`}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            marginVertical: 10,
            borderBottomColor: Colors.light.border,
            borderBottomWidth: 1,
          }}
        />
        <FlatList
          data={users}
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
          ListEmptyComponent={() => {
            return (
              loading && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator color={Colors.light.primary} />
                </View>
              )
            );
          }}
          refreshControl={
            <RefreshControl
              colors={[Colors.light.background, Colors.light.primary]}
              progressBackgroundColor={Colors.light.primary}
              refreshing={loading}
              onRefresh={handleRefresh}
            />
          }
          ListHeaderComponent={
            <View
              style={{
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    backgroundColor: Colors.light.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign
                    name="addusergroup"
                    size={Sizes.Large}
                    color={Colors.light.background}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: Fonts.Medium,
                    fontSize: Sizes.Medium,
                    color: Colors.light.primary,
                  }}>
                  New Group
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: Fonts.Medium,
                  marginTop: 15,
                  fontSize: Sizes.Small,
                  color: Colors.light.icon,
                }}>
                Available Friends on Hushtalk
              </Text>
            </View>
          }
          keyExtractor={item => item?._id}
          renderItem={({item, index}) => (
            <Pressable
              key={item._id}
              onPress={() => onPress(item)}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 10,
                marginBottom: 10,
              }}>
              <Avatar imageUrl={item.avatar} />
              <View>
                <Text
                  style={{
                    fontFamily: Fonts.Medium,
                    fontSize: Sizes.Medium,
                    color: Colors.light.primary,
                  }}>
                  {item.fullName}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Regular,
                    fontSize: Sizes.Small,
                    color: Colors.light.icon,
                  }}>
                  Heyyo! welcome to hushtalk
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </Modal>
  );
};

export default AddFriends;
