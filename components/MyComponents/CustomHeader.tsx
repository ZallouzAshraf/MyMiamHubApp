import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

type typetitle = {
  title: String;
};
export default function CustomHeader({ title }: typetitle) {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 55,
    paddingBottom: 10,
    backgroundColor: "#000",
  },
  backButton: {
    position: "absolute",
    left: 12,
    bottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
});
