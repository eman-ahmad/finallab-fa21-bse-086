import React, { useState ,useContext} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ImageBackground, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RoleContext } from '../provider/RoleContext';


const { width, height } = Dimensions.get('window');

export default function BuyerSignupScreen() {
  const navigation = useNavigation();
  const { setParentEmail } = useContext(RoleContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinuePress = async () => {
    if (validateInputs()) {
      console.log("Validated inputs:", { name, email, password });

      try {
        // Send a POST request to the backend
        const response = await fetch("http://localhost:5000/api/buyer/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }), // Send form data
        });

        const data = await response.json(); // Parse the JSON response
        console.log("Backend response:", data);

        if (response.ok) {
          setParentEmail(email); 
          // Registration successful
          Alert.alert(
            "Success",
            "Registration successful! Please check your email for a 5-digit verification code."
          );
          navigation.navigate("EmailVerification"); // Navigate to the next screen
        } else if (response.status === 400) {
          // Handle email already exists error
          Alert.alert("Error", data.message || "Email already exists.");
        } else {
          // Handle other errors
          Alert.alert("Error", data.message || "Something went wrong.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        Alert.alert("Error", "Network error. Please try again later.");
      }
    } else {
      console.log("Validation failed:", errors);
    }
  };


  return (
    <ImageBackground
      source={require('../../assets/images/map.jpeg')}
      style={styles.background}>
      <View style={styles.container}>
      

        <View style={styles.animationContainer}>
          
          <Image
            source={require('../../assets/images/buyer.png')} // Replace with your actual image path
            style={styles.childImage}
          />
          <View style={styles.speechBubble}>
            <View style={styles.speechBubbleArrow} />
            <Text style={styles.speechText}>Welcome Back!</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#717d7e"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#717d7e"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#717d7e"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity onPress={handleContinuePress} style={styles.button}>
            <Text style={styles.buttonText}>SIGNUP</Text>
          </TouchableOpacity>

          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.navigate('BuyerLogin')} // Ensure correct screen name
            >
              Login
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
  // lottie: {
  //   width: "100%",
  //   height: "100%",
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
