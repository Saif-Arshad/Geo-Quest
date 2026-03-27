import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];

export default function CreateCacheScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [clue, setClue] = useState('');
  const [points, setPoints] = useState('150');
  const [difficulty, setDifficulty] = useState('Medium');
  const [showDifficulty, setShowDifficulty] = useState(false);

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#151D1A" />

      {/* Header */}
      <View
        className="flex-row items-center px-5"
        style={{ paddingTop: 50, gap: 12 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Create New Cache</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Search Bar */}
          <View className="px-5 mt-4">
            <View className="flex-row items-center bg-secondary rounded-lg px-4 py-3">
              <Feather name="search" size={18} color="#6B7280" />
              <TextInput
                className="flex-1 text-white text-sm ml-3"
                placeholder="Search for coordinates or address"
                placeholderTextColor="#6B7280"
              />
            </View>
          </View>

          {/* Map Placeholder */}
          <View className="px-5 mt-4">
            <View
              className="rounded-2xl overflow-hidden"
              style={{
                height: 220,
                backgroundColor: '#1A2E25',
              }}
            >
              {/* Map placeholder with gradient-like appearance */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#2D4A3E',
                  opacity: 0.6,
                }}
              />

              {/* Map Controls */}
              <View
                className="absolute right-3"
                style={{ top: 12, gap: 8 }}
              >
                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: '#1A4231',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.7}
                >
                  <Feather name="plus" size={18} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: '#1A4231',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.7}
                >
                  <Feather name="minus" size={18} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    backgroundColor: '#1A4231',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.7}
                >
                  <Feather name="navigation" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Center pin */}
              <View
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  marginLeft: -12,
                  marginTop: -24,
                }}
              >
                <Feather name="map-pin" size={24} color="#C9A84C" />
              </View>
            </View>
          </View>

          {/* Cache Details Section */}
          <View className="px-5 mt-6">
            <Text className="text-white text-xl font-bold mb-4">
              Cache Details
            </Text>

            {/* Cache Title */}
            <View className="mb-4">
              <Text className="text-accent text-xs font-bold tracking-widest mb-2">
                CACHE TITLE
              </Text>
              <View className="bg-secondary rounded-lg px-4 py-3">
                <TextInput
                  className="text-white text-sm"
                  placeholder="e.g., Hidden Oak Hollow"
                  placeholderTextColor="#6B7280"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* Clue / Riddle */}
            <View className="mb-4">
              <Text className="text-accent text-xs font-bold tracking-widest mb-2">
                CLUE / RIDDLE
              </Text>
              <View className="bg-secondary rounded-lg px-4 py-3">
                <TextInput
                  className="text-white text-sm"
                  placeholder="Describe where it's hidden..."
                  placeholderTextColor="#6B7280"
                  value={clue}
                  onChangeText={setClue}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  style={{ minHeight: 70 }}
                />
              </View>
            </View>

            {/* Points Value & Difficulty */}
            <View className="flex-row" style={{ gap: 12 }}>
              {/* Points Value */}
              <View className="flex-1">
                <Text className="text-accent text-xs font-bold tracking-widest mb-2">
                  POINTS VALUE
                </Text>
                <View className="flex-row items-center bg-secondary rounded-lg px-4 py-3">
                  <Feather name="star" size={16} color="#C9A84C" />
                  <TextInput
                    className="flex-1 text-white text-sm ml-2"
                    value={points}
                    onChangeText={setPoints}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Difficulty */}
              <View className="flex-1">
                <Text className="text-accent text-xs font-bold tracking-widest mb-2">
                  DIFFICULTY
                </Text>
                <TouchableOpacity
                  className="flex-row items-center justify-between bg-secondary rounded-lg px-4 py-3"
                  activeOpacity={0.7}
                  onPress={() => setShowDifficulty(!showDifficulty)}
                >
                  <Text className="text-white text-sm">{difficulty}</Text>
                  <Feather name="chevron-down" size={16} color="#6B7280" />
                </TouchableOpacity>
                {showDifficulty && (
                  <View
                    className="bg-secondary rounded-lg mt-1"
                    style={{
                      position: 'absolute',
                      top: 68,
                      left: 0,
                      right: 0,
                      zIndex: 10,
                    }}
                  >
                    {DIFFICULTIES.map((d) => (
                      <TouchableOpacity
                        key={d}
                        className="px-4 py-3"
                        activeOpacity={0.7}
                        onPress={() => {
                          setDifficulty(d);
                          setShowDifficulty(false);
                        }}
                      >
                        <Text
                          className={`text-sm ${
                            d === difficulty ? 'text-accent font-bold' : 'text-white'
                          }`}
                        >
                          {d}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Confirm Button */}
          <View className="px-5 mt-6">
            <TouchableOpacity
              className="bg-secondary py-4 rounded-xl flex-row items-center justify-center"
              activeOpacity={0.8}
            >
              <Feather
                name="check-circle"
                size={20}
                color="#C9A84C"
                style={{ marginRight: 8 }}
              />
              <Text className="text-accent text-base font-bold">
                Confirm Placement
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
