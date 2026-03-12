import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ALL_RECIPES } from '../data/index';

export default function Recipe({ recipeId, isFavorited, onToggleFavorite }) {
  const recipe = ALL_RECIPES.find(r => r.id === recipeId);

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Placeholder */}
      <View style={styles.imagePlaceholder} />

      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.category}>{recipe.category}</Text>
        </View>
        <TouchableOpacity onPress={() => onToggleFavorite(recipe.id)} style={styles.favoriteBtn} activeOpacity={0.7}>
          <Text style={styles.favoriteIcon}>{isFavorited ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Meta */}
      <View style={styles.metaRow}>
        <View style={styles.metaChip}>
          <Text style={styles.metaIcon}>⏱</Text>
          <Text style={styles.metaText}>{recipe.time}</Text>
        </View>
        <View style={styles.metaChip}>
          <Text style={styles.metaIcon}>🔥</Text>
          <Text style={styles.metaText}>{recipe.calories} cal</Text>
        </View>
      </View>

      {/* Ingredients */}
      <Text style={styles.sectionTitle}>Ingredients</Text>
      <View style={styles.ingredientsWrap}>
        {recipe.ingredients.map(ingredient => (
          <View key={ingredient} style={styles.ingredientChip}>
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </View>
        ))}
      </View>
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
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#aaa',
    fontSize: 16,
  },
  imagePlaceholder: {
    height: 220,
    backgroundColor: '#ddd',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },
  category: {
    fontSize: 13,
    color: ACCENT,
    fontWeight: '600',
  },
  favoriteBtn: {
    paddingTop: 4,
  },
  favoriteIcon: {
    fontSize: 28,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  metaIcon: {
    fontSize: 14,
  },
  metaText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  ingredientsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  ingredientChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  ingredientText: {
    fontSize: 13,
    color: '#333',
  },
});
