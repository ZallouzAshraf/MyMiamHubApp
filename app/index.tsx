// HomeScreen.tsx
import React from "react";
import SplashScreenComponent from "@/app/Screens/SplashScreenComponent";
import Login from "@/app/Screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "@/app/Screens/Register";
import { StatusBar } from "react-native";
import Accueil from "./Screens/Accueil";
import Profil from "./Screens/Profil";
import SplashScreenRegister from "./Screens/SplashScreenRegister";
import CustomHeader from "@/components/MyComponents/CustomHeader";

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreenComponent}
          options={{
            header: () => <CustomHeader title="" />,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            header: () => <CustomHeader title="Register" />,
          }}
        />
        <Stack.Screen
          name="SplashScreenRegister"
          component={SplashScreenRegister}
          options={{
            header: () => <CustomHeader title="Félécitations" />,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
