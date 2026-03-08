import { View, Pressable, Text, TextInput, Alert } from 'react-native';
import styles from '../styles/LoginSignUpScreen.styles';
export default function SignUpForm() {
  const handleSignUp = () => {};
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
    <View>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        validateEmail={validateEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        validatePassword={validatePassword}
      />
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Text style={styles.label}>Already have an account?</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}
