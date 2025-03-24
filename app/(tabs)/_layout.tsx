import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { ICONS } from "@/constants";

const _layout = () => {
    return (
        <Tabs screenOptions={{ tabBarShowLabel: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Image
                                source={ICONS.home}
                                className='size-10 mt-6'
                                style={{
                                    tintColor: focused ? "#495E57" : "grey",
                                }}
                                resizeMode="contain" />
                        </>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Image
                                source={ICONS.profile}
                                className='size-10 mt-6'
                                style={{
                                    tintColor: focused ? "#495E57" : "grey",
                                }}
                                resizeMode="contain" />
                        </>
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout