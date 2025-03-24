// import { Link } from "expo-router";
import { Text, View } from "react-native";
import React, { useEffect, useState } from 'react';

export default function Index() {
  // const [firstname, setFirstname] = useState('');

  // useEffect(() => {
  //   const fetchFirstName = async () => {
  //     try {
  //       const storedFirstName = await AsyncStorage.getItem('userFirstname');
  //       if (storedFirstName) {
  //         setFirstname(storedFirstName);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching first name:', error);
  //     }
  //   };

  //   fetchFirstName();
  // }, []);

  return (
    <View
      className="flex items-center justify-center h-full bg-white"
    >
      <Text className="text-5xl text-primary-green">Welcome</Text>
    </View>
  );
}
