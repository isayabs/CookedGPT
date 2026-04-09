import { Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/Pill.styles';

export function CuisinePill({ filter, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.pill, active && styles.pillActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.pillEmoji}>{filter.emoji}</Text>
      <Text style={[styles.pillLabel, active && styles.pillLabelActive]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );
}
