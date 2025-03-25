// components/CategoryList.tsx
import React from 'react';
import {
	ScrollView,
	TouchableOpacity,
	Text,
	View,
	TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type CategoryListProps = {
	categories: string[];
	selectedCategories: string[];
	onCategoryPress: (category: string) => void;
	searchText: string;
	onSearchChange: (text: string) => void;
	allCategories?: string[]; // Add this prop for all available categories
};

export default function CategoryList({
	categories,
	selectedCategories,
	onCategoryPress,
	searchText,
	onSearchChange,
	allCategories, // Use this for rendering if provided
}: CategoryListProps) {
	// Use allCategories if provided, otherwise fall back to categories
	const categoriesToDisplay = allCategories || categories;

	return (
		<View className="px-4 pt-2 pb-4">
			{/* Search Bar */}
			<View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-4 border border-gray-200">
				<Ionicons
					name="search"
					size={18}
					color="#333"
					style={{ marginLeft: 5, marginRight: 5, marginTop: 4 }}
				/>
				<TextInput
					className="flex-1 ml-2 text-base py-2"
					placeholder="Search menu items..."
					value={searchText}
					onChangeText={onSearchChange}
					placeholderTextColor="#333"
				/>
			</View>

			{/* Categories */}
			<Text className="text-xl font-bold mb-4">Categories</Text>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				className="flex-row"
				contentContainerClassName="gap-2"
			>
				{categoriesToDisplay.map((category) => (
					<TouchableOpacity
						key={category}
						onPress={() => onCategoryPress(category)}
						className={`px-4 py-2 rounded-full mr-2 border border-gray-200 ${
							selectedCategories.includes(category)
								? 'bg-primary-green'
								: 'bg-gray-100'
						}`}
					>
						<Text
							className={`font-semibold ${
								selectedCategories.includes(category)
									? 'text-white'
									: 'text-primary-green'
							}`}
						>
							{category}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
}
