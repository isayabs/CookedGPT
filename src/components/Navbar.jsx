import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TABS = [
  { key: 'home',      label: 'Home',      icon: '⌂' },
  { key: 'favorites', label: 'Favorites', icon: '♡' },
  { key: 'camera',    label: 'Camera',    icon: '⊙' },
  { key: 'settings',  label: 'Settings',  icon: '⚙' },
];

export default function Navbar({ activeTab, onNavigate }) {
  return (
    <View style={styles.container}>
      {TABS.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onNavigate(tab.key)}
          activeOpacity={0.7}
        >
          <Text style={[styles.icon, activeTab === tab.key && styles.activeIcon]}>
            {tab.icon}
          </Text>
          <Text style={[styles.label, activeTab === tab.key && styles.activeLabel]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#C76649',
    height: 55,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  activeIcon: {
    color: '#fff',
    fontWeight: '900',
  },
  label: {
    fontSize: 11,
    color: '#fff',
  },
  activeLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});
