import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                if (storedEmail) {
                    setEmail(storedEmail);
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
        </View>
    );
};

export default Profile;
