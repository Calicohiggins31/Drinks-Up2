import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BaseGroup } from '../../components/BaseGroup';
import { DrinkCard } from '../../components/DrinkCard';
import { Screen, SectionTitle } from '../../components/Screen';
import { ingredientName } from '../../data/ingredients';
import { findStoresNearby } from '../../features/stores/storeFinder';
import { groupByBase, type BaseId } from '../../lib/base';
import { matchAll, shoppingSuggestions, type DrinkMatch } from '../../lib/matching';
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
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set());
  const toggle = (key: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const matches = useMemo(() => {
    const all = matchAll(owned, recipes);
    if (filter === 'all') return all;
    return all.filter((m) => (m.recipe.strength === 'None') === (filter === 'mocktails'));
  }, [owned, filter, recipes]);

  const ready_ = matches.filter((m) => m.canMake);
  const almost = matches.filter((m) => m.missing.length === 1);
  const suggestions = useMemo(() => shoppingSuggestions(matches, 4), [matches]);
  const readyGroups = useMemo(() => groupByBase(ready_, (m) => m.recipe), [ready_]);
  const almostGroups = useMemo(() => groupByBase(almost, (m) => m.recipe), [almost]);

  // Drinks under a foldable header per base spirit. A section with only one group starts open.
  const renderGroups = (section: string, groups: { id: BaseId; label: string; emoji: string; items: DrinkMatch[] }[]) =>
    groups.map((g) => {
      const key = `${section}:${g.id}`;
      return (
        <BaseGroup
          key={key}
          emoji={g.emoji}
          label={g.label}
          count={g.items.length}
          open={groups.length === 1 || open.has(key)}
          onToggle={() => toggle(key)}
        >
          {g.items.map((m) => (
            <DrinkCard key={m.recipe.id} match={m} favorite={favorites.has(m.recipe.id)} />
          ))}
        </BaseGroup>
      );
    });

  if (!ready) return <Screen title="Mix">{null}</Screen>;

  if (owned.size === 0) {
    return (
      <Screen title="Mix" subtitle="Find out what you can make">
        <View style={[styles.empty, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Text style={styles.emptyEmoji}>🍸</Text>
          <Text style={[styles.emptyTitle, { color: t.text }]}>Your bar is empty</Text>
          <Text style={[styles.emptyText, { color: t.textMuted }]}>
            Tell Drinks Up which bottles, mixers and fruit you have, and we’ll show every drink you
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
          <SectionTitle hint="Tap a spirit to see its drinks">Ready to mix</SectionTitle>
          {renderGroups('ready', readyGroups)}
        </>
      ) : null}

      <SectionTitle hint={suggestions.length > 0 ? 'Pick up one thing and unlock more drinks' : undefined}>
        Shopping list
      </SectionTitle>
      {suggestions.length > 0 ? (
        <>
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
      <Pressable
        onPress={() => findStoresNearby().catch(() => {})}
        accessibilityRole="link"
        accessibilityHint="Opens your maps app"
        style={({ pressed }) => [styles.storeBtn, { borderColor: t.accent, opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={[styles.storeBtnText, { color: t.accent }]}>📍 Find a liquor store near me</Text>
        <Text style={[styles.storeBtnHint, { color: t.textMuted }]}>Opens Maps. Drinks Up doesn’t see your location.</Text>
      </Pressable>

      {almost.length > 0 ? (
        <>
          <SectionTitle hint="Just one ingredient away">Almost there</SectionTitle>
          {renderGroups('almost', almostGroups)}
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
  storeBtn: { borderWidth: 1.5, borderRadius: radius.md, padding: 14, alignItems: 'center', gap: 2, marginTop: 4 },
  storeBtnText: { fontSize: 16, fontWeight: '700' },
  storeBtnHint: { fontSize: 12 },
  addBtnText: { fontSize: 15, fontWeight: '700' },
});
