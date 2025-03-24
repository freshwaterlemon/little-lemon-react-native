import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { ICONS } from '@/constants';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phonenum, setPhonenum] = useState('');
    const [preferences, setPreferences] = useState({
        orderStatus: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false,
    });

    // Fetch user data when screen is focused
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const storedEmail = await AsyncStorage.getItem('userEmail');
                    const storedFirstname = await AsyncStorage.getItem('userFirstname');
                    const storedLastname = await AsyncStorage.getItem('userLastname');
                    const storedPhonenum = await AsyncStorage.getItem('userPhonenum');
                    const storedPreferences = await AsyncStorage.getItem('preferences');

                    if (storedEmail) setEmail(storedEmail);
                    if (storedFirstname) setFirstname(storedFirstname);
                    if (storedLastname) setLastname(storedLastname);
                    if (storedPhonenum) setPhonenum(storedPhonenum);
                    if (storedPreferences) setPreferences(JSON.parse(storedPreferences));
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            };

            fetchData();
        }, [])
    );

    const handleUpdateProfile = () => {
        router.push('/updateProfile'); // Navigate to update profile screen
    };

    const handleLogOut = async () => {
        try {
            console.log('Log Out clicked');

            // Clear user data
            await AsyncStorage.clear();
            router.replace('/onboardingScreen');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    function updateState(key: string): void | Promise<void> {
        throw new Error('Function not implemented.');
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 px-5 py-5 items-center bg-white">
                <View className="w-full p-6 mx-8">
                    <Text className="text-2xl font-bold mb-4">Profile Information</Text>

                    {/* Avatar and Name */}
                    <View className="flex-row py-3 items-center">
                        <View className="size-20 bg-gray-300 rounded-full justify-center items-center mr-3">
                            <Text className="text-xl text-white">{firstname?.charAt(0).toUpperCase() || "?"}</Text>
                        </View>
                        <Text className="text-3xl font-semibold mx-2 mt-4">{firstname || "No name found"}</Text>
                        <Text className="text-3xl font-semibold mt-4">{lastname || " "}</Text>
                    </View>

                    {/* Email and Phone */}
                    <View className="flex-cols justify-between py-3">
                        <View className="flex-row items-center">
                            <Image source={ICONS.email} className="w-6 h-6 mr-4 mt-4" />
                            <Text className="text-lg mt-4">| {email || 'No email found'}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image source={ICONS.phone} className="w-6 h-6 mr-4 mt-4" />
                            <Text className="text-lg mt-4">| +65 {phonenum ? phonenum.replace(/(\d{4})(?=\d)/g, '$1 ') : "No Phone Number"}</Text>
                        </View>
                    </View>

                    {/* Update Profile Button */}
                    <TouchableOpacity
                        className="w-full h-12 mt-4 bg-primary-green justify-center items-center rounded-lg"
                        onPress={handleUpdateProfile}
                    >
                        <Text className="text-highlight-grey text-xl font-bold">Update Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Email Notifications */}
                <View className="w-full p-6 mx-8">
                    <Text className="text-2xl font-bold mb-4">Email Notifications</Text>
                    {Object.entries(preferences).map(([key, value]) => (
                        <View key={key} className="flex-row justify-between py-3">
                            <Text className="text-lg capitalize">{key.replace(/([A-Z])/g, ' $1')}</Text>
                            <Switch value={value} onValueChange={() => updateState(key)} />
                        </View>
                    ))}
                </View>

                {/* Log Out */}
                <View className="w-full px-6 mx-8">
                    <Text className="text-2xl text-red-500 font-bold mb-4">Danger Zone</Text>
                    <TouchableOpacity
                        className="w-full h-12 mt-2 bg-red-500 justify-center items-center rounded-lg"
                        onPress={handleLogOut}
                    >
                        <Text className="text-white text-xl font-bold">Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;
