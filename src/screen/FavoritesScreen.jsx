import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ListCard } from '../components/home-screen/ListCard';

export default function Favorites({
  favorites,
  onOpenRecipe,
  toggleFavorite,
  isFavorited,
}) {
  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>{'🤍' + '\u300A'}</Text>
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptySubtitle}>
          Tap the heart on any recipe to save it here.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>
        Favorite Recipes ({favorites.length})
      </Text>
      {favorites.map(fav => (
        <ListCard
          key={`${fav.source}-${fav.id}`}
          item={fav}
          onPress={onOpenRecipe}
          toggleFavorite={toggleFavorite}
          isFavorited={isFavorited(fav.id, fav.source)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { paddingBottom: 24 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 16,
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
    alignSelf: 'center',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineWidth: 20,
  },
});
