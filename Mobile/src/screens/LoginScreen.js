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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-16">
          <View className="items-center mb-6">
            <Image
              source={require('../../assets/logo.png')}
              className="w-40 h-20"
              resizeMode="contain"
            />
          </View>

          {/* Card */}
          <View className="">
       
    <Text className="text-white text-2xl font-bold mb-2 mt-10">
            Login Your Account
          </Text>
          <Text className="text-gray-500 text-sm mb-6">
            Join the global network of modern explorers.
          </Text>
            {/* Email */}
            <View className="mb-4">
              <Text className="text-accent text-xs font-bold tracking-widest mb-2">
                EMAIL
              </Text>
              <View className="flex-row items-center bg-primary border border-gray-700 rounded-lg px-4 py-3">
                <TextInput
                  className="flex-1 text-gray-400 text-base"
                  placeholder="explorer@geoquest.com"
                  placeholderTextColor="#6B7280"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Feather name="at-sign" size={18} color="#6B7280" />
              </View>
            </View>

            {/* Password */}
            <View className="mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-accent text-xs font-bold tracking-widest">
                  PASSWORD
                </Text>
              </View>
              <View className="flex-row items-center bg-primary border border-gray-700 rounded-lg px-4 py-3">
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
                    name={secureText ? 'lock' : 'eye'}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-accent py-4 rounded-full items-center flex-row justify-center"
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text className="text-primary text-lg font-bold">LOGIN</Text>
              <Feather name="arrow-right" size={20} color="#151D1A" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>

          {/* Bottom Link */}
          <View className="flex-row justify-center mt-auto pb-8 pt-6">
            <Text className="text-gray-500">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-accent font-bold">SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
