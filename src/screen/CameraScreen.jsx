import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, PermissionsAndroid, Platform, Linking, AppState, Image } from 'react-native';
import { ALL_INGREDIENTS, ALL_RECIPES } from '../../data/index';
import CameraPermissionError from '../components/CameraPermissionError';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { styles, ACCENT } from '../styles/CameraScreen.styles';

const SUGGESTED = ALL_INGREDIENTS.slice(0, 12);
const RECENT    = ['Salmon', 'Broccoli', 'Rice', 'Soy Sauce', 'Ginger', 'Garlic', 'Chicken'];

export default function CameraScreen({ onOpenRecipe }) {
  const [activeTab, setActiveTab] = useState('scan');
  const [flashOn, setFlashOn] = useState(false);
  const [yourIngredients, setYourIngredients] = useState([]);
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState(SUGGESTED);
  const [isSearching, setIsSearching] = useState(false);
  const [recipeResults, setRecipeResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('unknown');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const debounceTimer = useRef(null);
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');
  console.log('Camera device:', device);

  async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Allow CookedGPT to scan ingredients using your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Allow',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraPermission('granted');
      } else {
        setCameraPermission('denied');
      }

    } catch (err) {
      console.warn('Camera permission error:', err?.message || err);
      setCameraPermission('denied');
    }
  }
}

function openAppSettings() {
  Linking.openSettings();
}

async function checkCameraPermission() {
  if (Platform.OS === 'android') {
    const isGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if (isGranted) {
      setCameraPermission('granted');
    } else {
      setCameraPermission('denied');
    }
  }
}

async function capturePhoto() {
  try {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      setCapturedPhoto(photo.path);
      console.log('Captured photo:', photo);
    }
  } catch (error) {
    console.log('Capture error:', error);
  }
}

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (ingredientQuery.length <= 3) {
      setFilteredIngredients(SUGGESTED);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    debounceTimer.current = setTimeout(() => {
      const q = ingredientQuery.toLowerCase();
      setFilteredIngredients(
        ALL_INGREDIENTS.filter(i => i.toLowerCase().includes(q))
      );
      setIsSearching(false);
    }, 2000);

    return () => clearTimeout(debounceTimer.current);
  }, [ingredientQuery]);

  useEffect(() => {
    if (activeTab === 'scan' && cameraPermission === 'unknown') {
      requestCameraPermission();
    }
  }, [activeTab, cameraPermission]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkCameraPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  function addIngredient(item) {
    if (!yourIngredients.includes(item)) {
      setYourIngredients(prev => [...prev, item]);
      setShowResults(false);
    }
  }

  function removeIngredient(item) {
    setYourIngredients(prev => prev.filter(i => i !== item));
    setShowResults(false);
  }

  function findRecipes() {
    const matches = ALL_RECIPES
      .map(r => ({
        ...r,
        matchCount: r.ingredients.filter(i => yourIngredients.includes(i)).length,
      }))
      .filter(r => r.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);
    setRecipeResults(matches);
    setShowResults(true);
  }

  function retakePhoto() {
    setCapturedPhoto(null);
  }

  function usePhoto() {
    console.log('Use photo:', capturedPhoto);
  }

  return (
    <View style={styles.screen}>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'scan' && styles.tabItemActive]}
          onPress={() => setActiveTab('scan')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabLabel, activeTab === 'scan' && styles.tabLabelActive]}>
            Scan Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'add' && styles.tabItemActive]}
          onPress={() => setActiveTab('add')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabLabel, activeTab === 'add' && styles.tabLabelActive]}>
            Add Ingredients
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Scan Ingredients Tab */}
      {activeTab === 'scan' && (
        cameraPermission === 'unknown' ? (
          <View style={styles.scanContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.viewfinderHint}>Requesting camera permission...</Text>
          </View>
        ) : cameraPermission === 'denied' ? (
          <CameraPermissionError onRetry={openAppSettings} />
        ) : (
          <View style={styles.scanContainer}>

            {/* Viewfinder */}
            <View style={styles.viewfinderWrap}>
              <View style={styles.viewfinder}>
                {capturedPhoto ? (
                  <Image
                    source={{ uri: `file://${capturedPhoto}` }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                ) : (
                  <>
                    {!device && cameraPermission === 'granted' && (
                      <Text style={{ color: '#fff' }}>Camera not available</Text>
                    )}

                    {device && cameraPermission === 'granted' && (
                      <Camera
                        ref={cameraRef}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={activeTab === 'scan' && cameraPermission === 'granted'}
                        photo={true}
                        onError={error => console.log('Camera error:', error)}
                      />
                    )}
                  </>
                )}
              </View>

              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
            </View>

            <View style={styles.messageArea}>
              <Text style={styles.viewfinderHint}>
                {capturedPhoto ? 'Review your photo' : 'Point camera at ingredients'}
              </Text>
            </View>

            {/* Controls */}
            <View style={styles.scanControls}>
              {capturedPhoto ? (
                <>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.iconBtn} onPress={retakePhoto}>
                      <Text style={styles.iconBtnText}>🔄</Text>
                      <Text style={styles.iconBtnLabel}>Retake</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.captureBtn} onPress={capturePhoto}>
                      <View style={styles.captureBtnInner} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.iconBtn} onPress={usePhoto}>
                      <Text style={styles.iconBtnText}>✔️</Text>
                      <Text style={styles.iconBtnLabel}>Use</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.iconBtn}>
                      <Text style={styles.iconBtnText}>🖼️</Text>
                      <Text style={styles.iconBtnLabel}>Gallery</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.captureBtn} onPress={capturePhoto}>
                      <View style={styles.captureBtnInner} />
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => setFlashOn(f => !f)}
                    >
                      <Text style={styles.iconBtnText}>{flashOn ? '⚡' : '🔦'}</Text>
                      <Text style={[styles.iconBtnLabel, { minWidth: 70, textAlign: 'center' }]}>
                        {flashOn ? 'Flash On' : 'Flash Off'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        )
      )}

      {/* Add Ingredients Tab */}
      {activeTab === 'add' && (
        <ScrollView style={styles.addContainer} contentContainerStyle={styles.addContent} showsVerticalScrollIndicator={false}>

          {/* Ingredient Search */}
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search ingredients..."
              placeholderTextColor="#999"
              value={ingredientQuery}
              onChangeText={setIngredientQuery}
              returnKeyType="search"
            />
            {ingredientQuery.length > 0 && (
              <TouchableOpacity onPress={() => setIngredientQuery('')} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Suggested Ingredients */}
          <Text style={styles.sectionTitle}>
            {ingredientQuery.length > 3 ? 'Search Results' : 'Suggested Ingredients'}
          </Text>
          {isSearching ? (
            <ActivityIndicator size="small" color={ACCENT} style={{ marginVertical: 8 }} />
          ) : filteredIngredients.length === 0 ? (
            <Text style={styles.emptyHint}>No ingredients found.</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
              {filteredIngredients.map(item => (
                <TouchableOpacity key={item} style={styles.chip} onPress={() => addIngredient(item)} activeOpacity={0.75}>
                  <Text style={styles.chipText}>{item}</Text>
                  <Text style={styles.chipPlus}> +</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Recent Ingredients */}
          <Text style={styles.sectionTitle}>Recent Ingredients</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {RECENT.map(item => (
              <TouchableOpacity key={item} style={styles.chip} onPress={() => addIngredient(item)} activeOpacity={0.75}>
                <Text style={styles.chipText}>{item}</Text>
                <Text style={styles.chipPlus}> +</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Your Ingredients */}
          <Text style={styles.sectionTitle}>Your Ingredients</Text>
          {yourIngredients.length === 0 ? (
            <Text style={styles.emptyHint}>Tap an ingredient above to add it here.</Text>
          ) : (
            <View style={styles.yourChipsWrap}>
              {yourIngredients.map(item => (
                <TouchableOpacity key={item} style={styles.chipSelected} onPress={() => removeIngredient(item)} activeOpacity={0.75}>
                  <Text style={styles.chipSelectedText}>{item}</Text>
                  <Text style={styles.chipRemove}> ✕</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Find Recipe Button */}
          <TouchableOpacity
            style={[styles.findBtn, yourIngredients.length === 0 && styles.findBtnDisabled]}
            disabled={yourIngredients.length === 0}
            onPress={findRecipes}
            activeOpacity={0.8}
          >
            <Text style={styles.findBtnText}>Find Recipe</Text>
          </TouchableOpacity>

          {/* Recipe Results */}
          {showResults && (
            <>
              <Text style={styles.sectionTitle}>
                {recipeResults.length === 0 ? 'No matching recipes' : `${recipeResults.length} Recipe${recipeResults.length > 1 ? 's' : ''} Found`}
              </Text>
              {recipeResults.map(recipe => (
                <TouchableOpacity key={recipe.id} style={styles.resultCard} onPress={() => onOpenRecipe(recipe.id)} activeOpacity={0.75}>
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultName}>{recipe.name}</Text>
                    <Text style={styles.resultCategory}>{recipe.category}</Text>
                    <View style={styles.resultMeta}>
                      <Text style={styles.resultMetaText}>⏱ {recipe.time}</Text>
                      <Text style={styles.resultMetaText}>🔥 {recipe.calories} cal</Text>
                      <Text style={styles.resultMetaText}>✅ {recipe.matchCount} match{recipe.matchCount > 1 ? 'es' : ''}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

        </ScrollView>
      )}
    </View>
  );
}
