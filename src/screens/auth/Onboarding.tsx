import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import {Animated, FlatList, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useRef, useState} from 'react';
import Fonts from '../../constants/Fonts';
import TextButton from '../../components/TextButton';
import { useNavigation } from '@react-navigation/native';

type OnboardingDataType = {
  id: number;
  icon: any;
  title: string;
  detail: string;
};

const data: OnboardingDataType[] = [
  {
    id: 1,
    icon: <Icon name="lock" size={100} color={Colors.light.primary} />,
    title: 'Private & secure',
    detail: "The world's most private messaging app",
  },
  {
    id: 2,
    icon: <Icon name="image" size={100} color={Colors.light.primary} />,
    title: 'Share with comport',
    detail: 'We disabled ability to screenshot',
  },
  {
    id: 3,
    icon: (
      <MaterialIcon
        name="folder-delete"
        size={100}
        color={Colors.light.primary}
      />
    ),
    title: 'Message erased',
    detail: 'You control when messages are deleted',
  },
];

const Dots = ({scrollX}: {scrollX: any}) => {
  const dotPosition = Animated.divide(scrollX, Sizes.width);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      {data.map((item, index) => {
        const dotColor = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: ['lightgray', Colors.light.primary, 'lightgray'],
          extrapolate: 'clamp',
        });
        const dotSize = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [6, 20, 6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`dot-${index}`}
            style={{
              backgroundColor: dotColor,
              borderRadius: 6,
              marginHorizontal: 6,
              width: dotSize,
              height: 6,
            }}
          />
        );
      })}
    </View>
  );
};

const Onboarding = () => {
  const ref = useRef<FlatList<any>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<any>()

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    ref.current?.scrollToOffset({
      offset: activeIndex * Sizes.width,
      animated: true,
    });
  }, [activeIndex]);

  const handlePress = () => {
    if(activeIndex==2){
        navigation.navigate("Register")
    }
    setActiveIndex(activeIndex + 1);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.light.background,
        height: Sizes.height,
        flex: 1,
        width: Sizes.width,
      }}>
      <FlatList
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={data}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event: any) => {
          const contentOffset = event.nativeEvent.contentOffset.x;
          const index = Math.round(contentOffset / Sizes.width);
          setActiveIndex(index);
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => (
          <View
            key={item.id}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: Sizes.width,
            }}>
            {item.icon}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: Sizes.Xlarge,
                  fontFamily: Fonts.Bold,
                  marginBottom: Sizes.xSmall,
                  color: Colors.light.primary,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: Sizes.Small,
                  fontFamily: Fonts.Regular,
                  color: Colors.light.primary,
                }}>
                {item.detail}
              </Text>
            </View>
          </View>
        )}
      />
      <Dots scrollX={scrollX} />
      <View
        style={{
          paddingHorizontal: Sizes.Medium,
          marginBottom: Sizes.Large,
        }}>
        <TextButton label="Start Private Chat" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
