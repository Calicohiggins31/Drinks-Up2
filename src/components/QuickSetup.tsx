import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ingredientName } from '../data/ingredients';
import { QUICK_SETUP } from '../data/quickSetup';
import { matchAll } from '../lib/matching';
import { useBar } from '../state/BarContext';
import { radius, useTheme } from '../theme';

/** Shown once after the age gate when the bar is empty: tick what you keep at home. */
export function QuickSetup() {
  const t = useTheme();
  const { completeSetup, recipes } = useBar();
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());

  const canMake = useMemo(() => matchAll(picked, recipes).filter((m) => m.canMake).length, [picked, recipes]);

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.step, { color: t.accent }]}>QUICK SETUP</Text>
        <Text style={[styles.title, { color: t.text }]}>What do you usually keep at home?</Text>
        <Text style={[styles.body, { color: t.textMuted }]}>
          Tap everything you have. You can add more later in My Bar.
        </Text>

        <View style={styles.grid}>
          {QUICK_SETUP.map(({ id, emoji }) => {
            const on = picked.has(id);
            return (
              <Pressable
                key={id}
                onPress={() => toggle(id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on }}
                accessibilityLabel={ingredientName(id)}
                style={({ pressed }) => [
                  styles.item,
                  {
                    backgroundColor: on ? t.accentSoft : t.surface,
                    borderColor: on ? t.accent : t.border,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={[styles.name, { color: t.text }]} numberOfLines={2}>
                  {ingredientName(id).replace(/ \(.*\)$/, '').replace('Prosecco / sparkling wine', 'Prosecco / bubbly')}
                </Text>
                {on ? <Text style={[styles.check, { color: t.accent }]}>✓</Text> : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: t.border, backgroundColor: t.background }]}>
        <Text style={[styles.count, { color: t.text }]} accessibilityLiveRegion="polite">
          {picked.size === 0
            ? 'Pick a few to get started'
            : `You can make ${canMake} ${canMake === 1 ? 'drink' : 'drinks'} already`}
        </Text>
        <Pressable
          onPress={() => completeSetup([...picked])}
          disabled={picked.size === 0}
          style={({ pressed }) => [
            styles.primary,
            { backgroundColor: t.accent, opacity: picked.size === 0 ? 0.4 : pressed ? 0.85 : 1 },
          ]}
        >
          <Text style={[styles.primaryText, { color: t.onAccent }]}>Show me what I can make</Text>
        </Pressable>
        <Pressable onPress={() => completeSetup([])} hitSlop={8} style={styles.skip}>
          <Text style={{ color: t.textMuted, fontWeight: '600' }}>Skip for now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 20, paddingBottom: 24, gap: 8 },
  step: { fontSize: 12, fontWeight: '800', letterSpacing: 1, marginTop: 8 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5, lineHeight: 33 },
  body: { fontSize: 15, lineHeight: 21, marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  item: {
    width: '31%', flexGrow: 1, minHeight: 92, padding: 10, borderRadius: radius.md, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  emoji: { fontSize: 28 },
  name: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  check: { position: 'absolute', top: 6, right: 8, fontSize: 14, fontWeight: '800' },
  footer: { padding: 16, gap: 10, borderTopWidth: StyleSheet.hairlineWidth },
  count: { fontSize: 16, fontWeight: '700', textAlign: 'center' },
  primary: { paddingVertical: 15, borderRadius: radius.pill, alignItems: 'center' },
  primaryText: { fontSize: 17, fontWeight: '700' },
  skip: { alignItems: 'center', paddingVertical: 4 },
});
