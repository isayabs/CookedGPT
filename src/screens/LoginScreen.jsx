import { View, Image } from 'react-native';
import LoginForm from '../components/LoginForm';
import styles from '../styles/LoginScreen.styles';

export default function LoginScreen({ navigation }) {
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
      <LoginForm navigation={navigation} />
    </View>
  );
}
