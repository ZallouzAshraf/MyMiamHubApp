import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  password: string;
  uid: string;
}

export default function Profil() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [userData, setUserData] = useState<UserData | null>(null);

  // Function to retrieve user data from AsyncStorage
  const retrieveUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      if (jsonValue) {
        const user: UserData = JSON.parse(jsonValue);
        setUserData(user); // Update state with user data
      } else {
        console.log("No user data found.");
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useEffect(() => {
    retrieveUserData(); // Retrieve data when component mounts
  }, []);

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      console.log("User signed out");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/profilbackground.jpg")}
      style={styles.container}
    >
      <View>
        <Image
          source={require("../../assets/images/userprofil.png")}
          style={styles.profileimage}
        />
      </View>
      <View style={styles.profileCard}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>First Name :</Text>
          <Text style={styles.value}>{userData?.firstName}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Last Name :</Text>
          <Text style={styles.value}>{userData?.lastName}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email :</Text>
          <Text style={styles.value}>{userData?.email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Mot de passe :</Text>
          <Text style={styles.value}>{userData?.password}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Téléphone :</Text>
          <Text style={styles.value}>{userData?.telephone}</Text>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
  },
  profileCard: {
    width: "97%",
    height: 420,
    borderRadius: 12,
    padding: 22,
    marginLeft: 25,
    marginTop: 35,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 7,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: "#000",
    fontWeight: "600",
  },
  value: {
    flex: 1.5,
    fontSize: 15,
    color: "#fff",
    width: 10,
    fontWeight: "700",
    textAlign: "center",
  },
  signOutButton: {
    width: 130,
    alignSelf: "center",
    marginTop: 80,
    left: 100,
    backgroundColor: "#850000",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signOutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  profileimage: {
    width: 150,
    height: 150,
    marginTop: -10,
    marginLeft: 40,
  },

  logoandtext: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  aurevoir: {
    width: 150,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 15,
  },
});
