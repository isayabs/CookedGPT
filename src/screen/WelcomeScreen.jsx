import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Text Logo */}
      <Image
        source={require("../../assets/LogoText.png")}
        style={styles.textLogo}
        resizeMode="contain"
      />

      {/* Logo / Icon */}
      <Image
        source={require("../../assets/LogoIcon.png")}
        style={styles.iconLogo}
        resizeMode="contain"
      />

      {/* Tagline Text */}
      <Text style={styles.tagline}>
        Turn your ingredients into meals{"\n"}with AI powered suggestions
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.primaryText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.secondaryText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("MainApp")}>
        <Text style={styles.guest}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EFE6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  textLogo: {
    width: 260,
    height: 90,
    marginBottom: 10,
  },

  iconLogo: {
    width: 220,
    height: 220,
    marginBottom: 18,
  },

  tagline: {
    textAlign: "center",
    color: "#3E3E3E",
    marginBottom: 28,
    lineHeight: 20,
  },

  primaryBtn: {
    width: "90%",
    backgroundColor: "#C76743",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryText: {
    color: "white",
    fontWeight: "700",
  },

  secondaryBtn: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#C76743",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 14,
  },
  secondaryText: {
    color: "#C76743",
    fontWeight: "700",
  },

  guest: {
    color: "#B9B1A8",
    textDecorationLine: "underline",
  },
});
