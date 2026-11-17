import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DrinkCard } from '../../components/DrinkCard';
import { Screen, SectionTitle } from '../../components/Screen';
import { ingredientName } from '../../data/ingredients';
import { matchAll, shoppingSuggestions } from '../../lib/matching';
import { useBar } from '../../state/BarContext';
import { radius, useTheme } from '../../theme';

type Filter = 'all' | 'cocktails' | 'mocktails';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'cocktails', label: 'Cocktails' },
  { id: 'mocktails', label: 'Mocktails' },
];

export default function MixScreen() {
  const t = useTheme();
  const { owned, favorites, ready, addIngredients, recipes } = useBar();
  const [filter, setFilter] = useState<Filter>('all');

  const matches = useMemo(() => {
    const all = matchAll(owned, recipes);
    if (filter === 'all') return all;
    return all.filter((m) => (m.recipe.strength === 'None') === (filter === 'mocktails'));
  }, [owned, filter, recipes]);

  const ready_ = matches.filter((m) => m.canMake);
  const almost = matches.filter((m) => m.missing.length === 1);
  const suggestions = useMemo(() => shoppingSuggestions(matches, 4), [matches]);

  if (!ready) return <Screen title="Mix">{null}</Screen>;

  if (owned.size === 0) {
    return (
      <Screen title="Mix" subtitle="Find out what you can make">
        <View style={[styles.empty, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Text style={styles.emptyEmoji}>🍸</Text>
          <Text style={[styles.emptyTitle, { color: t.text }]}>Your bar is empty</Text>
          <Text style={[styles.emptyText, { color: t.textMuted }]}>
            Tell Drinks Up which bottles, mixers and fruit you have, and we'll show every drink you
            can mix right now.
          </Text>
          <Pressable
            onPress={() => router.navigate('/bar')}
            style={({ pressed }) => [styles.cta, { backgroundColor: t.accent, opacity: pressed ? 0.8 : 1 }]}
          >
            <Text style={[styles.ctaText, { color: t.onAccent }]}>Stock my bar</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      title="Mix"
      subtitle={
        ready_.length === 0
          ? 'Nothing quite yet, but you are close'
          : `You can make ${ready_.length} ${ready_.length === 1 ? 'drink' : 'drinks'}`
      }
    >
      <View style={[styles.segment, { backgroundColor: t.surfaceAlt }]}>
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <Pressable
              key={f.id}
              onPress={() => setFilter(f.id)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              style={[styles.segmentItem, active && { backgroundColor: t.surface }]}
            >
              <Text style={[styles.segmentText, { color: active ? t.text : t.textMuted }]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {ready_.length > 0 ? (
        <>
          <SectionTitle>Ready to mix</SectionTitle>
          {ready_.map((m) => (
            <DrinkCard key={m.recipe.id} match={m} favorite={favorites.has(m.recipe.id)} />
          ))}
        </>
      ) : null}

      {suggestions.length > 0 ? (
        <>
          <SectionTitle hint="Pick up one thing and unlock more drinks">Shopping list</SectionTitle>
          <View style={styles.suggestions}>
            {suggestions.map((s) => (
              <View
                key={s.ingredientId}
                style={[styles.suggestion, { backgroundColor: t.accentSoft }]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.suggestionName, { color: t.text }]}>{ingredientName(s.ingredientId)}</Text>
                  <Text style={[styles.suggestionHint, { color: t.textMuted }]} numberOfLines={2}>
                    Unlocks {s.unlocks.map((r) => r.name).join(', ')}
                  </Text>
                </View>
                <Pressable
                  onPress={() => addIngredients([s.ingredientId])}
                  accessibilityLabel={`I have ${ingredientName(s.ingredientId)}`}
                  style={({ pressed }) => [styles.addBtn, { backgroundColor: t.accent, opacity: pressed ? 0.8 : 1 }]}
                >
                  <Text style={[styles.addBtnText, { color: t.onAccent }]}>+{s.unlocks.length}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </>
      ) : null}

      {almost.length > 0 ? (
        <>
          <SectionTitle hint="Just one ingredient away">Almost there</SectionTitle>
          {almost.map((m) => (
            <DrinkCard key={m.recipe.id} match={m} favorite={favorites.has(m.recipe.id)} />
          ))}
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: {
    marginTop: 24,
    padding: 24,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    gap: 10,
  },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: { fontSize: 22, fontWeight: '700' },
  emptyText: { fontSize: 15, textAlign: 'center', lineHeight: 21 },
  cta: { marginTop: 8, paddingHorizontal: 24, paddingVertical: 14, borderRadius: radius.pill },
  ctaText: { fontSize: 16, fontWeight: '700' },
  segment: { flexDirection: 'row', padding: 3, borderRadius: radius.sm + 2 },
  segmentItem: { flex: 1, paddingVertical: 8, borderRadius: radius.sm, alignItems: 'center' },
  segmentText: { fontSize: 14, fontWeight: '600' },
  suggestions: { gap: 8 },
  suggestion: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: radius.md, gap: 12 },
  suggestionName: { fontSize: 16, fontWeight: '600' },
  suggestionHint: { fontSize: 13, marginTop: 2 },
  addBtn: { minWidth: 48, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill, alignItems: 'center' },
  addBtnText: { fontSize: 15, fontWeight: '700' },
});
