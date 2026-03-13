import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function Row({ label, value, onPress, showArrow = true, danger = false }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
      <View style={styles.rowRight}>
        {value !== undefined && <Text style={styles.rowValue}>{value}</Text>}
        {showArrow && <Text style={styles.rowArrow}>›</Text>}
      </View>
    </TouchableOpacity>
  );
}

function ToggleRow({ label, value, onToggle }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#ddd', true: '#C76649' }}
        thumbColor="#fff"
      />
    </View>
  );
}

export default function Settings({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [metricUnits, setMetricUnits] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

      <Section title="Account">
        <Row label="Edit Profile" />
        <Row label="Change Password" />
        <Row label="Linked Accounts" />
      </Section>

      <Section title="Preferences">
        <ToggleRow label="Push Notifications" value={notifications} onToggle={setNotifications} />
        <ToggleRow label="Dark Mode" value={darkMode} onToggle={setDarkMode} />
        <ToggleRow label="Metric Units" value={metricUnits} onToggle={setMetricUnits} />
        <Row label="Dietary Preferences" value="None" />
        <Row label="Cuisine Interests" value="All" />
      </Section>

      <Section title="About">
        <Row label="Privacy Policy" />
        <Row label="Terms of Service" />
        <Row label="Version" value="0.0.1" showArrow={false} />
      </Section>

      <Section title="">
        <Row label="Sign Out" showArrow={false} danger onPress={handleLogout} />
      </Section>

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
    paddingVertical: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginHorizontal: 16,
  },
  sectionBody: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowLabel: {
    fontSize: 15,
    color: '#222',
  },
  rowLabelDanger: {
    color: '#e53935',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rowValue: {
    fontSize: 14,
    color: '#aaa',
  },
  rowArrow: {
    fontSize: 20,
    color: '#ccc',
  },
});