import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const UpdateProfile = () => {
    const navigation = useNavigation();

    // Set custom back button text
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Edit Profile', // Set the screen title
            headerBackTitle: 'Back', // Change back button text to "Back"
        });
    }, [navigation]);

    return (
        <View>
            <Text>Update Profile</Text>
        </View>
    );
};

export default UpdateProfile;
