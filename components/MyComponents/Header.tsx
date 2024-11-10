import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Style/styles";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Order Your Favorite Food!</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
        <EvilIcons name="user" size={45} color="#fcb823" />
      </TouchableOpacity>
      <Feather
        style={styles.carticon}
        name="shopping-cart"
        size={31}
        color="#fcb823"
        onPress={() => navigation.navigate("Cart")}
      />
    </View>
  );
}
