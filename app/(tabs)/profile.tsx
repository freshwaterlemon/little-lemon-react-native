import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                if (storedEmail) {
                    setEmail(storedEmail);
                    const extractedFirstName = storedEmail.split('@')[0]; // Get part before '@'
                    setFirstname(extractedFirstName); // Set the first name
                    await AsyncStorage.setItem('userFirstname', extractedFirstName);
                }
            } catch (error) {
                console.error('Error fetching email:', error);
            }
        };

        fetchEmail();
    }, []);

    return (
        <View className="flex items-center justify-center h-full">
            <Text className="text-2xl font-bold">Profile</Text>
            <Text className="text-lg mt-4">Email: {email || 'No email found'}</Text>
            <Text className="text-lg mt-4">First Name: {firstname || "No name found"}</Text>
        </View>
    );
};

export default Profile;
