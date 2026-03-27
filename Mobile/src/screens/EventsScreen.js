import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const ALL_EVENTS = [
  { id: '1', title: 'Forest Mystery Quest', date: 'Mar 15 - Mar 22', players: 24, status: 'Live', joined: true },
  { id: '2', title: 'Mountain Peak Challenge', date: 'Mar 20 - Mar 27', players: 18, status: 'Live', joined: true },
  { id: '3', title: 'Urban Cache Sprint', date: 'Mar 25 - Apr 1', players: 32, status: 'Upcoming', joined: false },
  { id: '4', title: 'River Trail Adventure', date: 'Apr 2 - Apr 9', players: 12, status: 'Upcoming', joined: false },
  { id: '5', title: 'Desert Oasis Hunt', date: 'Apr 5 - Apr 12', players: 20, status: 'Live', joined: false },
  { id: '6', title: 'Coastal Treasure Run', date: 'Apr 10 - Apr 17', players: 15, status: 'Upcoming', joined: true },
];

function EventCard({ event, onPress }) {
  return (
    <TouchableOpacity
      className="flex-row items-center rounded-xl px-4 py-3.5 mb-3"
      style={{
        backgroundColor: 'rgba(38, 38, 38, 0.3)',
        borderWidth: 1,
        borderColor: 'rgba(55, 65, 81, 0.5)',
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        className="items-center justify-center rounded-2xl mr-3"
        style={{ width: 48, height: 48, backgroundColor: '#262626' }}
      >
        <Ionicons name="calendar-outline" size={22} color="#C9A84C" />
      </View>
      <View className="flex-1">
        <Text className="text-white text-sm font-semibold">{event.title}</Text>
        <Text className="text-gray-500 text-xs mt-1">
          {event.date} · {event.players} players
        </Text>
      </View>
      <View className="items-end" style={{ gap: 6 }}>
        <View
          className="rounded-full px-2.5 py-1"
          style={{
            backgroundColor:
              event.status === 'Live'
                ? 'rgba(45, 212, 191, 0.15)'
                : 'rgba(201, 168, 76, 0.15)',
          }}
        >
          <Text
            className="text-xs font-bold"
            style={{
              color: event.status === 'Live' ? '#2DD4BF' : '#C9A84C',
            }}
          >
            {event.status}
          </Text>
        </View>
        {event.joined && (
          <View className="flex-row items-center" style={{ gap: 3 }}>
            <Ionicons name="checkmark-circle" size={12} color="#2DD4BF" />
            <Text style={{ color: '#2DD4BF', fontSize: 10, fontWeight: '600' }}>
              Joined
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function EventsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = ALL_EVENTS.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    if (filter === 'joined') return matchSearch && e.joined;
    if (filter === 'not_joined') return matchSearch && !e.joined;
    return matchSearch;
  });

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View
        className="flex-row items-center px-5"
        style={{ paddingTop: 50, gap: 12 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold flex-1">Events</Text>
      </View>

      {/* Search Bar */}
      <View className="px-5 mt-4">
        <View
          className="flex-row items-center rounded-xl px-4"
          style={{
            backgroundColor: '#262626',
            height: 46,
            borderWidth: 1,
            borderColor: 'rgba(55, 65, 81, 0.5)',
          }}
        >
          <Feather name="search" size={18} color="#6B7280" />
          <TextInput
            className="flex-1 text-white text-sm ml-3"
            placeholder="Search events..."
            placeholderTextColor="#6B7280"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Feather name="x" size={16} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Toggle */}
      <View
        className="flex-row mx-5 mt-4 rounded-xl overflow-hidden"
        style={{
          backgroundColor: '#262626',
          borderWidth: 1,
          borderColor: 'rgba(55, 65, 81, 0.5)',
        }}
      >
        {[
          { key: 'all', label: 'All' },
          { key: 'joined', label: 'Joined' },
          { key: 'not_joined', label: 'Not Joined' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            className="flex-1 items-center py-2.5"
            style={{
              backgroundColor:
                filter === tab.key ? '#C9A84C' : 'transparent',
              borderRadius: filter === tab.key ? 10 : 0,
            }}
            onPress={() => setFilter(tab.key)}
          >
            <Text
              className="text-xs font-bold"
              style={{
                color: filter === tab.key ? '#000000' : '#6B7280',
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Events List */}
      <ScrollView
        className="flex-1 px-5 mt-4"
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length > 0 ? (
          filtered.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() =>
                navigation.navigate('EventDetails', {
                  event: { title: event.title },
                })
              }
            />
          ))
        ) : (
          <View className="items-center mt-16">
            <Ionicons name="calendar-outline" size={48} color="#374151" />
            <Text className="text-gray-500 text-sm mt-3">No events found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
