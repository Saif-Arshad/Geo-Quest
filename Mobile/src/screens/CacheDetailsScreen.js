import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const STARS_TOTAL = 5;

function StarRating({ rating }) {
  return (
    <View className="flex-row" style={{ gap: 2 }}>
      {Array.from({ length: STARS_TOTAL }, (_, i) => (
        <Feather
          key={i}
          name="star"
          size={16}
          color={i < rating ? '#C9A84C' : '#374151'}
          style={i < rating ? { fill: '#C9A84C' } : undefined}
        />
      ))}
    </View>
  );
}

export default function CacheDetailsScreen({ navigation, route }) {
  const cache = route?.params?.cache ?? {
    image: require('../../assets/one.jpg'),
    badge: 'EPIC DISCOVERY',
    title: 'The Hidden Grotto',
    xp: 500,
    rating: 4,
    level: 'Expert Level',
    difficulty: '4/5',
    distance: '45m',
    region: 'Blackwood Forest',
    riddle:
      'Where the water whispers and the stones sleep beneath the emerald sky, the treasure awaits those who dare to seek.',
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#151D1A" />

      {/* Header */}
      <View
        className="flex-row items-center justify-between px-5"
        style={{ paddingTop: 50 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Cache Details</Text>
        <TouchableOpacity>
          <Feather name="share-2" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View className="px-5 mt-5">
          <View className="rounded-2xl overflow-hidden" style={{ height: 220 }}>
            <Image
              source={cache.image}
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Badge */}
            <View
              className="absolute bottom-3 left-3 bg-secondary px-3 py-1 rounded-full"
            >
              <Text className="text-accent text-xs font-bold tracking-wider">
                {cache.badge}
              </Text>
            </View>
          </View>
        </View>

        {/* Title & XP */}
        <View className="px-5 mt-5 flex-row items-start justify-between">
          <Text className="text-white text-2xl font-bold" style={{ flex: 1 }}>
            {cache.title}
          </Text>
          <View className="bg-secondary rounded-lg px-3 py-1 ml-3">
            <Text className="text-accent text-base font-bold">{cache.xp}</Text>
            <Text className="text-accent text-xs font-bold">XP</Text>
          </View>
        </View>

        {/* Rating & Difficulty */}
        <View className="px-5 mt-2 flex-row items-center" style={{ gap: 8 }}>
          <StarRating rating={cache.rating} />
          <Text className="text-gray-400 text-sm">
            {cache.level} • {cache.difficulty} Difficulty
          </Text>
        </View>

        {/* Info Cards */}
        <View
          className="px-5 mt-5 flex-row"
          style={{ gap: 12 }}
        >
          {/* Distance Card */}
          <View
            className="flex-1 border border-gray-700 rounded-xl py-4 items-center"
          >
            <Feather name="map-pin" size={20} color="#C9A84C" />
            <Text className="text-white text-xl font-bold mt-2">
              {cache.distance}
            </Text>
            <Text className="text-gray-500 text-xs mt-1 uppercase tracking-wider">
              Element Distance
            </Text>
          </View>

          {/* Region Card */}
          <View
            className="flex-1 border border-gray-700 rounded-xl py-4 items-center"
          >
            <Feather name="map" size={20} color="#C9A84C" />
            <Text className="text-white text-base font-bold mt-2">
              {cache.region}
            </Text>
            <Text className="text-gray-500 text-xs mt-1 uppercase tracking-wider">
              Region
            </Text>
          </View>
        </View>

        {/* The Riddle */}
        <View className="px-5 mt-6">
          <Text className="text-accent text-xs font-bold tracking-widest mb-3">
            THE RIDDLE
          </Text>
          <View className="border border-gray-700 rounded-xl p-4">
            <Text className="text-gray-400 text-sm leading-5">
              {cache.riddle}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Unlock Button */}
      <View
        className="absolute left-0 right-0 px-5"
        style={{ bottom: 30 }}
      >
        <TouchableOpacity
          className="bg-accent py-4 rounded-full flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Feather
            name="lock"
            size={18}
            color="#151D1A"
            style={{ marginRight: 8 }}
          />
          <Text className="text-primary text-base font-bold">
            I'm Here — Unlock Cache
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
