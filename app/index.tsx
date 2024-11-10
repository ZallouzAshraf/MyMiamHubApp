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
import RestaurantDetails from "./Screens/RestaurantDetails";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomHeaderLight from "@/components/MyComponents/CustomHeaderLight";
import Cart from "./Screens/Cart";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Profil: undefined;
  Accueil: undefined;
  Register: undefined;
  SplashScreenRegister: undefined;
  NosRestaurant: undefined;
  Cart: undefined;
  RestaurantDetails: { restaurantId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen
            name="Splash"
            component={SplashScreenComponent}
            options={{ headerShown: false }}
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
          <Stack.Screen
            name="RestaurantDetails"
            component={RestaurantDetails}
            options={{
              header: () => <CustomHeaderLight title="Restaurant Details" />,
            }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
              header: () => <CustomHeaderLight title="Cart" />,
            }}
          />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </>
  );
}
