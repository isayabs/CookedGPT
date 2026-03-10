import { View, Image } from 'react-native';
import styles from '../styles/LoginSignUpScreen.styles';
import SignUpForm from '../components/SignUpForm';
export default function SignUpScreen() {
  return (
    <View style={styles.frame}>
      <Image
        source={require('../assets/images/login_title.png')}
        style={styles.imageTitle}
      />
      <Image
        source={require('../assets/images/login_image.png')}
        style={styles.imageStyle}
      />
      <SignUpForm />
    </View>
  );
}
