import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ALL_RECIPES } from '../../data/index';

function RecipeCard({ recipe, onOpenRecipe }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onOpenRecipe(recipe.id)} activeOpacity={0.75}>
      <View style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>{recipe.name}</Text>
        <Text style={styles.cardCategory}>{recipe.category}</Text>
        <View style={styles.cardMeta}>
          <Text style={styles.cardMetaText}>⏱ {recipe.time}</Text>
          <Text style={styles.cardMetaText}>🔥 {recipe.calories} cal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Favorites({ favorites = [], recipeUsage = {}, recentlyUsed = [], onOpenRecipe }) {
  const recentlyAdded = favorites
    .map(id => ALL_RECIPES.find(r => r.id === id))
    .filter(Boolean);

  const mostUsed = Object.entries(recipeUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([id]) => ALL_RECIPES.find(r => r.id === id))
    .filter(Boolean);

  const recentlyUsedRecipes = recentlyUsed
    .map(id => ALL_RECIPES.find(r => r.id === id))
    .filter(Boolean);

  const isEmpty = recentlyAdded.length === 0 && mostUsed.length === 0 && recentlyUsedRecipes.length === 0;

  if (isEmpty) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🍽️</Text>
        <Text style={styles.emptyTitle}>Nothing here yet</Text>
        <Text style={styles.emptyHint}>Browse recipes and tap ❤️ to save your favourites.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      {recentlyAdded.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Recently Added</Text>
          {recentlyAdded.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onOpenRecipe={onOpenRecipe} />
          ))}
        </>
      )}

      {mostUsed.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Most Used</Text>
          {mostUsed.map(recipe => (
            <View key={recipe.id}>
              <RecipeCard recipe={recipe} onOpenRecipe={onOpenRecipe} />
              <Text style={styles.usageCount}>Opened {recipeUsage[recipe.id]} time{recipeUsage[recipe.id] > 1 ? 's' : ''}</Text>
            </View>
          ))}
        </>
      )}

      {recentlyUsedRecipes.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Recently Used</Text>
          {recentlyUsedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onOpenRecipe={onOpenRecipe} />
          ))}
        </>
      )}

    </ScrollView>
  );
}

const ACCENT = '#C76649';

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 20,
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardImage: {
    width: 90,
    height: 90,
    backgroundColor: '#e0e0e0',
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  cardCategory: {
    fontSize: 11,
    color: ACCENT,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#777',
  },
  usageCount: {
    fontSize: 11,
    color: '#aaa',
    marginTop: -6,
    marginBottom: 10,
    marginLeft: 4,
  },
});
