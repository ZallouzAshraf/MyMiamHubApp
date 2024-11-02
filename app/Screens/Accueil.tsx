import React from "react";
import { View, Text, ScrollView, ImageSourcePropType } from "react-native";
import { SearchBar } from "react-native-screens";
import Banner from "@/components/MyComponents/Banner";
import CategoryCarousel from "@/components/MyComponents/CategoryCarousel";
import styles from "@/components/MyComponents/Style/styles";
import RecommendedList from "@/components/MyComponents/RecommendedList";
import NosRestaurant from "@/components/MyComponents/NosRestaurant";
import Header from "@/components/MyComponents/Header";

const images: { [key: string]: ImageSourcePropType } = {
  pâtes: require("../../assets/images/Foods/pate.jpg"),
  pizza: require("../../assets/images/Foods/pizza.jpg"),
  burgers: require("../../assets/images/Foods/burger.jpg"),
  sandwichs: require("../../assets/images/Foods/sandwich.jpg"),
  tacos: require("../../assets/images/Foods/tacos.jpg"),
};

const imagesrecommended: { [key: string]: ImageSourcePropType } = {
  baguettefarcie: require("../../assets/images/Foods/baguettefarcie.jpg"),
  spaghetti: require("../../assets/images/Foods/spaghetti.jpg"),
};

export default function Accueil() {
  const categories: string[] = [
    "Pâtes",
    "Pizza",
    "Burgers",
    "Sandwichs",
    "Tacos",
  ];
  const recommendedcategories: Array<{
    name: string;
    price: string;
    rating: number;
    img: string;
  }> = [
    {
      name: "Baguette Farcie",
      price: "9.5 dt",
      rating: 4.5,
      img: "baguettefarcie",
    },
    {
      name: "Spaghetti Fruits de mer",
      price: "16 dt",
      rating: 4.7,
      img: "spaghetti",
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <Header />
      <SearchBar />
      <Banner />
      <CategoryCarousel categories={categories} images={images} />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <RecommendedList
        recommendedcategories={recommendedcategories}
        imagesrecommended={imagesrecommended}
      />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Our Restaurants</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <NosRestaurant />
    </ScrollView>
  );
}
