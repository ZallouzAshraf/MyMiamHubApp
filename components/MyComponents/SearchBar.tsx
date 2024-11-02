// Search.tsx
import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./Style/styles";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search food, drink, desserts"
      placeholderTextColor="#aaa"
    />
    <TouchableOpacity style={styles.searchButton}>
      <Ionicons name="search" size={20} color="white" />
    </TouchableOpacity>
  </View>
);

export default SearchBar;
