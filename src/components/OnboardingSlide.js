import { View, Text, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OnboardingSlide({ item }) {
  return (
    <View className="flex-1 items-center" style={{ width }}>
      <View className="w-[95%] rounded-2xl h-[55%] overflow-hidden">
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 px-8 pt-8 items-center">
        <Text className="text-accent text-2xl font-bold text-center mb-4">
          {item.title}
        </Text>
        <Text className="text-gray-400 text-base text-center leading-6">
          {item.description}
        </Text>
      </View>
    </View>
  );
}
