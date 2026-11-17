import { router } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrinkCard } from '../../components/DrinkCard';
import { isClassic } from '../../data/classics';
import { baseOf, BASES, type BaseId } from '../../lib/base';
import { matchRecipe } from '../../lib/matching';
import { pickDrinkId } from '../../lib/pickDrink';
import { searchRecipes } from '../../lib/search';
import { useBar } from '../../state/BarContext';
import { radius, useTheme } from '../../theme';

type Filter = 'all' | 'classics' | 'can-make' | BaseId;

export default function DrinksScreen() {
  const t = useTheme();
  const { recipes, owned, favorites } = useBar();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const lastPick = useRef<string | undefined>(undefined);

  const results = useMemo(() => {
    const matches = searchRecipes(recipes, query).map((r) => matchRecipe(r, owned));
    if (filter === 'all') return matches;
    if (filter === 'can-make') return matches.filter((m) => m.canMake);
    if (filter === 'classics') return matches.filter((m) => isClassic(m.recipe.id));
    return matches.filter((m) => baseOf(m.recipe) === filter);
  }, [recipes, query, owned, filter]);

  // Random drink from whatever the list is showing (search and filter included), mostly classics.
  const pickForMe = () => {
    const id = pickDrinkId(results.map((m) => m.recipe.id), lastPick.current);
    if (!id) return;
    lastPick.current = id;
    router.push(`/drink/${id}`);
  };

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'classics', label: '★ Classics' },
    { id: 'can-make', label: '✓ I can make' },
    ...BASES.map((b) => ({ id: b.id, label: `${b.emoji} ${b.label}` })),
  ];

  const header = (
    <View style={styles.header}>
      <Text style={[styles.title, { color: t.text }]}>Drinks</Text>
      <Text style={[styles.subtitle, { color: t.textMuted }]}>
        {query || filter !== 'all'
          ? `${results.length} ${results.length === 1 ? 'match' : 'matches'}`
          : `All ${recipes.length} drinks, classics first`}
      </Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search drinks or ingredients"
        placeholderTextColor={t.textMuted}
        clearButtonMode="while-editing"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Search drinks"
        style={[styles.search, { backgroundColor: t.surfaceAlt, color: t.text }]}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {filters.map((f) => {
          const on = f.id === filter;
          return (
            <Pressable
              key={f.id}
              onPress={() => setFilter(on && f.id !== 'all' ? 'all' : f.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              style={[styles.chip, { backgroundColor: on ? t.accent : t.surface, borderColor: on ? t.accent : t.border }]}
            >
              <Text style={[styles.chipText, { color: on ? t.onAccent : t.text }]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {results.length > 1 ? (
        <Pressable
          onPress={pickForMe}
          accessibilityRole="button"
          accessibilityHint="Opens a random drink from this list"
          style={({ pressed }) => [styles.pick, { borderColor: t.accent, opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={[styles.pickText, { color: t.accent }]}>🎲 Pick a drink for me</Text>
        </Pressable>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.safe, { backgroundColor: t.background }]}>
      <FlatList
        data={results}
        keyExtractor={(m) => m.recipe.id}
        renderItem={({ item }) => <DrinkCard match={item} favorite={favorites.has(item.recipe.id)} />}
        ListHeaderComponent={header}
        ListEmptyComponent={
          <View style={[styles.empty, { backgroundColor: t.surfaceAlt }]}>
            <Text style={[styles.emptyText, { color: t.textMuted }]}>
              No drinks match{query ? ` “${query.trim()}”` : ''}. Try another word or filter.
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.list}
        initialNumToRender={12}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  list: { paddingHorizontal: 16, paddingBottom: 48 },
  // On web the tab bar floats at the top of the page, so leave room for it.
  header: { paddingTop: Platform.OS === 'web' ? 72 : 12, paddingBottom: 12, gap: 10 },
  title: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, marginTop: -6 },
  search: { fontSize: 16, paddingHorizontal: 14, paddingVertical: 11, borderRadius: radius.md },
  chips: { gap: 8, paddingVertical: 2 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill, borderWidth: 1 },
  chipText: { fontSize: 14, fontWeight: '600' },
  pick: { borderWidth: 1.5, borderRadius: radius.pill, paddingVertical: 11, alignItems: 'center' },
  pickText: { fontSize: 16, fontWeight: '700' },
  empty: { padding: 20, borderRadius: radius.md, alignItems: 'center' },
  emptyText: { fontSize: 15, textAlign: 'center' },
});
