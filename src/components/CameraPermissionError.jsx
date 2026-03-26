import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ACCENT = '#C76649';

export default function CameraPermissionError({ onRetry }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.icon}>📷</Text>

        <Text style={styles.title}>
          Camera access needed
        </Text>

        <Text style={styles.message}>
          Please allow camera permission to scan ingredients.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  card: {
    width: '100%',
    backgroundColor: '#F6EDE9',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: 'center',
  },

  icon: {
    fontSize: 42,
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },

  message: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: ACCENT,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

});