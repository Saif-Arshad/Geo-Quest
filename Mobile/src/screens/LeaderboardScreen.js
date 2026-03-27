import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const MOCK_LEADERBOARD = [
  { id: '1', name: 'Julian North', title: 'Mountain King', experiencePoints: 24580 },
  { id: '2', name: 'Elena Sky', title: 'Star Voyager', experiencePoints: 22140 },
  { id: '3', name: 'Marcus Trail', title: 'Forest Ranger', experiencePoints: 21800 },
  { id: '4', name: 'Sarah Quest', title: 'Pathfinder', experiencePoints: 19450 },
  { id: '5', name: 'Tom Hidden', title: 'Cache Seeker', experiencePoints: 18210 },
  { id: '6', name: 'Lara Legend', title: 'Geocache Master', experiencePoints: 17900 },
  { id: '7', name: 'Ben Tracker', title: 'Trail Scout', experiencePoints: 15300 },
  { id: '8', name: 'Nina Compass', title: 'Wayfinder', experiencePoints: 14800 },
  { id: '9', name: 'Jake Summit', title: 'Peak Explorer', experiencePoints: 14200 },
  { id: '10', name: 'Maya Wild', title: 'Nature Guide', experiencePoints: 13650 },
  { id: '11', name: 'Leo Ridge', title: 'Hill Walker', experiencePoints: 13100 },
  { id: '12', name: 'Ava Stone', title: 'Rock Finder', experiencePoints: 12900 },
];

const CURRENT_USER = {
  id: 'current',
  name: 'You (Alex)',
  title: 'Keep going! Top 10 soon.',
  experiencePoints: 12450,
  rank: 42,
};

function RankBadge({ rank }) {
  const badgeColors = {
    1: '#C9A84C',
    2: '#9CA3AF',
    3: '#B87333',
  };

  if (rank <= 3) {
    return (
      <View
        className="items-center justify-center rounded-full"
        style={{
          width: 28,
          height: 28,
          backgroundColor: badgeColors[rank],
        }}
      >
        <Text className="text-xs font-bold" style={{ color: '#151D1A' }}>
          {rank}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ width: 28 }} className="items-center">
      <Text className="text-gray-500 text-sm font-semibold">{rank}</Text>
    </View>
  );
}

function LeaderboardRow({ rank, name, title, experiencePoints, isCurrentUser }) {
  return (
    <View
      className="flex-row items-center rounded-xl mx-5 mb-2"
      style={{
        paddingHorizontal: 14,
        paddingVertical: 12,
        backgroundColor: isCurrentUser
          ? 'rgba(201, 168, 76, 0.1)'
          : 'rgba(26, 66, 49, 0.3)',
        borderWidth: 1,
        borderColor: isCurrentUser ? '#C9A84C' : 'rgba(55, 65, 81, 0.5)',
      }}
    >
      <RankBadge rank={rank} />

      <View
        className="items-center justify-center rounded-full ml-3"
        style={{
          width: 40,
          height: 40,
          backgroundColor: '#1A4231',
        }}
      >
        <Feather name="user" size={18} color="#C9A84C" />
      </View>

      <View className="flex-1 ml-3">
        <Text className="text-white text-sm font-semibold">{name}</Text>
        <Text className="text-gray-500 text-xs" style={{ marginTop: 2 }}>
          {title}
        </Text>
      </View>

      <View className="items-end">
        <Text className="text-accent text-sm font-bold">
          {experiencePoints.toLocaleString()}
        </Text>
        <View
          className="rounded px-1.5 mt-0.5"
          style={{ backgroundColor: 'rgba(201, 168, 76, 0.15)' }}
        >
          <Text className="text-accent text-xs" style={{ fontSize: 10 }}>
            XP
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function LeaderboardScreen() {
  const renderItem = ({ item, index }) => (
    <LeaderboardRow
      rank={index + 1}
      name={item.name}
      title={item.title}
      experiencePoints={item.experiencePoints}
    />
  );

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#151D1A" />

      {/* Header */}
      <View
        className="flex-row items-center justify-between px-5"
        style={{ paddingTop: 50 }}
      >
        <View style={{ width: 24 }} />
        <Text className="text-white text-lg font-bold">Global Leaderboard</Text>
        <TouchableOpacity>
          <Feather name="info" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View className="h-px bg-gray-800 mx-5 mt-4" />

      <FlatList
        data={MOCK_LEADERBOARD}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Pinned Current User Row */}
      <View className="absolute left-0 right-0" style={{ bottom: 0 }}>
        <LeaderboardRow
          rank={CURRENT_USER.rank}
          name={CURRENT_USER.name}
          title={CURRENT_USER.title}
          experiencePoints={CURRENT_USER.experiencePoints}
          isCurrentUser={true}
        />
      </View>
    </View>
  );
}
