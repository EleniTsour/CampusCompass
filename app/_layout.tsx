import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect} from 'react';
import 'react-native-reanimated';

import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesProvider } from '@/components/FavoritesProvider';
import { UserProvider } from './Context/UserContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <RootLayoutNav />
    </UserProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  return (
    <FavoritesProvider>
      <Stack>
       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       <Stack.Screen name='listing/[id]' options={{headerTitle: '', headerTransparent: true}}/>
       <Stack.Screen name='(modals)/booking' options={{
        presentation: 'transparentModal',
        animation: 'fade',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='close-outline' size={28}/>
          </TouchableOpacity>
        )
       }}/>
    </Stack>
    </FavoritesProvider>
  );
}
