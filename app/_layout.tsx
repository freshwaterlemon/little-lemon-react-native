import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from "expo-router";
import './global.css';
import OnboardingScreen from './onboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const router = useRouter();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboardingStatus = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(onboardingStatus === 'true');
    };

    checkOnboarding();
  }, []);

  useEffect(() => {
    if (hasSeenOnboarding === null) {
      return;
    }
    if (hasSeenOnboarding) {
      router.replace('/loginScreen');
    } else {
      router.replace('/onboardingScreen');
    }
  }, [hasSeenOnboarding, router]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"  // This is for your tabs layout
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="OnboardingScreen"
        options={{ headerShown: false }}
      /> */}
    </Stack>
  );
}
