import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleRegister = () => {
    console.log('Register:', fullName, email, password);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" backgroundColor="#151D1A" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-16">
          {/* Logo */}
          <View className="items-center mb-4">
            <Image
              source={require('../../assets/logo.png')}
              className="w-40 h-20"
              resizeMode="contain"
            />
          </View>


          <Text className="text-white text-2xl font-bold mb-2 mt-10">
            Create Account
          </Text>
          <Text className="text-gray-500 text-sm mb-6">
            Join the global network of modern explorers.
          </Text>

          <View className="mb-4">
            <Text className="text-accent text-xs font-bold tracking-widest mb-2">
              FULL NAME
            </Text>
            <View className="flex-row items-center bg-primary border border-gray-700 rounded-lg px-4 py-3">
              <Feather name="user" size={18} color="#6B7280" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-white text-base"
                placeholder="Elias Thorne"
                placeholderTextColor="#6B7280"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-accent text-xs font-bold tracking-widest mb-2">
              EMAIL ADDRESS
            </Text>
            <View className="flex-row items-center bg-primary border border-gray-700 rounded-lg px-4 py-3">
              <Feather name="mail" size={18} color="#6B7280" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-white text-base"
                placeholder="explorer@geoquest.com"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-accent text-xs font-bold tracking-widest mb-2">
              PASSWORD
            </Text>
            <View className="flex-row items-center bg-primary border border-gray-700 rounded-lg px-4 py-3">
              <Feather name="lock" size={18} color="#6B7280" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-white text-base"
                placeholder="••••••••"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secureText}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Feather
                  name={secureText ? 'eye' : 'eye-off'}
                  size={18}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="bg-accent py-4 mt-4 rounded-full items-center flex-row justify-center mb-6"
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text className="text-primary text-lg font-bold">CREATE ACCOUNT</Text>
            <Feather name="arrow-right" size={20} color="#151D1A" style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          {/* Bottom Link */}
          <View className="flex-row justify-center pb-8">
            <Text className="text-gray-500">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-accent font-bold">LOG IN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
