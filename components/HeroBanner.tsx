// components/HeroBanner.tsx
import React from 'react';
import { View, Text, Image } from 'react-native';
import { HEADER } from '@/constants';

export default function HeroBanner() {
	return (
		<View className="bg-primary-green flex-row p-4 mb-4">
			<View className="flex-col w-1/2 mx-3 py-6 mt-2">
				<Text className="text-yellow-400 text-3xl font-bold">
					Little Lemon
				</Text>
				<Text className="text-white text-xl">Chicago</Text>
				<Text className="text-white text-sm mb-4 mt-2">
					We are a family-owned Mediterranean restaurant, focused on
					traditional recipes served with a modern twist.
				</Text>
			</View>
			<Image
				source={HEADER.hero}
				className="w-1/2 h-full rounded-lg my-3 pr-6 py-4"
				style={{
					resizeMode: 'cover',
				}}
			/>
		</View>
	);
}
