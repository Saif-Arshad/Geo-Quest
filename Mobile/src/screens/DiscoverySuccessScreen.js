import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function DiscoverySuccessScreen({ navigation, route }) {
  const cacheName = route?.params?.cacheName || 'Emerald Canopy Hidden Cache';
  const xpEarned = route?.params?.xpEarned || 500;

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-14 pb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Quest Complete</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Gold Circle with Cache Icon */}
        <View
          className="items-center justify-center mb-6"
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: '#C9A84C',
          }}
        >
          <View
            className="items-center justify-center"
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              backgroundColor: '#262626',
            }}
          >
            <MaterialCommunityIcons name="treasure-chest" size={40} color="#C9A84C" />
          </View>
        </View>

        {/* Title */}
        <Text className="text-white text-2xl font-bold mb-2">Cache Discovered!</Text>
        <Text className="text-gray-500 text-sm text-center mb-8">
          You found the "{cacheName}" cache
        </Text>

        {/* Rewards Section */}
        <View className="w-full mb-4">
          <Text className="text-accent text-xs font-bold tracking-widest mb-3">
            REWARDS EARNED
          </Text>
          <View className="bg-secondary rounded-xl px-5 py-4 flex-row items-center">
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: '#C9A84C',
              }}
              className="items-center justify-center mr-3"
            >
              <Text className="text-primary text-xs font-bold">G</Text>
            </View>
            <Text className="text-white text-xl font-bold">+{xpEarned} XP</Text>
          </View>
        </View>

        {/* Upload Photo Evidence */}
        <TouchableOpacity className="flex-row items-center mt-2 mb-8">
          <Feather name="camera" size={18} color="#9CA3AF" />
          <Text className="text-gray-400 text-sm ml-2">Upload Photo Evidence</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <View className="px-6 pb-10">
        <TouchableOpacity
          className="bg-accent py-4 rounded-full items-center"
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text className="text-primary text-lg font-bold">Continue Journey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
