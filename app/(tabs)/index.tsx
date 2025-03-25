import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from 'react-native';
import fetchMenu from '@/hooks/fetchMenu';
import { FOOD, HEADER, IMAGE } from '@/constants';

// Define the type for a menu item
type MenuItem = {
	name: string;
	description: string;
	price: string;
	image: string;
	category?: string;
};

export default function Index() {
	const { data: menuItems, loading } = fetchMenu() as {
		data: MenuItem[];
		loading: boolean;
	};

	// Extract unique categories safely
	const uniqueCategories = [
		...new Set(menuItems.map((item) => item.category || 'extra')),
	];

	// Show loading indicator while data is being fetched
	if (loading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#495E57" />
			</View>
		);
	}

	return (
		<View className="bg-white flex-1">
			<View>
				{/* Restaurant Info */}
				<View className="flex-row bg-primary-green text-white p-4 py-2 pb-4 mb-4">
					<View className="flex-col w-1/2 mx-3 py-6 mt-2">
						<Text className="text-yellow-400 text-2xl font-bold">
							Little Lemon
						</Text>
						<Text className="text-white text-xl">Chicago</Text>
						<Text className="text-white text-sm mt-2">
							We are a family-owned Mediterranean restaurant,
							focused on traditional recipes served with a modern
							twist.
						</Text>
						{/* Search Button */}
						<TouchableOpacity className=" bg-primary-yellow p-3 rounded-lg w-1/2 mt-4">
							<Text className="text-center text-highlight-black text-base font-bold">
								Search
							</Text>
						</TouchableOpacity>
					</View>
					<Image
						source={HEADER.hero}
						className="w-1/2 h-full rounded-lg my-3 pr-6 py-4"
						style={{ resizeMode: 'cover' }}
					/>
				</View>

				{/* Categories */}
				<View className="flex-row justify-between my-4 px-6 gap-2">
					{uniqueCategories.map((category, index) => (
						<TouchableOpacity
							key={index}
							className="px-4 py-2 bg-primary-green rounded-full"
						>
							<Text className="text-highlight-grey font-semibold">
								{category}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Menu List using FlatList */}
			<FlatList
				data={menuItems}
				keyExtractor={(item) => item.name} // Use the item name as the key
				renderItem={({ item }) => (
					<View className="flex-row items-center justify-between border-t border-gray-200 py-3 mt-2">
						<View className="flex-1 px-4">
							<Text className="text-lg font-semibold">
								{item.name}
							</Text>
							<Text className="text-highlight-black text-sm">
								{item.description}
							</Text>
							<Text className="text-highlight-black font-extrabold mt-2">
								${parseFloat(item.price).toFixed(2)}
							</Text>
						</View>
						<Image
							source={{ uri: item.image }}
							className="w-24 h-24 pr-4 rounded-lg"
						/>
					</View>
				)}
				ListFooterComponent={<View style={{ height: 20 }} />}
			/>
		</View>
	);
}
