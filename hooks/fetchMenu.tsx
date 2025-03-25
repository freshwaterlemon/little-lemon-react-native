import { MenuItem } from '@/database';
import { useState, useEffect } from 'react';

const MENU_API =
	'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const MENU_IMAGE_API =
	'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/';

const useFetchMenu = (): { data: MenuItem[]; loading: boolean } => {
	const [data, setData] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getMenu = async () => {
			try {
				const response = await fetch(MENU_API);
				const json = await response.json();

				const transformedMenu = json.menu.map((item: any) => ({
					...item,
					image: `${MENU_IMAGE_API}${item.image}?raw=true`,
				}));
				setData(transformedMenu);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		getMenu();
	}, []);

	return { data, loading };
};

export default useFetchMenu;

// import { View, Text, FlatList } from 'react-native';
// import React, { useState, useEffect } from 'react';

// const MENU_API =
// 	'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

// const MENU_IMAGE_API =
// 	'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/';

// const fetchMenu = () => {
// 	const [data, setData] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	const getMenu = async () => {
// 		try {
// 			const response = await fetch(MENU_API);
// 			const json = await response.json();

// 			// Transform menu data to include full image URLs
// 			const transformedMenu = json.menu.map((item: any) => ({
// 				...item,
// 				image: `${MENU_IMAGE_API}${item.image}?raw=true`, // Append full image URL
// 			}));
// 			// console.log(transformedMenu);
// 			setData(transformedMenu);
// 		} catch (error) {
// 			console.error(error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		// Use useEffect to call getMenu only once on component mount
// 		getMenu();
// 	}, []); // Empty dependency array ensures this runs only once

// 	return { data, loading }; // Return the data and loading state
// };
// export default fetchMenu;
