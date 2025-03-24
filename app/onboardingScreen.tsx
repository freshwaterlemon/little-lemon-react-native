import { router, Stack } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
        activeOpacity={0.7}
    >
        <Text className={"text-xl font-bold pr-3"}>
            Done
        </Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }: any) => {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <Onboarding
                DoneButtonComponent={Done}
                onDone={() => router.replace('/(tabs)')}
                onSkip={() => router.replace('/(tabs)')}
                pages={[
                    {
                        backgroundColor: '#495E57',
                        image: <Image source={require('../assets/images/icon.png')} style={styles.image} />,
                        title: 'Welcome to Little Lemon',
                        subtitle: 'Explore amazing features',
                    },
                    {
                        backgroundColor: '#FBDABB',
                        image: <Image source={require('../assets/images/little-lemon-poster.png')} style={styles.image} />,
                        title: 'Get Started',
                        subtitle: 'Let’s begin ordering!',
                        titleStyles: { fontSize: 24, fontWeight: 'bold' },
                        // subtitleStyles: { fontSize: 16 },
                        // onDone: () => navigation.replace('/(tabs)/index'), // Navigate after onboarding
                    },
                ]}
            />
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
});

export default OnboardingScreen;
