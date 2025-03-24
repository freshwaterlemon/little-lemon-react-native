import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FOOD, HEADER, IMAGE } from '@/constants';
const menuItems = [
  {
    name: 'Greek Salad',
    desc: 'The famous Greek salad of crispy lettuce, peppers, olives and our Chicago...',
    price: '$12.99',
    image: FOOD.greek_salad,
  },
  {
    name: 'Bruschetta',
    desc: 'Our Bruschetta is made from grilled bread that has been smeared with garlic...',
    price: '$7.99',
    image: FOOD.bruschetta,
  },
  {
    name: 'Grilled Fish',
    desc: 'Barbequed catch of the day. with red onion, crisp capers, chive creme fraiche,',
    price: '$20.00',
    image: FOOD.grilled_fish,
  },
  {
    name: 'Pasta',
    desc: 'Penne with fried aubergines, tomato sauce, fresh chili, garlic, basil & salted...',
    price: '$18.99',
    image: FOOD.pasta,
  },
  {
    name: 'Lemon Dessert',
    desc: 'Light and fluffy traditional homemade Italian Lemon and ricotta cake',
    price: '$6.99',
    image: FOOD.lemon_dessert,
  },
];

const categories = ['Starters', 'Mains', 'Desserts', 'Drinks'];

export default function Index() {
  return (
    <ScrollView className="bg-white">

      {/* Restaurant Info */}
      <View className="flex-row bg-primary-green text-white p-4 py-12">
        <View className='flex-col w-1/2 mx-3'>
          <Text className="text-yellow-400 text-2xl font-bold">
            Little Lemon
          </Text>
          <Text className="text-white text-xl">Chicago</Text>
          <Text className="text-gray-300 text-sm mt-2">
            We are a family-owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
          {/* Search Button */}
          <TouchableOpacity className=" bg-gray-300 p-3 rounded-full w-12 h-12 mt-4">
            <Text className="text-center text-gray-700 text-lg">🔍</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={HEADER.hero}
          className="size-40 rounded-lg mt-3"
        />
      </View>



      {/* Categories */}
      <View className="flex-row justify-between mt-6 px-4">
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className="px-4 py-2 bg-gray-200 rounded-full"
          >
            <Text className="text-gray-700 font-semibold">
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Menu List */}
      <View className="mt-6 px-4 mx-2">
        {menuItems.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between border-b border-gray-200 py-4"
          >
            <View className="flex-1 pr-2">
              <Text className="text-lg font-semibold">
                {item.name}
              </Text>
              <Text className="text-gray-500 text-sm">
                {item.desc}
              </Text>
              <Text className="text-black font-bold mt-2">
                {item.price}
              </Text>
            </View>
            <Image
              source={item.image}
              className="w-16 h-16 rounded-lg"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
