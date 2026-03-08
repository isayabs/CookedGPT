import { View, Text, Image, Pressable } from 'react-native';
import LoginForm from '../components/LoginForm';
import styles from '../styles/LoginSignUpScreen.style';

export default function LoginScreen() {
  return (
    <View style={styles.frame}>
      <Image
        source={require('../assets/LogoText.png')}
        style={styles.imageStyle}
      />
      <Image
        source={require('../assets/appIcon.png')}
        style={styles.imageTitle}
      />
      <LoginForm />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
      </Pressable>
    </View>
  );
}
