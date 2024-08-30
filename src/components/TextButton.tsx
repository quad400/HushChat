import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';
import Sizes from '../constants/Sizes';
import Fonts from '../constants/Fonts';

const TextButton = ({
  label,
  onPress,
  disabled,
  loading,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? 'rgba(0,0,0,0.5)' : Colors.light.primary,
        borderRadius: Sizes.Radius,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {loading ? (
        <ActivityIndicator color={Colors.light.background} />
      ) : (
        <Text
          style={{
            color: 'white',
            fontSize: Sizes.Medium,
            fontFamily: Fonts.Medium,
          }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
