import { View, Pressable, Text, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import styles from '../styles/LoginScreen.styles';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

export default function SignUpForm({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password) {
    const hasLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return hasLength && hasLetter && hasNumber;
  }

  const isPasswordValid = validatePassword(form.password);

  const isFormValid =
    validateEmail(form.email) &&
    isPasswordValid &&
    form.password === form.confirmPassword;

  const handleSignUp = async () => {
    if (!validateEmail(form.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(form.password)) {
      Alert.alert(
        'Invalid Password',
        'Password must contain at least 8 characters, one letter and one number.',
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      console.log('User:', userCredential.user);

      Alert.alert('Success', 'Account created!');

      // Reset the form after successful signup
      setForm({
        email: '',
        password: '',
        confirmPassword: '',
      });

      navigation.navigate('Login', {
        email: form.email,
        password: form.password,
      });
    } catch (error) {
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={styles.placeholderTextColor}
        value={form.email}
        onChangeText={text => updateField('email', text)}
      />

      <Text style={styles.label}>Password</Text>

      <View style={{ position: 'relative' }}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor={styles.placeholderTextColor}
          secureTextEntry={!showPassword}
          value={form.password}
          onChangeText={text => updateField('password', text)}
        />

        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
          />
        </Pressable>
      </View>

      {!isPasswordValid && form.password?.length > 0 && (
        <Text style={{ color: 'red', marginTop: 5 }}>
          Password must contain 8 characters, one letter and one number
        </Text>
      )}

      {isPasswordValid && (
        <>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor={styles.placeholderTextColor}
              secureTextEntry={!showConfirmPassword} // use showConfirmPassword
              value={form.confirmPassword}
              onChangeText={text => updateField('confirmPassword', text)}
            />

            <Pressable
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'} // use showConfirmPassword
                size={24}
                color="gray"
              />
            </Pressable>
          </View>

          {/* Real-time passwords mismatch message */}
          {form.confirmPassword?.length > 0 &&
            form.password !== form.confirmPassword && (
              <Text style={{ color: 'red', marginTop: 5 }}>
                Passwords do not match
              </Text>
            )}
        </>
      )}

      <Pressable
        style={[styles.button, !isFormValid && { opacity: 0.5 }]}
        disabled={!isFormValid}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <View style={styles.signUpContainer}>
        <Text style={styles.label}>Already have an account?</Text>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
