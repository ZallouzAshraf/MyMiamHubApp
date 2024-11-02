// RestaurantList.tsx
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import RestaurantCard from "./RestaurantCard";

const restaurants = [
  {
    name: "Bruschetta",
    address: "Av.Yasser Arafat, Sousse",
    image: require("../../assets/images/bruschetta.jpg"),
    rating: 4.3,
  },
  {
    name: "L’Aromate",
    address: "Sahloul, Sousse",
    image: require("../../assets/images/aromate.jpg"),
    rating: 4.6,
  },
  {
    name: "Invictus",
    address: "Khezama zone touristique, Sousse 4051",
    image: require("../../assets/images/invictus.jpg"),
    rating: 4.9,
  },
];

const NosRestaurant: React.FC = () => (
  <ScrollView>
    {restaurants.map((restaurant, index) => (
      <RestaurantCard
        key={index}
        name={restaurant.name}
        address={restaurant.address}
        image={restaurant.image}
        rating={restaurant.rating}
      />
    ))}
  </ScrollView>
);

export default NosRestaurant;
