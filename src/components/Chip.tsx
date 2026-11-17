import { Pressable, StyleSheet, Text } from 'react-native';
import { radius, useTheme } from '../theme';

type Props = { label: string; selected: boolean; onPress: () => void; onLongPress?: () => void };

export function Chip({ label, selected, onPress, onLongPress }: Props) {
  const t = useTheme();
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      hitSlop={4}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? t.accent : t.surface,
          borderColor: selected ? t.accent : t.border,
          opacity: pressed ? 0.75 : 1,
        },
      ]}
    >
      <Text style={[styles.label, { color: selected ? t.onAccent : t.text }]}>
        {selected ? '✓ ' : ''}
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  label: { fontSize: 15, fontWeight: '500' },
});
