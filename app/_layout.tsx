import React, { useState, useEffect } from 'react';
import { Stack, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Image } from 'react-native';
import './global.css';
import { IMAGE } from "@/constants";

export default function RootLayout() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        if (userEmail) {
          setTimeout(() => {
            router.replace('/(tabs)'); // Go to main app if user is logged in
          }, 100); // Small delay (100ms)
          return;
        }

        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

        if (hasSeenOnboarding === 'true') {
          setTimeout(() => {
            router.replace('/loginScreen'); // Go to login screen
          }, 100); // Small delay (100ms)
        } else {
          setTimeout(() => {
            router.replace('/onboardingScreen'); // Show onboarding
          }, 100); // Small delay (100ms)
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      } finally {
        setIsChecking(false); // Ensure state updates and screen loads
      }
    };

    checkUserStatus();
  }, []);

  // Show a loading spinner while checking AsyncStorage
  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#495E57" />
      </View>
    );
  }

  return <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{
        headerShown: true,
        headerTitle: () => (
          <Image
            source={IMAGE.banner}
            style={{
              width: 120,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        ),
      }}
    />
  </Stack>
}
