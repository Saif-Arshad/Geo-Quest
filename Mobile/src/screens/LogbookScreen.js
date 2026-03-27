import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const ACTIVITIES = [
  {
    id: '1',
    title: 'Mystic Hollow Cache',
    date: 'Oct 24, 2023',
    difficulty: 'Intermediate',
    image: require('../../assets/one.jpg'),
  },
  {
    id: '2',
    title: 'Crystal Lake Secret',
    date: 'Oct 21, 2023',
    difficulty: 'Beginner',
    image: require('../../assets/quest2.jpg'),
  },
  {
    id: '3',
    title: 'Golden Gate Lookout',
    date: 'Oct 18, 2023',
    difficulty: 'Advanced',
    image: require('../../assets/one.jpg'),
  },
  {
    id: '4',
    title: 'Foggy Peak Point',
    date: 'Oct 15, 2023',
    difficulty: 'Expert',
    image: require('../../assets/quest2.jpg'),
  },
];

const DIFFICULTY_COLORS = {
  Beginner: '#4ADE80',
  Intermediate: '#C9A84C',
  Advanced: '#F97316',
  Expert: '#EF4444',
};

export default function LogbookScreen({ navigation }) {
  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View
        className="flex-row items-center justify-between px-5"
        style={{ paddingTop: 50 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">My Logbook</Text>
        <TouchableOpacity>
          <Feather name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View className="px-5 mt-5 flex-row" style={{ gap: 12 }}>
          {/* Caches Found */}
          <View
            className="flex-1 rounded-2xl overflow-hidden"
            style={{ height: 120 }}
          >
            <ImageBackground
              source={require('../../assets/one.jpg')}
              className="w-full h-full"
              resizeMode="cover"
            >
              <View
                className="flex-1 items-center justify-end pb-3"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <Text className="text-white text-3xl font-bold">42</Text>
                <Text className="text-gray-400 text-xs mt-1 uppercase tracking-wider">
                  Caches Found
                </Text>
              </View>
            </ImageBackground>
          </View>

          {/* Total Points */}
          <View
            className="flex-1 rounded-2xl overflow-hidden"
            style={{ height: 120 }}
          >
            <ImageBackground
              source={require('../../assets/quest2.jpg')}
              className="w-full h-full"
              resizeMode="cover"
            >
              <View
                className="flex-1 items-center justify-end pb-3"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
              >
                <Text className="text-white text-3xl font-bold">12,400</Text>
                <Text className="text-gray-400 text-xs mt-1 uppercase tracking-wider">
                  Total Points
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-5 mt-6">
          <Text className="text-white text-lg font-bold mb-4">
            Recent Activity
          </Text>

          <View style={{ gap: 14 }}>
            {ACTIVITIES.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                className="flex-row items-center"
                style={{ gap: 14 }}
                activeOpacity={0.7}
              >
                <Image
                  source={activity.image}
                  className="rounded-xl"
                  style={{ width: 56, height: 56 }}
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-white text-base font-bold">
                    {activity.title}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {activity.date}
                    {'  '}
                    <Text
                      style={{ color: DIFFICULTY_COLORS[activity.difficulty] }}
                    >
                      • {activity.difficulty}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View
        className="absolute bottom-0 left-0 right-0 flex-row items-end border-t border-gray-700 bg-primary"
        style={{ paddingBottom: 20, paddingTop: 10 }}
      >
        {/* MAP */}
        <TouchableOpacity className="flex-1 items-center" activeOpacity={0.7}>
          <Feather name="map" size={20} color="#6B7280" />
          <Text className="text-xs mt-1 text-gray-500">MAP</Text>
        </TouchableOpacity>

        {/* LOGBOOK (Active) */}
        <TouchableOpacity className="flex-1 items-center" activeOpacity={0.7}>
          <Feather name="book-open" size={20} color="#C9A84C" />
          <Text className="text-xs mt-1 text-accent">LOGBOOK</Text>
        </TouchableOpacity>

        {/* FAB + Button */}
        <View className="flex-1 items-center" style={{ marginTop: -28 }}>
          <TouchableOpacity
            className="bg-secondary items-center justify-center rounded-full"
            style={{ width: 52, height: 52 }}
            activeOpacity={0.8}
          >
            <Feather name="plus" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* QUESTS */}
        <TouchableOpacity className="flex-1 items-center" activeOpacity={0.7}>
          <Feather name="compass" size={20} color="#6B7280" />
          <Text className="text-xs mt-1 text-gray-500">QUESTS</Text>
        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity className="flex-1 items-center" activeOpacity={0.7}>
          <Feather name="user" size={20} color="#6B7280" />
          <Text className="text-xs mt-1 text-gray-500">PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
