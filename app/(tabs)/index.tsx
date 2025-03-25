import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import useFetchMenu from '@/hooks/fetchMenu';
import {
	MenuItem,
	initDatabase,
	getMenuItems,
	saveMenuItems,
	searchMenuItems,
} from '@/database';
import CategoryList from '@/app/components/CategoryList';
import HeroBanner from '@/app/components/HeroBanner';

export default function Index() {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchText, setSearchText] = useState('');
	const [debouncedSearchText, setDebouncedSearchText] = useState('');
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const { data: apiData, loading: apiLoading } = useFetchMenu();
	const [allCategories, setAllCategories] = useState<string[]>([]);

	// Extract unique categories from menu items
	const uniqueCategories = [
		...new Set(menuItems.map((item) => item.category || 'extra')),
	];

	// Debounce search text
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchText(searchText);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [searchText]);

	// Initialize database and load initial data
	useEffect(() => {
		const loadData = async () => {
			try {
				await initDatabase();
				const storedItems = await getMenuItems();

				if (storedItems.length > 0) {
					setMenuItems(storedItems);
					const uniqueCats = [
						...new Set(
							storedItems.map((item) => item.category || 'extra')
						),
					];
					setAllCategories(uniqueCats);
					setLoading(false);
				} else if (apiData && apiData.length > 0) {
					await saveMenuItems(apiData);
					setMenuItems(apiData);
					const uniqueCats = [
						...new Set(
							apiData.map((item) => item.category || 'extra')
						),
					];
					setAllCategories(uniqueCats);
					setLoading(false);
				}
			} catch (error) {
				console.error('Error loading data:', error);
				if (!apiLoading && apiData && apiData.length > 0) {
					setMenuItems(apiData);
					const uniqueCats = [
						...new Set(
							apiData.map((item) => item.category || 'extra')
						),
					];
					setAllCategories(uniqueCats);
					setLoading(false);
				}
			}
		};

		if (!apiLoading) {
			loadData();
		}
	}, [apiData, apiLoading]);

	// Filter menu items when search text or selected categories change
	useEffect(() => {
		const filterItems = async () => {
			if (!loading) {
				try {
					const filteredItems = await searchMenuItems(
						debouncedSearchText,
						selectedCategories
					);
					setMenuItems(filteredItems);
				} catch (error) {
					console.error('Error filtering menu items:', error);
				}
			}
		};

		filterItems();
	}, [debouncedSearchText, selectedCategories, loading]);

	// Handle category selection
	const handleCategoryPress = (category: string) => {
		setSelectedCategories((prev) => {
			if (prev.includes(category)) {
				return prev.filter((cat) => cat !== category);
			} else {
				return [...prev, category];
			}
		});
	};

	// Show loading indicator while data is being fetched
	if (loading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#495E57" />
			</View>
		);
	}

	return (
		<View className="flex-1 bg-white">
			{/* Hero Banner with Search */}
			<HeroBanner />

			<CategoryList
				categories={uniqueCategories}
				allCategories={allCategories}
				selectedCategories={selectedCategories}
				onCategoryPress={handleCategoryPress}
				searchText={searchText}
				onSearchChange={setSearchText}
			/>
			{/* Menu List */}
			<FlatList
				data={menuItems}
				keyExtractor={(item) => item.name}
				initialNumToRender={5}
				renderItem={({ item }) => (
					<View className="flex-row border-t border-gray-200 px-6 py-4">
						<View className="flex-1 mr-6">
							<Text className="text-lg font-semibold mb-1">
								{item.name}
							</Text>
							<Text className="text-gray-600 text-sm mb-4">
								{item.description}
							</Text>
							<Text className="font-bold">
								${parseFloat(item.price).toFixed(2)}
							</Text>
						</View>
						<Image
							source={{ uri: item.image }}
							className="w-24 h-24 mt-2 rounded-lg"
						/>
					</View>
				)}
				ListEmptyComponent={
					<View className="p-8 items-center">
						<Text className="text-base text-gray-500">
							No menu items found
						</Text>
					</View>
				}
			/>
		</View>
	);
}
