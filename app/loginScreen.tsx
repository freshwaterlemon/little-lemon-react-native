import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = () => {
        if (!email) {
            setEmailError('Email is required');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Password is required');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleLogin = async () => {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            // Proceed with login logic
            console.log('Email:', email);
            console.log('Password:', password);
            try {
                // Store email and password securely
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userPassword', password);

                console.log('Credentials saved to AsyncStorage');
                router.replace('/(tabs)');
            } catch (error) {
                console.error('Error saving data:', error);
            }
        }
    };
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView>
                <View className="flex-1 justify-center items-center bg-primary-green px-5">
                    <Image
                        source={require('../assets/images/icon.png')}
                        className="w-1/4 h-1/6 mb-10"
                    />
                    <Text className="text-4xl font-bold mb-6 text-primary-yellow">Login</Text>

                    <TextInput
                        className="w-3/4 h-12 border border-gray-300 rounded-lg px-3 mb-5 bg-white"
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {emailError ? <Text className="text-red-500 font-semibold mb-4">{emailError}</Text> : null}

                    <TextInput
                        className="w-3/4 h-12 border border-gray-300 rounded-lg px-3 mb-4 bg-white"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {passwordError ? <Text className="text-red-500 font-semibold mb-5">{passwordError}</Text> : null}

                    <TouchableOpacity
                        className="w-3/4 h-12 mt-4 bg-primary-yellow justify-center items-center rounded-lg"
                        onPress={handleLogin}
                    >
                        <Text className="text-highlight-black text-lg font-bold">Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="mt-4">
                        <Text className="text-highlight-grey text-base">Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

export default LoginScreen;
