import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ALL_RECIPES, TRENDING, LATEST, CATEGORIES } from '../data/index';

export default function Home({ onOpenRecipe }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (query.length <= 3) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    debounceTimer.current = setTimeout(() => {
      const q = query.toLowerCase();
      const results = ALL_RECIPES.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 2000);

    return () => clearTimeout(debounceTimer.current);
  }, [query]);

  const isSearchActive = query.length > 3;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={require('../res/barTop.png')} style={styles.banner} />

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {isSearchActive ? (
        <View>
          <Text style={styles.sectionTitle}>
            {isSearching ? 'Searching...' : `Results for "${query}"`}
          </Text>
          {isSearching ? (
            <ActivityIndicator size="large" color="#C76649" style={styles.spinner} />
          ) : searchResults.length === 0 ? (
            <Text style={styles.noResults}>No recipes found.</Text>
          ) : (
            searchResults.map(recipe => (
              <TouchableOpacity key={recipe.id} style={styles.latestCard} onPress={() => onOpenRecipe(recipe.id)} activeOpacity={0.75}>
                <View style={styles.latestImagePlaceholder} />
                <View style={styles.latestInfo}>
                  <Text style={styles.latestName}>{recipe.name}</Text>
                  <Text style={styles.categoryTag}>{recipe.category}</Text>
                  <View style={styles.cardMeta}>
                    <Text style={styles.cardMetaText}>⏱ {recipe.time}</Text>
                    <Text style={styles.cardMetaText}>🔥 {recipe.calories} cal</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Trending Recipes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {TRENDING.map(recipe => (
              <TouchableOpacity key={recipe.id} style={styles.recipeCard} onPress={() => onOpenRecipe(recipe.id)} activeOpacity={0.75}>
                <View style={styles.cardImagePlaceholder} />
                <Text style={styles.cardName}>{recipe.name}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>⏱ {recipe.time}</Text>
                  <Text style={styles.cardMetaText}>🔥 {recipe.calories} cal</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard} onPress={() => setQuery(cat.name)} activeOpacity={0.75}>
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Latest Recipes</Text>
          {LATEST.map(recipe => (
            <TouchableOpacity key={recipe.id} style={styles.latestCard} onPress={() => onOpenRecipe(recipe.id)} activeOpacity={0.75}>
              <View style={styles.latestImagePlaceholder} />
              <View style={styles.latestInfo}>
                <Text style={styles.latestName}>{recipe.name}</Text>
                <Text style={styles.categoryTag}>{recipe.category}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>⏱ {recipe.time}</Text>
                  <Text style={styles.cardMetaText}>🔥 {recipe.calories} cal</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    paddingBottom: 24,
  },
  banner: {
    height: 62,
    width: '100%',
  },
  searchBar: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  clearBtn: {
    paddingLeft: 8,
  },
  clearBtnText: {
    fontSize: 14,
    color: '#aaa',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  hScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  spinner: {
    marginTop: 40,
  },
  noResults: {
    marginHorizontal: 16,
    color: '#888',
    fontSize: 15,
  },

  recipeCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardImagePlaceholder: {
    height: 100,
    backgroundColor: '#e0e0e0',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginTop: 8,
    marginHorizontal: 10,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#777',
  },

  categoryCard: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 11,
    color: '#555',
    marginTop: 4,
    fontWeight: '500',
  },

  latestCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  latestImagePlaceholder: {
    width: 90,
    height: 90,
    backgroundColor: '#e0e0e0',
  },
  latestInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  latestName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  categoryTag: {
    fontSize: 11,
    color: '#C76649',
    fontWeight: '500',
    marginBottom: 4,
  },
});
