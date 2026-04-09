// src/components/home-screen/ListCard.jsx

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ACCENT = '#C76649';

export function ListCard({ item, onPress, toggleFavorite, isFavorited }) {
  return (
    <TouchableOpacity
      style={styles.listCard}
      onPress={() => onPress(item.id, item.source)}
      activeOpacity={0.75}
    >
      {/* Thumbnail */}
      {item.thumb ? (
        <Image source={{ uri: item.thumb }} style={styles.listImage} />
      ) : (
        <View style={styles.listImagePlaceholder} />
      )}

      {/* Info */}
      <View style={styles.listInfo}>
        <Text style={styles.listName} numberOfLines={2}>
          {item.name}
        </Text>
        {item.category ? (
          <Text style={styles.categoryTag}>{item.category}</Text>
        ) : null}
        {item.area ? <Text style={styles.areaTag}>{item.area}</Text> : null}
      </View>

      {/* Heart — flex sibling, never clipped by overflow:hidden */}
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
          style={styles.heartBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
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
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  listImage: {
    width: 90,
    height: 90,
  },
  listImagePlaceholder: {
    width: 90,
    height: 90,
    backgroundColor: '#e0e0e0',
  },
  listInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  listName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  categoryTag: {
    fontSize: 11,
    color: ACCENT,
    fontWeight: '500',
    marginBottom: 2,
  },
  areaTag: {
    fontSize: 11,
    color: '#999',
  },
  heartBtn: {
    paddingHorizontal: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    fontSize: 22,
  },
});
