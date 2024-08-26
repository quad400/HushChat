import {View, Text, TextInput} from 'react-native';
import {Colors} from '../constants/Colors';
import {useState} from 'react';

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  disabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  disabled,
  autoCapitalize = 'none',
  autoCorrect = false,
  keyboardType = 'default',
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View
      style={{
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        borderColor: isFocused ? Colors.light.primary : Colors.light.border,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        selectionColor={Colors.light.primary}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        value={value}
        onChangeText={onChangeText}
        cursorColor={Colors.light.primary}
        onFocus={() => setIsFocused(true)} // Set focus state to true
        onBlur={() => setIsFocused(false)}
        style={{
          height: 50,
          width: '100%',
          paddingHorizontal: 10
        }}
      />
    </View>
  );
};

export default CustomInput;
