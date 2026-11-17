import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BaseGroup } from '../../components/BaseGroup';
import { MixHero } from '../../components/MixHero';
import { DrinkCard } from '../../components/DrinkCard';
import { Screen, SectionTitle } from '../../components/Screen';
import { isClassic } from '../../data/classics';
import { ingredientName } from '../../data/ingredients';
import { findStoresNearby } from '../../features/stores/storeFinder';
import { groupByBase, type BaseId } from '../../lib/base';
import { dailyPick, greeting } from '../../lib/daily';
import { matchAll, shoppingSuggestions, type DrinkMatch } from '../../lib/matching';
import { pickDrinkId } from '../../lib/pickDrink';
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
  const { owned, favorites, ready, addIngredients, recipes, shopping, addToShopping } = useBar();
  const listed = new Set(shopping.map((i) => i.id));
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set());
  const lastPick = useRef<string | undefined>(undefined);
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

  const ready_ = useMemo(() => matches.filter((m) => m.canMake), [matches]);
  const almost = useMemo(() => matches.filter((m) => m.missing.length === 1), [matches]);

  // Today's featured drink: a classic you can make, else anything you can make,
  // else a classic you're one ingredient away from. Stays the same all day.
  const featured = useMemo(() => {
    const classicsReady = ready_.filter((m) => isClassic(m.recipe.id));
    const pool = classicsReady.length ? classicsReady : ready_.length ? ready_ : almost.filter((m) => isClassic(m.recipe.id));
    return dailyPick([...pool].sort((a, b) => a.recipe.id.localeCompare(b.recipe.id)));
  }, [ready_, almost]);
  const now = new Date();
  const hour = now.getHours();
  const featuredLabel = hour >= 17 || hour < 5 ? 'Tonight’s pick' : 'Today’s pick';
  const suggestions = useMemo(() => shoppingSuggestions(matches, 5), [matches]);
  const readyGroups = useMemo(() => groupByBase(ready_, (m) => m.recipe), [ready_]);
  const almostGroups = useMemo(() => groupByBase(almost, (m) => m.recipe), [almost]);

  // Random pick from the drinks you can make right now (respects the All/Cocktails/Mocktails filter).
  const pickForMe = () => {
    const id = pickDrinkId(ready_.map((m) => m.recipe.id), lastPick.current);
    if (!id) return;
    lastPick.current = id;
    router.push(`/drink/${id}`);
  };

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
      <Screen title="Mix" hero={<MixHero greeting={greeting(now)} readyCount={0} featuredLabel={featuredLabel} barEmpty />}>
        {null}
      </Screen>
    );
  }

  return (
    <Screen
      title="Mix"
      hero={
        <MixHero
          greeting={greeting(now)}
          readyCount={ready_.length}
          featured={featured}
          featuredLabel={featuredLabel}
          barEmpty={false}
          onSurprise={ready_.length > 0 ? pickForMe : undefined}
        />
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

      <SectionTitle hint={suggestions.length > 0 ? 'Buy one of these to unlock more drinks' : undefined}>
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
                <View style={styles.suggestionBtns}>
                  <Pressable
                    onPress={() => (listed.has(s.ingredientId) ? router.push('/shopping') : addToShopping([s.ingredientId]))}
                    accessibilityLabel={
                      listed.has(s.ingredientId)
                        ? `${ingredientName(s.ingredientId)} is on your shopping list`
                        : `Add ${ingredientName(s.ingredientId)} to shopping list`
                    }
                    style={({ pressed }) => [
                      styles.addBtn,
                      listed.has(s.ingredientId)
                        ? { backgroundColor: t.successSoft }
                        : { backgroundColor: t.accent },
                      { opacity: pressed ? 0.8 : 1 },
                    ]}
                  >
                    <Text style={[styles.addBtnText, { color: listed.has(s.ingredientId) ? t.success : t.onAccent }]}>
                      {listed.has(s.ingredientId) ? '✓ On list' : '🛒 Add to list'}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => addIngredients([s.ingredientId])}
                    accessibilityLabel={`I already have ${ingredientName(s.ingredientId)}`}
                    hitSlop={6}
                  >
                    <Text style={[styles.listBtnText, { color: t.textMuted }]}>I have it</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </>
      ) : null}
      <Pressable
        onPress={() => router.push('/shopping')}
        style={({ pressed }) => [styles.listLink, { backgroundColor: t.surface, borderColor: t.border, opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={[styles.listLinkText, { color: t.text }]}>🛒 My shopping list</Text>
        <Text style={[styles.listLinkCount, { color: t.textMuted }]}>
          {shopping.length ? `${shopping.length} ${shopping.length === 1 ? 'item' : 'items'} ›` : 'Empty ›'}
        </Text>
      </Pressable>
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
  pick: { paddingVertical: 15, borderRadius: radius.pill, alignItems: 'center', marginTop: 4 },
  pickText: { fontSize: 17, fontWeight: '700' },
  storeBtn: { borderWidth: 1.5, borderRadius: radius.md, padding: 14, alignItems: 'center', gap: 2, marginTop: 4 },
  storeBtnText: { fontSize: 16, fontWeight: '700' },
  storeBtnHint: { fontSize: 12 },
  suggestionBtns: { alignItems: 'center', gap: 6 },
  listBtnText: { fontSize: 13, fontWeight: '700' },
  listLink: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 14, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, marginTop: 4,
  },
  listLinkText: { fontSize: 16, fontWeight: '600' },
  listLinkCount: { fontSize: 15 },
  addBtnText: { fontSize: 15, fontWeight: '700' },
});
