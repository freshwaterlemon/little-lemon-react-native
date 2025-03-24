import { View, Text, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                const storedPreferences = await AsyncStorage.getItem('preferences');
                if (storedEmail) {
                    setEmail(storedEmail);  // Store the full email
                    const extractedFirstName = storedEmail.split('@')[0]; // Get part before '@'
                    setFirstname(extractedFirstName); // Set the first name
                    await AsyncStorage.setItem('userFirstname', extractedFirstName);
                }
                if (storedPreferences) {
                    setPreferences(JSON.parse(storedPreferences)); // Parse string into an object
                }
            } catch (error) {
                console.error('Error fetching email:', error);
            }
        };

        fetchData();
    }, []);

    // Update preference state and save to AsyncStorage
    const updateState = (key: string) => async () => {
        const newPreferences = {
            ...preferences,
            [key]: !preferences[key], // Toggle the current preference
        };

        setPreferences(newPreferences); // Update the state with new preferences

        try {
            // Save updated preferences to AsyncStorage
            await AsyncStorage.setItem('preferences', JSON.stringify(newPreferences));
            console.log('Updated preferences saved:', newPreferences);
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    };

    const handleUpdateProfile = () => {
        router.push('/updateProfile'); // Navigate to the update profile screen
    };

    const handleLogOut = async () => {
        try {
            console.log('Log Out clicked');

            // Clear all user data from AsyncStorage
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userFirstname');
            await AsyncStorage.removeItem('userLastname');
            await AsyncStorage.removeItem('userPhonenum');
            await AsyncStorage.removeItem('hasSeenOnboarding');
            await AsyncStorage.removeItem('hasSeenOnboarding');
            await AsyncStorage.removeItem('emailPreferences');

            if (!email && !firstname && !lastname && !phonenum) {
                router.replace('/onboardingScreen');
            } else {
                console.log('Failed to remove some user data');
            }

        } catch (error) {
            console.error('Error logging out:', error);
        }
    };



    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 px-5 py-5 items-center bg-white">
                <View className="w-full p-6 mx-8">
                    <Text className="text-2xl font-bold">Profile Information</Text>

                    {/* Avatar and Name Section */}
                    <View className="flex-row py-3 items-center">
                        {/* Avatar Placeholder */}
                        <View className="size-20 bg-gray-300 rounded-full justify-center items-center mr-3">
                            <Text className="text-xl text-white">{firstname?.charAt(0).toUpperCase() || "?"}</Text>
                        </View>

                        {/* Name */}
                        <Text className="text-3xl font-semibold mb-5 mx-2 mt-4">{firstname || "No name found"}</Text>
                        <Text className="text-3xl font-semibold mb-5 mt-4">{lastname || " "}</Text>
                    </View>

                    {/* Display Full Email */}
                    <View className="flex-cols justify-between py-3">
                        <View className="flex-row items-center">
                            <Image source={ICONS.email} className="w-6 h-6 mr-4 mt-4" />
                            <Text className="text-lg mt-4">| {email || 'No email found'}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image source={ICONS.phone} className="w-6 h-6 mr-4 mt-4" />
                            <Text className="text-lg mt-4">| {phonenum || "No Phone Number"}</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-center py-3">
                        <TouchableOpacity
                            className="w-full h-12 mt-4 bg-primary-green justify-center items-center rounded-lg"
                            onPress={handleUpdateProfile}
                        >
                            <Text className="text-highlight-grey text-xl font-bold">Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Email Notifications */}
                <View className="w-full p-6 mx-8">
                    <Text className="text-2xl font-bold mb-4">Email Notifications</Text>
                    <View className="flex-row justify-between py-3">
                        <Text className="text-lg">Order Status</Text>
                        <Switch
                            value={preferences.orderStatus}
                            onValueChange={updateState('orderStatus')}
                        />
                    </View>
                    <View className="flex-row justify-between py-3">
                        <Text className="text-lg">Password Changes</Text>
                        <Switch
                            value={preferences.passwordChanges}
                            onValueChange={updateState('passwordChanges')}
                        />
                    </View>
                    <View className="flex-row justify-between py-3">
                        <Text className="text-lg">Special Offers</Text>
                        <Switch
                            value={preferences.specialOffers}
                            onValueChange={updateState('specialOffers')}
                        />
                    </View>
                    <View className="flex-row justify-between py-3">
                        <Text className="text-lg">Newsletter</Text>
                        <Switch
                            value={preferences.newsletter}
                            onValueChange={updateState('newsletter')}
                        />
                    </View>
                </View>
                <View className="w-full px-6 mx-8">
                    <Text className="text-2xl color-red-500 font-bold mb-4">Danger Zone</Text>
                    <View className="flex-row justify-center py-3">
                        <TouchableOpacity
                            className="w-full h-12 mt-2 bg-primary-green justify-center items-center rounded-lg"
                            onPress={handleLogOut}
                        >
                            <Text className="text-highlight-grey text-xl font-bold">Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Profile;
