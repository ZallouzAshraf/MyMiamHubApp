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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseApp } from "../../Config/FirebaseHelper";

export default function Register() {
  const [getFirstName, setFirstName] = useState<string>("");
  const [getLastName, setLastName] = useState<string>("");
  const [getTelephone, setTelephone] = useState<string>("");
  const [getEmailId, setEmailId] = useState<string>("");
  const [getPassword, setPassword] = useState<string>("");
  const [getError, setError] = useState<boolean>(false);
  const [getDisabled, setDisabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [firstnameError, setFirstnameError] = useState<string>("");
  const [lastnameError, setLastnameError] = useState<string>("");
  const [telephoneError, setTelephoneError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordFocused, setPasswordFocused] = useState<boolean>(false);
  const [isEmailFocused, setEmailFocused] = useState<boolean>(false);
  const [isTelephoneFocused, setTelephoneFocused] = useState<boolean>(false);
  const [isLastnameFocused, setLastnameFocused] = useState<boolean>(false);
  const [isFirstnameFocused, setFirstnameFocused] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<any>>();

  const registerFunction = async (): Promise<void> => {
    setDisabled(true);
    setLoading(true);

    setFirstnameError("");
    setLastnameError("");
    setTelephoneError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (getEmailId === "") {
      isValid = false;
    }
    if (getFirstName === "") {
      isValid = false;
    }
    if (getLastName === "") {
      isValid = false;
    }
    if (getTelephone === "") {
      isValid = false;
    }
    if (getPassword === "") {
      isValid = false;
    }

    if (!isValid) {
      setDisabled(false);
      setLoading(false);
      return;
    }

    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
      await createUserWithEmailAndPassword(auth, getEmailId, getPassword);
      console.log("User registered");
      navigation.navigate("SplashScreenRegister");
    } catch (error: any) {
      setError(true);
      setDisabled(false);
      setLoading(false);

      if (error.code === "auth/email-already-in-use") {
        setEmailError(
          "This email is already in use. Please use a different email."
        );
      } else {
        setEmailError("An error occurred during registration.");
      }
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
    setShowConfirmPassword(!showConfirmPassword);
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
          style={[
            styles.inputContainer,
            isFirstnameFocused && styles.inputFocused,
            firstnameError ? { borderColor: "#de3138" } : {},
          ]}
        >
          <TextInput
            placeholder="First Name"
            style={styles.input}
            placeholderTextColor="#8a8a8a"
            value={getFirstName}
            onChangeText={(value: string) => {
              setFirstName(value);
              if (value === "") {
                setFirstnameError("First Name is Required");
              } else {
                setFirstnameError("");
              }
            }}
            onFocus={() => setFirstnameFocused(true)}
            onBlur={() => setFirstnameFocused(false)}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            isLastnameFocused && styles.inputFocused,
            lastnameError ? { borderColor: "#de3138" } : {},
          ]}
        >
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            placeholderTextColor="#8a8a8a"
            value={getLastName}
            onChangeText={(value: string) => {
              setLastName(value);
              if (value === "") {
                setLastnameError("Last Name is Required");
              } else {
                setLastnameError("");
              }
            }}
            onFocus={() => setLastnameFocused(true)}
            onBlur={() => setLastnameFocused(false)}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            isTelephoneFocused && styles.inputFocused,
            telephoneError ? { borderColor: "#de3138" } : {},
          ]}
        >
          <TextInput
            placeholder="Telephone"
            style={styles.input}
            keyboardType="phone-pad"
            placeholderTextColor="#8a8a8a"
            value={getTelephone}
            onChangeText={(value: string) => {
              setTelephone(value);
              if (value === "") {
                setTelephoneError("Telephone is Required");
              } else {
                setTelephoneError("");
              }
            }}
            onFocus={() => setTelephoneFocused(true)}
            onBlur={() => setTelephoneFocused(false)}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            isEmailFocused && styles.inputFocused,
            emailError ? { borderColor: "#de3138" } : {},
          ]}
        >
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#8a8a8a"
            value={getEmailId}
            onChangeText={(value: string) => {
              setEmailId(value);
              if (value === "") {
                setEmailError("Email is Required");
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
            passwordError ? { borderColor: "#de3138" } : {},
          ]}
        >
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            placeholderTextColor="#8a8a8a"
            value={getPassword}
            onChangeText={(value: string) => {
              setPassword(value);
              if (value === "") {
                setPasswordError("Password is Required");
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

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={registerFunction}
          disabled={getDisabled}
        >
          <Text style={styles.registerBtnText}>REGISTER</Text>
        </TouchableOpacity>
        <Text style={styles.createAccount}>
          Already have an account?
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginHere}>Login Here!</Text>
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
  picker: {
    color: "#fff",
    paddingLeft: 20,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  errorText: {
    color: "#de3138",
    fontSize: 12,
    marginLeft: 10,
    marginRight: 80,
    marginBottom: 12,
    textAlign: "center",
    alignSelf: "flex-start",
    paddingLeft: 60,
  },
  registerBtn: {
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
  registerBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccount: {
    color: "white",
    width: 200,
    textAlign: "center",
  },
  loginHere: {
    color: "#c29700",
    marginTop: 6,
  },
  myLogo: {
    width: 200,
    height: 180,
    marginBottom: 20,
  },
});
