import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, useTheme } from '../theme';

type Props = {
  emoji: string;
  label: string;
  count: number;
  noun?: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};

/** A tappable header ("🍸 Vodka · 5 drinks ›") that shows or hides its drinks. */
export function BaseGroup({ emoji, label, count, noun = 'drink', open, onToggle, children }: Props) {
  const t = useTheme();
  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${label}, ${count} ${count === 1 ? noun : `${noun}s`}`}
        style={({ pressed }) => [
          styles.header,
          { backgroundColor: t.surface, borderColor: t.border, opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[styles.label, { color: t.text }]} numberOfLines={1}>{label}</Text>
        <View style={[styles.badge, { backgroundColor: t.accentSoft }]}>
          <Text style={[styles.badgeText, { color: t.accent }]}>{count}</Text>
        </View>
        <Text style={[styles.chevron, { color: t.textMuted, transform: [{ rotate: open ? '90deg' : '0deg' }] }]}>›</Text>
      </Pressable>
      {open ? <View style={styles.items}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 12,
    borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth,
  },
  emoji: { fontSize: 22 },
  label: { flex: 1, fontSize: 17, fontWeight: '600' },
  badge: { minWidth: 28, paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill, alignItems: 'center' },
  badgeText: { fontSize: 14, fontWeight: '700' },
  chevron: { fontSize: 24, fontWeight: '300', width: 16, textAlign: 'center' },
  items: { gap: 8, paddingLeft: 8 },
});
