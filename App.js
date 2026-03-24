import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold text-white  bg-blue-900 p-3 rounded-full px-8">Saif</Text>
      <StatusBar style="auto" />
    </View>
  );
}
