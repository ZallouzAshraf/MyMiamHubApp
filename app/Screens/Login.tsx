import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [getEmailId, setEmailId] = useState<string>("");
  const [getPassword, setPassword] = useState<string>("");
  const [getError, setError] = useState<boolean>(false);
  const [getDisabled, setDisabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordFocused, setPasswordFocused] = useState<boolean>(false);
  const [isEmailFocused, setEmailFocused] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<any>>();

  const loginFunction = async (): Promise<void> => {
    setDisabled(true);
    setLoading(true);

    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (getEmailId === "") {
      setEmailError("Email is Required");
      isValid = false;
    }
    if (getPassword === "") {
      setPasswordError("Password is Required");
      isValid = false;
    }

    if (isValid) {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, getEmailId, getPassword);
        navigation.navigate("Accueil");
      } catch (error: any) {
        if (error.code === "auth/user-not-found") {
          setEmailError("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          setPasswordError("Incorrect password.");
        } else {
          setEmailError("Check your email and password.");
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerK}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Image
          style={styles.myLogo}
          source={require("../../assets/images/logo.png")}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <View
          style={[styles.inputContainer, isEmailFocused && styles.inputFocused]}
        >
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#fff"
            value={getEmailId}
            onChangeText={(value: string) => {
              setEmailId(value);
              if (value === "") {
                setEmailError("Telephone is Required");
              } else {
                setEmailError("");
              }
            }}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            isPasswordFocused && styles.inputFocused,
          ]}
        >
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            placeholderTextColor="#fff"
            value={getPassword}
            onChangeText={(value: string) => {
              setPassword(value);
              if (value === "") {
                setPasswordError("Telephone is Required");
              } else {
                setPasswordError("");
              }
            }}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
            <MaterialCommunityIcons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotBtnText}>Forgot Password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={loginFunction}>
          <Text style={styles.loginBtnText}>
            {loading ? "Loading..." : "LOGIN"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.createAccount}>
          Don't have an account ?
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerHere}>Register Here !</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerK: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  inputFocused: {
    borderColor: "#dac366",
  },
  inputContainer: {
    position: "relative",
    width: "74%",
    height: 46,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#5e5530",
    borderRadius: 40,
  },
  input: {
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 20,
    paddingTop: 12,
    paddingVertical: 10,
    borderRadius: 40,
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  errorText: {
    color: "#de3138",
    fontSize: 12,
    marginBottom: 12,
    alignSelf: "flex-start",
    paddingLeft: 60,
  },
  loginBtn: {
    marginTop: 35,
    marginBottom: 15,
    backgroundColor: "#dac366",
    width: 205,
    height: 45,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loginBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotBtn: {
    marginTop: -10,
    width: 280,
    height: 20,
    justifyContent: "center",
  },
  forgotBtnText: {
    color: "#c29700",
    fontSize: 13,
    marginRight: 7,
    alignSelf: "flex-end",
    textDecorationLine: "none",
  },
  createAccount: {
    color: "white",
    width: 200,
    textAlign: "center",
  },
  registerHere: {
    color: "#c29700",
    marginTop: 6,
  },
  myLogo: {
    width: 200,
    height: 180,
    marginBottom: 20,
  },
});
