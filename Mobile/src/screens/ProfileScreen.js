import { View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';

const USER = {
  name: 'TrailBlazer',
  handle: '@TrailBlazer',
  points: 12450,
  finds: 42,
  rank: 12,
};

const MY_EVENTS = [
  {
    id: '1',
    title: 'Forest Mystery Quest',
    date: 'Mar 15 - Mar 22',
    participants: 24,
    status: 'Active',
  },
  {
    id: '2',
    title: 'Mountain Peak Hunt',
    date: 'Mar 10 - Mar 17',
    participants: 18,
    status: 'Completed',
  },
  {
    id: '3',
    title: 'Urban Cache Sprint',
    date: 'Feb 28 - Mar 5',
    participants: 32,
    status: 'Completed',
  },
];

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-primary" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle="light-content" backgroundColor="#151D1A" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <Text className="text-white text-xl font-bold">Profile</Text>
          <TouchableOpacity>
            <Feather name="settings" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View className="items-center mt-4">
          <View
            className="items-center justify-center rounded-full"
            style={{
              width: 90,
              height: 90,
              borderWidth: 2,
              borderColor: '#2DD4BF',
              backgroundColor: '#1A4231',
            }}
          >
            <Feather name="user" size={40} color="#2DD4BF" />
          </View>
          <Text className="text-white text-xl font-bold mt-3">{USER.name}</Text>
          <Text className="text-gray-500 text-sm">{USER.handle}</Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row justify-around mx-5 mt-6 py-4 rounded-xl" style={{ backgroundColor: 'rgba(26, 66, 49, 0.3)', borderWidth: 1, borderColor: 'rgba(55, 65, 81, 0.5)' }}>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{USER.points.toLocaleString()}</Text>
            <Text className="text-gray-500 text-xs mt-0.5">POINTS</Text>
          </View>
          <View style={{ width: 1, backgroundColor: 'rgba(55, 65, 81, 0.5)' }} />
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{USER.finds}</Text>
            <Text className="text-gray-500 text-xs mt-0.5">FINDS</Text>
          </View>
          <View style={{ width: 1, backgroundColor: 'rgba(55, 65, 81, 0.5)' }} />
          <View className="items-center">
            <Text className="text-white text-lg font-bold">{USER.rank}</Text>
            <Text className="text-gray-500 text-xs mt-0.5">RANK</Text>
          </View>
        </View>

        {/* My Events */}
        <View className="px-5 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-lg font-bold">My Events</Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewEvent')}>
              <Text className="text-accent text-sm font-bold">+ New</Text>
            </TouchableOpacity>
          </View>
          {MY_EVENTS.map((event) => (
            <TouchableOpacity
              key={event.id}
              className="flex-row items-center py-3"
              style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(55, 65, 81, 0.3)' }}
              onPress={() => navigation.navigate('EventDetails', { event: { title: event.title }, isMyEvent: true })}
              activeOpacity={0.7}
            >
              <View
                className="items-center justify-center rounded-xl mr-3"
                style={{ width: 48, height: 48, backgroundColor: '#1A4231' }}
              >
                <Ionicons name="calendar-outline" size={22} color="#C9A84C" />
              </View>
              <View className="flex-1">
                <Text className="text-white text-sm font-semibold">{event.title}</Text>
                <Text className="text-gray-500 text-xs mt-0.5">
                  {event.date} · {event.participants} players
                </Text>
              </View>
              <View
                className="rounded-full px-2.5 py-1"
                style={{
                  backgroundColor: event.status === 'Active' ? 'rgba(45, 212, 191, 0.15)' : 'rgba(107, 114, 128, 0.15)',
                }}
              >
                <Text
                  className="text-xs font-bold"
                  style={{ color: event.status === 'Active' ? '#2DD4BF' : '#6B7280' }}
                >
                  {event.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}
