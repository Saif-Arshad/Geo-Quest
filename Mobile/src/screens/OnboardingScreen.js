import { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import OnboardingSlide from '../components/OnboardingSlide';
import onboardingData from '../data/onboardingData';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleGetStarted = () => {
    navigation.navigate('Register');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#151D1A" />

      <View className="items-center pt-12 pb-4">
        <Image
          source={require('../../assets/logo.png')}
          className="w-40 h-20"
          resizeMode="contain"
        />
      </View>

      {/* Slider */}
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      {/* Bottom section */}
      <View className="px-8 pb-2">
        {/* Pagination Dots */}
        <View className="flex-row justify-center items-center mb-8">
          {onboardingData.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full mx-1 ${
                index === currentIndex
                  ? 'w-8 bg-secondary'
                  : 'w-2 bg-gray-600'
              }`}
            />
          ))}
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          className="bg-secondary py-4 rounded-full items-center mb-4"
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <TouchableOpacity
          className="items-center mb-4"
          onPress={handleSignIn}
          activeOpacity={0.7}
        >
          <Text className="text-gray-400 text-base font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Accent Bar */}
      <View className="h-1 bg-accent w-full" />
    </View>
  );
}
