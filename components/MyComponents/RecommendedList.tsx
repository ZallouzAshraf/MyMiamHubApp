import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./Style/styles";

interface RecommendedItem {
  name: string;
  price: string;
  rating: number;
  img: string;
}

interface RecommendedListProps {
  recommendedcategories: RecommendedItem[];
  imagesrecommended: { [key: string]: ImageSourcePropType };
}

const RecommendedList: React.FC<RecommendedListProps> = ({
  recommendedcategories,
  imagesrecommended,
}) => (
  <View style={styles.recommendedList}>
    {recommendedcategories.map((item, index) => (
      <View key={index} style={styles.recommendedItem}>
        <Image
          source={imagesrecommended[item.img.toLowerCase()]}
          style={styles.foodImage}
        />
        <View style={styles.foodDetails}>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodPrice}>{item.price}</Text>
          <View style={styles.rating}>
            <FontAwesome name="star" size={16} color="#fcb823" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    ))}
  </View>
);

export default RecommendedList;
