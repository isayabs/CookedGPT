import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator,
} from 'react-native';
import { ALL_INGREDIENTS, ALL_RECIPES } from '../../data/index';

const SUGGESTED = ALL_INGREDIENTS.slice(0, 12);
const RECENT    = ['Salmon', 'Broccoli', 'Rice', 'Soy Sauce', 'Ginger', 'Garlic', 'Chicken'];

export default function Camera({ onOpenRecipe }) {
  const [activeTab, setActiveTab] = useState('scan');
  const [flashOn, setFlashOn] = useState(false);
  const [yourIngredients, setYourIngredients] = useState([]);
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState(SUGGESTED);
  const [isSearching, setIsSearching] = useState(false);
  const [recipeResults, setRecipeResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const debounceTimer = useRef(null);

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
        <View style={styles.scanContainer}>
          {/* Viewfinder */}
          <View style={styles.viewfinder}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
            <Text style={styles.viewfinderHint}>Point camera at ingredients</Text>
          </View>

          {/* Controls */}
          <View style={styles.scanControls}>
            <TouchableOpacity style={styles.iconBtn}>
              <Text style={styles.iconBtnText}>🖼️</Text>
              <Text style={styles.iconBtnLabel}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureBtn}>
              <View style={styles.captureBtnInner} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn} onPress={() => setFlashOn(f => !f)}>
              <Text style={styles.iconBtnText}>{flashOn ? '⚡' : '🔦'}</Text>
              <Text style={styles.iconBtnLabel}>{flashOn ? 'Flash On' : 'Flash Off'}</Text>
            </TouchableOpacity>
          </View>
        </View>
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

const ACCENT = '#C76649';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: ACCENT,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  tabLabelActive: {
    color: ACCENT,
    fontWeight: '700',
  },

  // Scan tab
  scanContainer: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 32,
  },
  viewfinder: {
    width: '80%',
    aspectRatio: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cornerTL: { position: 'absolute', top: 0,    left: 0,  width: 30, height: 30, borderTopWidth: 3,    borderLeftWidth: 3,   borderColor: '#fff', borderRadius: 2 },
  cornerTR: { position: 'absolute', top: 0,    right: 0, width: 30, height: 30, borderTopWidth: 3,    borderRightWidth: 3,  borderColor: '#fff', borderRadius: 2 },
  cornerBL: { position: 'absolute', bottom: 0, left: 0,  width: 30, height: 30, borderBottomWidth: 3, borderLeftWidth: 3,   borderColor: '#fff', borderRadius: 2 },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderBottomWidth: 3, borderRightWidth: 3,  borderColor: '#fff', borderRadius: 2 },
  viewfinderHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  scanControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 32,
  },
  iconBtn: {
    alignItems: 'center',
  },
  iconBtnText: {
    fontSize: 28,
  },
  iconBtnLabel: {
    color: '#fff',
    fontSize: 11,
    marginTop: 4,
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
  },

  // Add tab
  addContainer: {
    flex: 1,
  },
  addContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginTop: 20,
    marginBottom: 10,
  },
  chipsRow: {
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 13,
    color: '#333',
  },
  chipPlus: {
    fontSize: 13,
    color: ACCENT,
    fontWeight: '700',
  },
  yourChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipSelected: {
    flexDirection: 'row',
    backgroundColor: ACCENT,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
  chipSelectedText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  chipRemove: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    height: 44,
    marginTop: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  clearBtn: {
    paddingLeft: 8,
  },
  clearBtnText: {
    fontSize: 14,
    color: '#aaa',
  },
  emptyHint: {
    color: '#aaa',
    fontSize: 13,
    fontStyle: 'italic',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
  },
  resultCategory: {
    fontSize: 11,
    color: ACCENT,
    fontWeight: '500',
    marginBottom: 6,
  },
  resultMeta: {
    flexDirection: 'row',
    gap: 10,
  },
  resultMetaText: {
    fontSize: 12,
    color: '#777',
  },
  findBtn: {
    marginTop: 32,
    backgroundColor: ACCENT,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  findBtnDisabled: {
    backgroundColor: '#ccc',
  },
  findBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
