import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navbar from './src/components/Navbar';
import Header from './src/components/Header';

import Home from './src/screen/HomeScreen';
import Camera from './src/screen/CameraScreen';
import Favorites from './src/screen/FavoritesScreen';
import Settings from './src/screen/SettingsScreen';
import Profile from './src/screen/ProfileScreen';
import Recipe from './src/screen/RecipeScreen';

import WelcomeScreen from './src/screen/WelcomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import SignUpScreen from './src/screen/SignUpScreen';

const Stack = createNativeStackNavigator();

const PAGES = {
  home: Home,
  camera: Camera,
  favorites: Favorites,
  settings: Settings,
  profile: Profile,
  recipe: Recipe,
};

// Pages that show a back button in the header instead of the normal logo bar
const BACK_PAGES = ['profile', 'recipe'];

function MainAppScreen({ navigation }) {
  return (
    <SafeAreaProvider>
      <AppContent navigation={navigation} />
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="MainApp" component={MainAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppContent({ navigation }) {
  const [activeTab, setActiveTab] = useState('home');
  const [prevTab, setPrevTab] = useState('home');
  const [navParams, setNavParams] = useState({});
  const [favorites, setFavorites] = useState([]); // [recipeId, ...] newest first
  const [recipeUsage, setRecipeUsage] = useState({}); // { recipeId: count }
  const [recentlyUsed, setRecentlyUsed] = useState([]); // [recipeId, ...] newest first

  const safeAreaInsets = useSafeAreaInsets();
  const Page = PAGES[activeTab];

  function navigate(tab, params = {}) {
    setPrevTab(activeTab);
    setNavParams(params);
    setActiveTab(tab);
  }

  function goBack() {
    setNavParams({});
    setActiveTab(prevTab);
  }

  function openRecipe(recipeId) {
    setRecipeUsage(prev => ({ ...prev, [recipeId]: (prev[recipeId] || 0) + 1 }));
    setRecentlyUsed(prev => [recipeId, ...prev.filter(id => id !== recipeId)].slice(0, 30));
    navigate('recipe', { recipeId });
  }

  function toggleFavorite(recipeId) {
    setFavorites(prev =>
      prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [recipeId, ...prev]
    );
  }

  const pageProps = {
    navigation,
    onOpenRecipe: openRecipe,
    ...(activeTab === 'recipe' && {
      recipeId: navParams.recipeId,
      isFavorited: favorites.includes(navParams.recipeId),
      onToggleFavorite: toggleFavorite,
    }),
    ...(activeTab === 'favorites' && {
      favorites,
      recipeUsage,
      recentlyUsed,
    }),
  };

  return (
    <View style={[styles.container, { paddingBottom: safeAreaInsets.bottom }]}>
      <Header activeTab={activeTab} onNavigate={navigate} onBack={goBack} />
      <View style={styles.content}>
        <Page {...pageProps} />
      </View>
      {!BACK_PAGES.includes(activeTab) && (
        <Navbar activeTab={activeTab} onNavigate={navigate} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C76649',
  },
  content: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
});

export default App;
