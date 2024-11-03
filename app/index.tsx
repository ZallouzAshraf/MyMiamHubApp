// HomeScreen.tsx
import React from "react";
import SplashScreenComponent from "@/app/Screens/SplashScreenComponent";
import Login from "@/app/Screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "@/app/Screens/Register";
import { StatusBar } from "react-native";
import Accueil from "./Screens/Accueil";
import Profil from "./Screens/Profil";
import CustomHeader from "@/components/MyComponents/CustomHeader";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Splash" component={SplashScreenComponent} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: () => <CustomHeader title="Login" />,
          }}
        />
        <Stack.Screen
          name="Profil"
          component={Profil}
          options={{
            header: () => <CustomHeader title="Profil" />,
          }}
        />
        <Stack.Screen
          name="Accueil"
          component={Accueil}
          options={{
            header: () => <CustomHeader title="Accueil" />,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            header: () => <CustomHeader title="Register" />,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
