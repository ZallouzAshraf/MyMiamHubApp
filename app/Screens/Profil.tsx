import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";

// Type pour les informations utilisateur
type User = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  telephone: string;
};

export default function Profil() {
  const navigation = useNavigation<NavigationProp<any>>();

  const user: User = {
    nom: "Zalouz",
    prenom: "Ashraf",
    email: "zallouzashraf@gmail.com",
    password: "123456",
    telephone: "+2162222222",
  };

  const handleSignOut = () => {
    console.log("User signed out");
    navigation.navigate("Login");
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
          <Text style={styles.value}>{user.prenom}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Last Name :</Text>
          <Text style={styles.value}>{user.nom}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email :</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Mot de passe :</Text>
          <Text style={styles.value}>{user.password}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Téléphone :</Text>
          <Text style={styles.value}>{user.telephone}</Text>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoandtext}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />
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
    paddingHorizontal: 15,
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
    flex: 2,
    fontSize: 15,
    color: "#fff",
    fontWeight: "700",
  },
  signOutButton: {
    width: 200,
    alignSelf: "center",
    marginTop: 30,
    backgroundColor: "#ce0000",
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
  logo: {
    width: 120,
    height: 120,
    marginTop: 40,
    marginRight: 58,
    borderWidth: 1,
    borderRadius: 100,
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
