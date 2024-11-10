import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import RestaurantCard from "./RestaurantCard";
import { db } from "../../Config/FirebaseHelper";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

type RootStackParamList = {
  NosRestaurant: undefined;
  RestaurantDetails: { restaurantId: string };
};

interface Restaurant {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  rating: number;
}

const getRandomRating = () => parseFloat((Math.random() * 2 + 3).toFixed(1));

const NosRestaurant: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "restaurants"),
      (snapshot) => {
        const updatedRestaurants: Restaurant[] = [];

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const { nom, adresse, imageUrl, Status } = data;
          let rating = data.rating;

          if (Status === true) {
            if (!rating) {
              rating = getRandomRating();
              updateDoc(doc(db, "restaurants", docSnap.id), { rating });
            }

            updatedRestaurants.push({
              id: docSnap.id,
              name: nom,
              address: adresse,
              imageUrl: imageUrl,
              rating: rating,
            });
          }
        });

        setRestaurants(updatedRestaurants);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleRestaurantPress = (restaurantId: string) => {
    navigation.navigate("RestaurantDetails", { restaurantId });
  };

  return (
    <ScrollView>
      {restaurants.map((restaurant) => (
        <TouchableOpacity
          key={restaurant.id}
          onPress={() =>
            navigation.navigate("RestaurantDetails", {
              restaurantId: restaurant.id,
            })
          }
        >
          <RestaurantCard
            name={restaurant.name}
            address={restaurant.address}
            image={{ uri: restaurant.imageUrl }}
            rating={restaurant.rating}
            onPress={() => handleRestaurantPress(restaurant.id)}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default NosRestaurant;
