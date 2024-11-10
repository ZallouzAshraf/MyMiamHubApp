import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface RestaurantCardProps {
  name: string;
  address: string;
  image: ImageSourcePropType;
  rating: number;
  onPress: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  address,
  image,
  rating,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.rating}>
          <FontAwesome name="star" size={16} color="#fcb823" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    margin: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#fcb823",
    overflow: "hidden",
    height: 110,
  },
  image: {
    width: 120,
    height: "100%",
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    backgroundColor: "#fffaf4",
    gap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  address: {
    fontSize: 14,
    color: "#777",
  },
  rating: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { marginLeft: 4, color: "#fcb823" },
});

export default RestaurantCard;
