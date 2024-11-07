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

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView>
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          name={restaurant.name}
          address={restaurant.address}
          image={{ uri: restaurant.imageUrl }}
          rating={restaurant.rating}
        />
      ))}
    </ScrollView>
  );
};

export default NosRestaurant;
