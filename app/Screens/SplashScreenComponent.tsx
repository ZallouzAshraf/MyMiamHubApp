// SplashScreenComponent.tsx
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";

const SplashScreenComponent: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/lotties/splashanim.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  animation: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreenComponent;
