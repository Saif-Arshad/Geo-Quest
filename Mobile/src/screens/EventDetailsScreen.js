import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

function CountdownBox({ value, label }) {
  return (
    <View className="flex-1 items-center">
      <View
        className="w-full bg-secondary rounded-xl items-center justify-center"
        style={{ paddingVertical: 14 }}
      >
        <Text className="text-white text-2xl font-bold">
          {String(value).padStart(2, '0')}
        </Text>
      </View>
      <Text className="text-gray-500 text-xs mt-2 uppercase tracking-wider">
        {label}
      </Text>
    </View>
  );
}

function ProgressBar({ percentage }) {
  return (
    <View
      className="flex-1 bg-gray-700 rounded-full overflow-hidden"
      style={{ height: 6 }}
    >
      <View
        className="h-full rounded-full"
        style={{
          width: `${percentage}%`,
          backgroundColor: '#C9A84C',
        }}
      />
    </View>
  );
}

function LeaderboardItem({ rank, name, xp, caches, isYou, avatar }) {
  const rankColors = {
    1: '#C9A84C',
    2: '#9CA3AF',
    3: '#B87333',
  };

  return (
    <View
      className={`flex-row items-center rounded-xl px-4 py-3 ${
        isYou ? 'border border-accent' : ''
      }`}
      style={{
        backgroundColor: isYou ? 'rgba(201, 168, 76, 0.08)' : 'transparent',
      }}
    >
      {/* Rank */}
      <Text
        className="font-bold text-base"
        style={{
          color: rankColors[rank] || '#6B7280',
          width: 20,
        }}
      >
        {rank}
      </Text>

      {/* Avatar */}
      <View
        className="items-center justify-center rounded-full ml-2"
        style={{
          width: 40,
          height: 40,
          backgroundColor: '#262626',
        }}
      >
        <Feather name="user" size={18} color="#C9A84C" />
      </View>

      {/* Info */}
      <View className="flex-1 ml-3">
        <Text className="text-white text-sm font-semibold">
          {name}
          {isYou ? '' : ''}
        </Text>
        <Text className="text-gray-500 text-xs mt-0.5">
          {xp.toLocaleString()} XP · {caches} caches
        </Text>
      </View>

      {/* Trophy / Badge */}
      {rank === 1 && (
        <View
          className="items-center justify-center rounded-md"
          style={{
            width: 28,
            height: 28,
            backgroundColor: 'rgba(201, 168, 76, 0.2)',
          }}
        >
          <Feather name="award" size={16} color="#C9A84C" />
        </View>
      )}
      {isYou && (
        <View className="bg-secondary rounded-md px-2 py-1">
          <Text className="text-accent text-xs font-bold">ACTIVE</Text>
        </View>
      )}
    </View>
  );
}

const DEFAULT_EVENT = {
  title: 'Forest Mystery Quest',
  code: null,
  totalTime: 10020,
  level: '0/1 LVL',
  geocachesFound: '0/0',
  teams: [
    { name: 'The Trailblazers', progress: 92 },
    { name: 'Mountain Seekers', progress: 75 },
    { name: 'Urban Explorers', progress: 45 },
  ],
  leaderboard: [
    { rank: 1, name: 'Alex Rivers', xp: 1240, caches: 9 },
    { rank: 2, name: 'Sasha K.', xp: 1100, caches: 7 },
    { rank: 3, name: 'Jordan Miles', xp: 980, caches: 6 },
    { rank: 4, name: 'You (Tracker)', xp: 420, caches: 3, isYou: true },
  ],
};

export default function EventDetailsScreen({ navigation, route }) {
  const event = { ...DEFAULT_EVENT, ...(route?.params?.event || {}) };
  const isMyEvent = route?.params?.isMyEvent ?? false;

  const [timeLeft, setTimeLeft] = useState(event.totalTime);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleCodeChange = (text, index) => {
    const newDigits = [...codeDigits];
    newDigits[index] = text.replace(/[^0-9]/g, '');
    setCodeDigits(newDigits);
    if (text && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeSubmit = () => {
    const code = codeDigits.join('');
    if (code.length === 5) {
      setShowCodeModal(false);
      setCodeDigits(['', '', '', '', '']);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

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
        <Text className="text-white text-lg font-bold">{event.title}</Text>
        <TouchableOpacity>
          <Feather name="settings" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Join with Code Button (only for non-owned events) */}
        {!isMyEvent && (
        <View className="px-5 mt-5">
          <TouchableOpacity
            className="bg-secondary py-3.5 rounded-full flex-row items-center justify-center"
            activeOpacity={0.8}
            onPress={() => setShowCodeModal(true)}
          >
            <Feather
              name="plus-circle"
              size={18}
              color="#C9A84C"
              style={{ marginRight: 8 }}
            />
            <Text className="text-accent text-sm font-bold">
              Join with Code
            </Text>
          </TouchableOpacity>
        </View>
        )}

        {/* Time Remaining */}
        <View className="px-5 mt-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-gray-400 text-sm">Time Remaining</Text>
            <View className="bg-secondary rounded-full px-3 py-1">
              <Text className="text-accent text-xs font-bold">
                {event.level}
              </Text>
            </View>
          </View>
          <View className="flex-row" style={{ gap: 10 }}>
            <CountdownBox value={hours} label="Hours" />
            <CountdownBox value={minutes} label="Minutes" />
            <CountdownBox value={seconds} label="Seconds" />
          </View>
        </View>

        {/* Team Progress */}
        <View className="px-5 mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-base font-bold">
              Team Progress
            </Text>
            <Text className="text-gray-500 text-xs">
              {event.geocachesFound} Geocaches Found
            </Text>
          </View>
          <View style={{ gap: 14 }}>
            {event.teams.map((team) => (
              <View key={team.name}>
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-gray-300 text-sm">{team.name}</Text>
                  <Text className="text-gray-500 text-xs">
                    {team.progress}%
                  </Text>
                </View>
                <ProgressBar percentage={team.progress} />
              </View>
            ))}
          </View>
        </View>

        {/* Event Leaderboard */}
        <View className="px-5 mt-6">
          <Text className="text-white text-base font-bold mb-4">
            Event Leaderboard
          </Text>
          <View style={{ gap: 6 }}>
            {event.leaderboard.map((player) => (
              <LeaderboardItem
                key={player.rank}
                rank={player.rank}
                name={player.name}
                xp={player.xp}
                caches={player.caches}
                isYou={player.isYou}
              />
            ))}
          </View>
        </View>

        {/* Create Cache Button (only for my events) */}
        {isMyEvent && (
        <View className="px-5 mt-6">
          <TouchableOpacity
            className="bg-accent py-4 rounded-xl flex-row items-center justify-center"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('CreateCache')}
          >
            <Feather
              name="plus-circle"
              size={20}
              color="#000000"
              style={{ marginRight: 8 }}
            />
            <Text className="text-primary text-base font-bold">
              Create New Cache
            </Text>
          </TouchableOpacity>
        </View>
        )}
      </ScrollView>

      {/* 5-Digit Code Modal */}
      <Modal
        visible={showCodeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCodeModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            className="bg-secondary rounded-2xl mx-6"
            style={{ padding: 28, width: '85%' }}
          >
            <Text className="text-white text-lg font-bold text-center mb-2">
              Enter Event Code
            </Text>
            <Text className="text-gray-400 text-sm text-center mb-6">
              Enter the 5-digit code to join this event
            </Text>

            <View className="flex-row justify-center" style={{ gap: 10 }}>
              {codeDigits.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className="text-white text-xl font-bold text-center rounded-xl"
                  style={{
                    width: 48,
                    height: 56,
                    backgroundColor: '#000000',
                    borderWidth: 1,
                    borderColor: digit ? '#C9A84C' : '#374151',
                  }}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={({ nativeEvent }) => {
                    if (
                      nativeEvent.key === 'Backspace' &&
                      !digit &&
                      index > 0
                    ) {
                      inputRefs.current[index - 1]?.focus();
                    }
                  }}
                />
              ))}
            </View>

            <TouchableOpacity
              className="rounded-full py-3.5 mt-6 items-center"
              style={{
                backgroundColor:
                  codeDigits.join('').length === 5 ? '#C9A84C' : '#374151',
              }}
              onPress={handleCodeSubmit}
              disabled={codeDigits.join('').length !== 5}
              activeOpacity={0.8}
            >
              <Text
                className="font-bold text-sm"
                style={{
                  color:
                    codeDigits.join('').length === 5 ? '#000000' : '#6B7280',
                }}
              >
                Join Event
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-3 items-center py-2"
              onPress={() => {
                setShowCodeModal(false);
                setCodeDigits(['', '', '', '', '']);
              }}
            >
              <Text className="text-gray-400 text-sm">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
