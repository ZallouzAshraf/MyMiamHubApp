// Banner.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./Style/styles";

const Banner = () => (
  <View style={styles.banner}>
    <View style={styles.bannerContent}>
      <Text style={styles.bannerText}>
        Grab Our Exclusive Food Discounts Now!
      </Text>
      <TouchableOpacity style={styles.bannerButton}>
        <Text style={styles.bannerButtonText}>Order Now</Text>
      </TouchableOpacity>
    </View>
    <Image
      source={require("../../assets/images/burgerAccueilbg.png")}
      style={styles.bannerImage}
    />
  </View>
);

export default Banner;
