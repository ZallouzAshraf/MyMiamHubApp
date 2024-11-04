import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import LottieView from "lottie-react-native";

function SplashScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/lotties/welcome.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.congratulationsText}>Congratulations !</Text>
        <Text style={styles.successMessage}>
          Your registration was successful 🎉
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  congratulationsText: {
    fontSize: 28,
    top: -150,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 20,
    top: -150,
    color: "#FFFFFF",
    textAlign: "center",
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;
