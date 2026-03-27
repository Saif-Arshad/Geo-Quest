import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainTabs from './src/navigation/MainTabs';
import CacheDetailsScreen from './src/screens/CacheDetailsScreen';
import DiscoverySuccessScreen from './src/screens/DiscoverySuccessScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import LogbookScreen from './src/screens/LogbookScreen';
import CreateCacheScreen from './src/screens/CreateCacheScreen';
import NewEventScreen from './src/screens/NewEventScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen name="CacheDetails" component={CacheDetailsScreen} />
          <Stack.Screen
            name="DiscoverySuccess"
            component={DiscoverySuccessScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
          <Stack.Screen name="Logbook" component={LogbookScreen} />
          <Stack.Screen name="CreateCache" component={CreateCacheScreen} />
          <Stack.Screen
            name="NewEvent"
            component={NewEventScreen}
            options={{ animation: 'slide_from_bottom' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
