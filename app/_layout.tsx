import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Screens/Login" />
      <Stack.Screen name="Screens/Register" />
      <Stack.Screen name="Screens/Accueil" />
      <Stack.Screen name="Screens/Profil" />
    </Stack>
  );
}
