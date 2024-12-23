import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ImageBackground, Alert,Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginPress = async () => {
    console.log("Login button pressed");

    // Check if email and password are provided
    if (!email || !password) {
      console.log("Missing email or password");
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Validate email format
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      console.log("Invalid email format:", email);
      Alert.alert("Error", "Invalid email format.");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      console.log("Password too short:", password);
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    try {
      console.log("Sending login request...");
      setIsLoading(true); // Show loader

      // API call to backend
      const response = await fetch("http://localhost:5000/api/buyer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response received. Status:", response.status);

      const data = await response.json(); // Parse JSON response
      console.log("Response data:", data);

      setIsLoading(false); // Stop loader

      if (response.ok) {
        // If login is successful
        console.log("Login successful. JWT Token:", data.token);
        Alert.alert("Success", data.message);

        // Store token (if needed) and navigate
        navigation.navigate("ParentDashboard", { token: data.token });
      } else if (response.status === 404) {
        // User not found - prompt to sign up
        console.log("Parent not found:", email);
        Alert.alert(
          "User Not Found",
          "No account associated with this email. Do you want to sign up?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Sign Up",
              onPress: () => navigation.navigate("BuyerSignup"),
            },
          ]
        );
      } else if (response.status === 400) {
        // Handle other errors like invalid credentials or unverified email
        console.log("Login failed. Backend message:", data.message);
        Alert.alert("Login Failed", data.message || "Invalid credentials.");
      } else {
        // Handle any other unexpected errors
        console.log("Unexpected error. Status:", response.status);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during login:", error);
      Alert.alert("Error", "Network error. Please check your connection.");
    }
  };


  return (
    <ImageBackground
      source={require('../../assets/images/map.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
    

        {/* Animation */}
        <View style={styles.animationContainer}>
          
            <Image
              source={require('../../assets/images/buyer.png')} // Replace with your actual image path
              style={styles.childImage}
            />
          {/* </View> */}
          <View style={styles.speechBubble}>
            <View style={styles.speechBubbleArrow} />
            <Text style={styles.speechText}>Welcome Back!</Text>
          </View>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#717d7e"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#717d7e"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Don't have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate("BuyerSignup")} // Navigate to signup page
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    elevation: 5, // Adds shadow for a floating effect
  },
  animationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  // lottieContainer: {
  //   width: width * 0.6,
  //   height: width * 0.8,
  // },
  childImage: {
    width: width * 0.6, // 40% of screen width for responsive design
    height: height * 0.3, // 25% of screen height
    resizeMode: 'contain', // Ensures the image maintains its aspect ratio
    marginTop: 10, // Add spacing from the top
  },
  speechBubble: {
    marginTop: -140,
    width: 150,
    marginLeft: -30,
    backgroundColor: "#90EE90", // Light green bubble
    padding: 15,
    borderRadius: 20,
    position: "relative",
  },
  speechBubbleArrow: {
    position: "absolute",
    bottom: -10,
    left: 20,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: "#90EE90",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: "transparent",
  },
  speechText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0C4D73",
    textAlign: "center",
  },
  formContainer: {
    width: '90%',
    maxWidth: 360,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
    shadowColor: '#000', // Subtle shadow for 3D effect
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Border for frosted effect
    backdropFilter: 'blur(10px)', // Creates the blur effect (Web only, use `BlurView` for native)
    overflow: 'hidden', // Prevents content from overflowing container edges
  },

  input: {
    width: "100%",
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ff6600",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 15,
    fontSize: 13,
    color: "#333",
  },
  loginLink: {
    color: "#0C4D73",
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});
