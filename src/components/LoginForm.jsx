import { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import styles from '../styles/LoginScreen.styles';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';


export default function LoginForm({ navigation }) {
  //stuf
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!validateEmail(email)) return;
    if (!validatePassword(password)) return;

    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("Logged in:", user);

      Alert.alert("Success", "Logged in successfully!");

      navigation.replace("MainApp");
    } catch (error) {
      // codes from https://firebase.google.com/docs/auth/admin/errors
      const code = error?.code ?? '';
      let friendly = 'Login failed. Please try again.';
      switch (code) {
        case 'auth/invalid-credential':
          friendly = 'Invalid credentials. please try again.';
          break;
        case 'auth/user-not-found':
          friendly = "No account found with that email.";
          break;
        case 'auth/invalid-email':
          friendly = 'That email address is invalid.';
          break;
        case 'auth/too-many-requests':
          friendly = 'Too many attempts. Try again later.';
          break;
      }

      console.error(code, error);
      setError(friendly);
      Alert.alert('Login Error', friendly);
    }
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Alert.alert(
        'Invalid Email',
        'Please enter a valid email address.',
      );
    }
    return emailRegex.test(email);
  }
  function validatePassword(password) {
    if (password.length < 8) {
      return Alert.alert(
        'Invalid Password',
        'Password must be at least 8 characters long.',
      );
    }
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) &&
      password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ? true
      : Alert.alert(
          'Invalid Password',
          'Password must contain at least one letter and one number.',
        );
  }
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={styles.placeholderTextColor}
        validateEmail={validateEmail}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={styles.placeholderTextColor}
        secureTextEntry
        validatePassword={validatePassword}
        onChangeText={setPassword}
      />
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <View style={styles.signUpContainer}>
        <Text style={styles.legendText}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
