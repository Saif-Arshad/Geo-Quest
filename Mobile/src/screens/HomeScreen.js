import { View, Text, TouchableOpacity, Image, ScrollView, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const DUMMY_USER = {
  name: 'Alex Hunter',
  level: 12,
  xp: 650,
  maxXp: 1000,
  goldPoints: 2350,
};

const NEARBY_CACHES = [
  {
    id: '1',
    title: 'Presidio Forest Cluster',
    distance: '0.4 miles away',
    activity: 'High Activity',
    coordinate: { latitude: 37.7989, longitude: -122.4662 },
  },
];

const CACHE_HISTORY = [
  { id: '1', title: 'The Silent Peak Cache', location: 'Boulder, CO', time: '3 days ago', xp: 250 },
  { id: '2', title: 'Old Oak Hollow', location: 'Golden, CO', time: '5 days ago', xp: 180 },
  { id: '3', title: 'Misty Creek Hidden Box', location: 'Lyons, CO', time: '1 week ago', xp: 425 },
  { id: '4', title: 'Bridge Tunnel Secret', location: 'Denver, CO', time: '2 weeks ago', xp: 300 },
];

const INITIAL_REGION = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function HomeScreen({ navigation }) {
  const xpProgress = (DUMMY_USER.xp / DUMMY_USER.maxXp) * 100;
  const xpRemaining = DUMMY_USER.maxXp - DUMMY_USER.xp;

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#151D1A" />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-14 pb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              {/* Avatar */}
              <View className="relative mr-3">
                <View className="w-14 h-14 rounded-full bg-secondary items-center justify-center border-2 border-accent">
                  <Feather name="user" size={24} color="#C9A84C" />
                </View>
                <View className="absolute -bottom-1 -left-1 bg-accent rounded-full px-1.5 py-0.5">
                  <Text className="text-primary text-[9px] font-bold">LV {DUMMY_USER.level}</Text>
                </View>
              </View>
              {/* Name & Points */}
              <View>
                <Text className="text-white text-lg font-bold">{DUMMY_USER.name}</Text>
                <View className="flex-row items-center">
                  <Feather name="star" size={12} color="#C9A84C" />
                  <Text className="text-accent text-xs ml-1">{DUMMY_USER.goldPoints.toLocaleString()} Gold Points</Text>
                </View>
              </View>
            </View>
          
          </View>

          {/* XP Progress */}
          <View className="mt-5">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-400 text-xs font-semibold tracking-wider">EXPERIENCE PROGRESS</Text>
              <Text className="text-white text-xs font-bold">{DUMMY_USER.xp} / {DUMMY_USER.maxXp} XP</Text>
            </View>
            <View className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${xpProgress}%`,
                  backgroundColor: '#2DD4BF',
                }}
              />
            </View>
            <Text className="text-gray-500 text-[10px] mt-1 text-right">
              {xpRemaining} XP until Level {DUMMY_USER.level + 1}
            </Text>
          </View>
        </View>

        {/* Nearby Caches */}
        <View className="px-5 mt-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-white text-xl font-bold">Nearby Caches</Text>
            <View className="bg-secondary rounded-full px-3 py-1.5 flex-row items-center">
              <Text className="text-accent text-xs font-bold">12 Available</Text>
            </View>
          </View>

          {/* Map Card */}
          <View className="rounded-2xl overflow-hidden border border-gray-800">
            <View className="h-44">
              <MapView
                style={{ flex: 1 }}
                initialRegion={INITIAL_REGION}
                customMapStyle={darkMapStyle}
              >
                {NEARBY_CACHES.map((cache) => (
                  <Marker
                    key={cache.id}
                    coordinate={cache.coordinate}
                    title={cache.title}
                  />
                ))}
              </MapView>
            </View>
            {/* Map Overlay Info */}
            <View className="bg-secondary/80 px-4 py-3 flex-row items-center justify-between">
              <View>
                <Text className="text-white text-sm font-semibold">{NEARBY_CACHES[0].title}</Text>
                <Text className="text-gray-400 text-xs mt-0.5">
                  {NEARBY_CACHES[0].distance} · {NEARBY_CACHES[0].activity}
                </Text>
              </View>
              <TouchableOpacity className="w-10 h-10 rounded-full bg-accent items-center justify-center">
                <Feather name="navigation" size={18} color="#151D1A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Cache History */}
        <View className="px-5 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">Recent Finds</Text>
            <Text className="text-gray-500 text-xs">{CACHE_HISTORY.length} this month</Text>
          </View>
          {CACHE_HISTORY.map((cache) => (
            <TouchableOpacity
              key={cache.id}
              className="flex-row items-center py-3"
              style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(55, 65, 81, 0.3)' }}
              onPress={() => navigation.navigate('CacheDetails')}
              activeOpacity={0.7}
            >
              <View className="w-11 h-11 rounded-xl bg-secondary items-center justify-center mr-3">
                <Feather name="box" size={18} color="#C9A84C" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-sm font-semibold">{cache.title}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">
                  {cache.location} · {cache.time}
                </Text>
              </View>
              <View className="bg-secondary rounded-full px-2.5 py-1">
                <Text className="text-accent text-xs font-bold">+{cache.xp}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#181818' }] },
  { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#2c2c2c' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#3c3c3c' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
];
