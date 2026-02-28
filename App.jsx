import { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Camera from './pages/Camera';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';

const PAGES = {
  home:      Home,
  camera:    Camera,
  favorites: Favorites,
  settings:  Settings,
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const safeAreaInsets = useSafeAreaInsets();
  const Page = PAGES[activeTab];

  return (
    <View style={[styles.container, { paddingBottom: safeAreaInsets.bottom }]}>
      <View style={styles.content}>
        <Page />
      </View>
      <Navbar activeTab={activeTab} onNavigate={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;
