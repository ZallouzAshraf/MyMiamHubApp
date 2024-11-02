import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import styles from "./Style/styles";

interface CategoryCarouselProps {
  categories: string[];
  images: { [key: string]: ImageSourcePropType };
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  categories,
  images,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.categoryCarousel}
  >
    {categories.map((item, index) => (
      <TouchableOpacity key={index} style={styles.categoryItem}>
        <Image
          source={images[item.toLowerCase()]}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryText}>{item}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default CategoryCarousel;
