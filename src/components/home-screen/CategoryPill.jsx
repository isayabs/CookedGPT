import { Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/Pill.styles';

export function CategoryPill({ cat, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.pill, active && styles.pillActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.pillEmoji}>{cat.emoji}</Text>
      <Text style={[styles.pillLabel, active && styles.pillLabelActive]}>
        {cat.name}
      </Text>
    </TouchableOpacity>
  );
}
