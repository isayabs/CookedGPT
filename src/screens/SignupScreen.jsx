import { View, Image } from 'react-native';
import styles from '../styles/LoginScreen.styles';
import SignUpForm from '../components/SignUpForm';
export default function SignUpScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/LogoText.png')}
        style={styles.imageTitle}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/LogoIcon.png')}
        style={styles.imageStyle}
        resizeMode="contain"
      />
      <SignUpForm navigation={navigation} />
    </View>
  );
}
