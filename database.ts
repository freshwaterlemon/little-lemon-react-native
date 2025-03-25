import { openDatabaseSync } from 'expo-sqlite';

// Define the type for a menu item
export type MenuItem = {
	name: string;
	description: string;
	price: string;
	image: string;
	category?: string;
};

// Open or create the database using the new API
const db = openDatabaseSync('little_lemon.db');

export const initDatabase = async (): Promise<void> => {
	try {
		await db.execAsync(`
      CREATE TABLE IF NOT EXISTS menu (
        name TEXT PRIMARY KEY,
        description TEXT,
        price TEXT,
        image TEXT,
        category TEXT
      );
    `);
	} catch (error) {
		console.error('Error initializing database:', error);
		throw error;
	}
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
	try {
		const result = await db.getAllAsync<MenuItem>('SELECT * FROM menu');
		return result;
	} catch (error) {
		console.error('Error getting menu items:', error);
		throw error;
	}
};

export const saveMenuItems = async (items: MenuItem[]): Promise<void> => {
	try {
		await db.withTransactionAsync(async () => {
			for (const item of items) {
				await db.runAsync(
					'INSERT INTO menu (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)',
					[
						item.name,
						item.description,
						item.price,
						item.image,
						item.category || 'extra',
					]
				);
			}
		});
	} catch (error) {
		console.error('Error saving menu items:', error);
		throw error;
	}
};

export const getMenuItemsByCategories = async (
	categories: string[]
): Promise<MenuItem[]> => {
	try {
		if (categories.length === 0) {
			return await getMenuItems();
		}

		// Create placeholders for the SQL query (?, ?, ?)
		const placeholders = categories.map(() => '?').join(',');

		const query = `SELECT * FROM menu WHERE category IN (${placeholders})`;
		const result = await db.getAllAsync<MenuItem>(query, categories);

		return result;
	} catch (error) {
		console.error('Error filtering menu items by categories:', error);
		throw error;
	}
};

export const searchMenuItems = async (
	searchText: string,
	categories: string[] = []
): Promise<MenuItem[]> => {
	try {
		let query = '';
		let params: any[] = [];

		if (searchText && categories.length > 0) {
			// Both search text and categories
			const placeholders = categories.map(() => '?').join(',');
			query = `SELECT * FROM menu WHERE name LIKE ? AND category IN (${placeholders})`;
			params = [`%${searchText}%`, ...categories];
		} else if (searchText) {
			// Only search text
			query = 'SELECT * FROM menu WHERE name LIKE ?';
			params = [`%${searchText}%`];
		} else if (categories.length > 0) {
			// Only categories
			return await getMenuItemsByCategories(categories);
		} else {
			// No filters
			return await getMenuItems();
		}

		const result = await db.getAllAsync<MenuItem>(query, params);
		return result;
	} catch (error) {
		console.error('Error searching menu items:', error);
		throw error;
	}
};
