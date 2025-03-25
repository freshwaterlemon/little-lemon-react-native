import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGE } from '@/constants';

const UpdateProfile = () => {
    const navigation = useNavigation();
    // Set custom back button text
    useLayoutEffect(() => {
        navigation.setOptions({
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
            title: 'Edit Profile', // Set the screen title
            headerBackTitle: 'Back', // Change back button text to "Back"
        });
    }, [navigation]);

    // State to hold the updated user details
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);

    // Get current user data from AsyncStorage when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedFirstName = await AsyncStorage.getItem('userFirstname');
                const storedLastName = await AsyncStorage.getItem('userLastname');
                const storedPhone = await AsyncStorage.getItem('userPhonenum');
                const storedAvatar = await AsyncStorage.getItem('userAvatar');

                if (storedFirstName) setFirstName(storedFirstName);
                if (storedLastName) setLastName(storedLastName);
                if (storedPhone) setPhone(storedPhone);
                if (storedAvatar) setAvatar(storedAvatar);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    // Handle avatar selection
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    // Save updated profile to AsyncStorage
    const saveProfile = async () => {
        try {
            // Save the updated information to AsyncStorage
            await AsyncStorage.setItem('userFirstname', firstName);
            await AsyncStorage.setItem('userLastname', lastName);
            await AsyncStorage.setItem('userPhonenum', phone);
            if (avatar) {
                await AsyncStorage.setItem('userAvatar', avatar); // Save avatar URI
            }

            Alert.alert('Success', 'Profile updated successfully');
            navigation.goBack(); // Navigate back to the profile screen
        } catch (error) {
            console.error('Error saving profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    const cancel = () => {
        navigation.goBack();
    };

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 px-5 py-5 items-center bg-white">
                <View className="w-full p-6 mx-8">
                    <Text className="text-2xl font-bold text-center mb-6">Edit Profile</Text>
                    {/* Avatar */}
                    <View className="items-center mb-6">
                        {avatar ? (
                            <Image source={{ uri: avatar }} className="size-24 rounded-full mb-4" />
                        ) : (
                            <View className="w-24 h-24 rounded-full bg-gray-300 justify-center items-center mb-4">
                                <Text className="text-xl text-white">?</Text>
                            </View>
                        )}
                        <TouchableOpacity onPress={pickImage} className="w-1/2 h-12 mt-4 bg-primary-green justify-center items-center rounded-lg">
                            <Text className="text-highlight-grey text-xl font-bold">Change Avatar</Text>
                        </TouchableOpacity>
                    </View>

                    {/* First Name */}
                    <View className="mb-4">
                        <Text className="font-bold text-lg mb-2 ml-1">First Name</Text>
                        <TextInput
                            className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-2 bg-white"
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholder="Enter your first name"
                        />
                    </View>

                    {/* Last Name */}
                    <View className="mb-4">
                        <Text className="font-bold text-lg mb-2 ml-1">Last Name</Text>
                        <TextInput
                            className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-2 bg-white"
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Enter your last name"
                        />
                    </View>

                    {/* Phone Number */}
                    <View className="mb-4">
                        <Text className="font-bold text-lg mb-2 ml-1">Phone Number</Text>
                        <TextInput
                            className="w-full h-12 border border-gray-300 rounded-lg px-3 mb-2 bg-white"
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Enter your phone number"
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Save Button */}
                    <View className='flex-col justify-between'>
                        <TouchableOpacity onPress={saveProfile} className="w-full h-12 mt-4 bg-primary-green justify-center items-center rounded-lg">
                            <Text className="text-white text-lg font-bold text-center">Save Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cancel} className="w-full h-12 mt-4 bg-red-500 justify-center items-center rounded-lg">
                            <Text className="text-white text-lg font-bold text-center">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default UpdateProfile;
