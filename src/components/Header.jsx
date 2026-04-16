import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({ activeTab, onNavigate, onBack }) {
  const insets = useSafeAreaInsets();

  if (activeTab === 'profile' || activeTab === 'recipe') {
    return (
      <View style={{ backgroundColor: '#C76649', paddingTop: insets.top }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              console.log('BACK PRESSED');
              onBack?.();
            }}
            activeOpacity={0.7}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            style={styles.backTouch}
          >
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: '#C76649', paddingTop: insets.top }}>
      <View style={styles.container}>
        <Image
          source={require('../../res/appIcon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity onPress={() => onNavigate('profile')}>
          <Image
            source={require('../../res/ProfileImage.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#C76649',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#b05540',
  },
  logo: {
    height: 40,
    width: 80,
  },
  profileImage: {
    height: 36,
    width: 36,
    borderRadius: 20,
  },
  backTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  backButton: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '600',
    lineHeight: 36,
  },
});