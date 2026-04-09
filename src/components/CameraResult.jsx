import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView,
} from 'react-native';

/**
 * Props:
 *  scanState        — 'scanning' | 'not_found' | 'found'
 *  foundIngredients — string[]  (populated when scanState === 'found')
 *  onClose          — () => void
 *  onAddIngredients — (selected: string[]) => void
 */
export default function CameraResult({ scanState, foundIngredients = [], onClose, onAddIngredients }) {
  const [selected, setSelected] = useState(() => new Set(foundIngredients));

  function toggleItem(item) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.sheet}>

        {/* ── Scanning ── */}
        {scanState === 'scanning' && (
          <View style={styles.centred}>
            <ActivityIndicator size="large" color={ACCENT} />
            <Text style={styles.scanningText}>Scanning ingredients…</Text>
          </View>
        )}

        {/* ── Not Found ── */}
        {scanState === 'not_found' && (
          <View style={styles.centred}>
            <Text style={styles.notFoundIcon}>🔍</Text>
            <Text style={styles.notFoundTitle}>Ingredient Not Found</Text>
            <Text style={styles.notFoundSub}>
              The AI couldn't identify any food ingredients. Try a clearer shot or better lighting.
            </Text>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Found ── */}
        {scanState === 'found' && (
          <>
            <View style={styles.header}>
              <Text style={styles.foundTitle}>Ingredients Found</Text>
              <TouchableOpacity onPress={onClose} style={styles.dismissBtn}>
                <Text style={styles.dismissText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.foundSub}>
              Tap to deselect any ingredients you don't want to add.
            </Text>

            <ScrollView contentContainerStyle={styles.chipsWrap} showsVerticalScrollIndicator={false}>
              {foundIngredients.map(item => {
                const active = selected.has(item);
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => toggleItem(item)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {active ? '✓ ' : ''}{item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={[styles.addBtn, selected.size === 0 && styles.addBtnDisabled]}
              disabled={selected.size === 0}
              onPress={() => onAddIngredients([...selected])}
              activeOpacity={0.8}
            >
              <Text style={styles.addBtnText}>
                Add {selected.size} Ingredient{selected.size !== 1 ? 's' : ''} to List
              </Text>
            </TouchableOpacity>
          </>
        )}

      </View>
    </View>
  );
}

const ACCENT = '#C76649';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
    minHeight: 240,
  },

  // Scanning & Not Found shared centred layout
  centred: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 12,
  },
  scanningText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
    marginTop: 8,
  },

  // Not Found
  notFoundIcon: {
    fontSize: 48,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  notFoundSub: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  closeBtn: {
    marginTop: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  closeBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },

  // Found
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  foundTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  dismissBtn: {
    padding: 4,
  },
  dismissText: {
    fontSize: 18,
    color: '#aaa',
  },
  foundSub: {
    fontSize: 13,
    color: '#999',
    marginBottom: 16,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 8,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  chipActive: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  chipText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#fff',
  },
  addBtn: {
    marginTop: 20,
    backgroundColor: ACCENT,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addBtnDisabled: {
    backgroundColor: '#ccc',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
