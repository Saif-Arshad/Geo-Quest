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
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function NewEventScreen({ navigation }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [detail, setDetail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View
        className="flex-row items-center px-5"
        style={{ paddingTop: 50, gap: 12 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Create New Event</Text>
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
          {/* Image Picker Dropbox */}
          <View className="px-5 mt-4">
            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.8}
              style={{
                height: 180,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: image ? '#C9A84C' : 'rgba(107, 114, 128, 0.4)',
                borderStyle: image ? 'solid' : 'dashed',
                backgroundColor: '#262626',
                overflow: 'hidden',
              }}
            >
              {image ? (
                <View style={{ flex: 1 }}>
                  <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.85)',
                      borderRadius: 20,
                      padding: 8,
                    }}
                  >
                    <Feather name="edit-2" size={16} color="#C9A84C" />
                  </View>
                </View>
              ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 26,
                      backgroundColor: 'rgba(201, 168, 76, 0.15)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <Feather name="image" size={24} color="#C9A84C" />
                  </View>
                  <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>
                    Tap to add event image
                  </Text>
                  <Text style={{ color: '#6B7280', fontSize: 12, marginTop: 4 }}>
                    JPG, PNG up to 10MB
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className="px-5 mt-6">
            {/* Event Name */}
            <View className="mb-4">
              <Text className="text-accent text-xs font-bold tracking-widest mb-2">
                EVENT NAME
              </Text>
              <View className="bg-secondary rounded-lg px-4 py-3">
                <TextInput
                  className="text-white text-sm"
                  placeholder="e.g., Forest Mystery Quest"
                  placeholderTextColor="#6B7280"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Detail */}
            <View className="mb-4">
              <Text className="text-accent text-xs font-bold tracking-widest mb-2">
                EVENT DETAILS
              </Text>
              <View className="bg-secondary rounded-lg px-4 py-3">
                <TextInput
                  className="text-white text-sm"
                  placeholder="Describe the event, rules, and objectives..."
                  placeholderTextColor="#6B7280"
                  value={detail}
                  onChangeText={setDetail}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={{ minHeight: 90 }}
                />
              </View>
            </View>

            {/* Start & End Date */}
            <View className="flex-row" style={{ gap: 12 }}>
              <View className="flex-1 mb-4">
                <Text className="text-accent text-xs font-bold tracking-widest mb-2">
                  START DATE
                </Text>
                <View className="flex-row items-center bg-secondary rounded-lg px-4 py-3">
                  <Feather name="calendar" size={16} color="#6B7280" />
                  <TextInput
                    className="flex-1 text-white text-sm ml-3"
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="#6B7280"
                    value={startDate}
                    onChangeText={setStartDate}
                  />
                </View>
              </View>

              <View className="flex-1 mb-4">
                <Text className="text-accent text-xs font-bold tracking-widest mb-2">
                  END DATE
                </Text>
                <View className="flex-row items-center bg-secondary rounded-lg px-4 py-3">
                  <Feather name="calendar" size={16} color="#6B7280" />
                  <TextInput
                    className="flex-1 text-white text-sm ml-3"
                    placeholder="DD/MM/YYYY"
                    placeholderTextColor="#6B7280"
                    value={endDate}
                    onChangeText={setEndDate}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Create Button */}
          <View className="px-5 mt-4">
            <TouchableOpacity
              className="bg-accent py-4 rounded-full flex-row items-center justify-center"
              activeOpacity={0.8}
            >
              <Feather name="plus-circle" size={18} color="#000000" style={{ marginRight: 8 }} />
              <Text className="text-primary text-base font-bold">Create Event</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
