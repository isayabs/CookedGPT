import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export function RecipeCard({ item, onPress, toggleFavorite, isFavorited }) {
  return (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => onPress(item.id, item.source)}
      activeOpacity={0.75}
    >
      {/* Image */}
      {item.thumb ? (
        <Image source={{ uri: item.thumb }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardImagePlaceholder} />
      )}

      {/* Name + meta */}
      <Text style={styles.cardName} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.cardMeta}>
        {item.category ? (
          <Text style={styles.cardMetaText}>{item.category}</Text>
        ) : null}
        {item.area ? (
          <Text style={styles.cardMetaText}>{item.area}</Text>
        ) : null}
      </View>

      {/* Heart row at the bottom — flex, never clipped */}
      {toggleFavorite ? (
        <TouchableOpacity
          onPress={() =>
            toggleFavorite(item.id, item.source, {
              name: item.name,
              thumb: item.thumb,
              category: item.category,
              area: item.area,
            })
          }
          style={styles.heartRow}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          activeOpacity={0.7}
        >
          <Text style={styles.heartIcon}>
            {isFavorited ? '❤️' : '🤍' + '\u300A'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recipeCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 12,
    // No overflow:hidden on the card itself — only on the image
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    height: 100,
    width: '100%',
    backgroundColor: '#e0e0e0',
    // Clip only the image to the top corners
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImagePlaceholder: {
    height: 100,
    backgroundColor: '#e0e0e0',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222',
    marginTop: 8,
    marginHorizontal: 10,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 10,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  cardMetaText: {
    fontSize: 11,
    color: '#777',
  },
  heartRow: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 10,
  },
  heartIcon: {
    fontSize: 20,
  },
});
