import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../constants/Colors';
import Sizes from '../constants/Sizes';
import Fonts from '../constants/Fonts';
import {useAppDispatch} from '../hooks/useRedux';
import {MessageDispatch} from '../features/user';

const Message = ({message}: {message: string}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(MessageDispatch(null));
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  if (message) {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: Sizes.height * 0.3,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: Colors.light.tint,
            borderRadius: Sizes.Radius,
            paddingVertical: 5,
            paddingHorizontal: Sizes.Medium,
          }}>
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: Sizes.Regular,
              color: Colors.light.background,
            }}>
            {message}
          </Text>
        </View>
      </View>
    );
  }
};

export default Message;
