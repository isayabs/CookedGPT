import { StyleSheet } from 'react-native';

const ACCENT = '#C76649';

export default StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pillActive: { backgroundColor: ACCENT, borderColor: ACCENT },
  pillEmoji: { fontSize: 14 },
  pillLabel: { fontSize: 13, color: '#444', fontWeight: '500' },
  pillLabelActive: { color: '#fff' },
});
