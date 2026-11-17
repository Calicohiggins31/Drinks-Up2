import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DrinkCard } from '../../components/DrinkCard';
import { Screen, SectionTitle } from '../../components/Screen';
import { matchAll } from '../../lib/matching';
import { useBar } from '../../state/BarContext';
import { radius, useTheme } from '../../theme';

export default function SavedScreen() {
  const t = useTheme();
  const { owned, favorites, recipes, customRecipes } = useBar();

  const mine = useMemo(() => matchAll(owned, customRecipes), [owned, customRecipes]);
  const saved = useMemo(() => matchAll(owned, recipes.filter((r) => favorites.has(r.id))), [owned, recipes, favorites]);
  const all = useMemo(() => matchAll(owned, recipes), [owned, recipes]);

  return (
    <Screen
      title="Saved"
      subtitle="Your recipes, favourites and every drink"
      right={
        <Pressable
          onPress={() => router.push('/recipe-editor')}
          accessibilityLabel="Create a new recipe"
          style={({ pressed }) => [styles.newBtn, { backgroundColor: t.accent, opacity: pressed ? 0.8 : 1 }]}
        >
          <Text style={[styles.newBtnText, { color: t.onAccent }]}>+ New</Text>
        </Pressable>
      }
    >
      <SectionTitle hint="Private to this phone">My recipes</SectionTitle>
      {mine.length === 0 ? (
        <Pressable
          onPress={() => router.push('/recipe-editor')}
          style={[styles.empty, { backgroundColor: t.surfaceAlt }]}
        >
          <Text style={[styles.emptyText, { color: t.text }]}>Have a signature drink?</Text>
          <Text style={[styles.emptyHint, { color: t.accent }]}>+ Create your own recipe</Text>
        </Pressable>
      ) : (
        mine.map((m) => <DrinkCard key={m.recipe.id} match={m} favorite={favorites.has(m.recipe.id)} />)
      )}

      <SectionTitle>Favourites</SectionTitle>
      {saved.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: t.surfaceAlt }]}>
          <Text style={[styles.emptyHint, { color: t.textMuted }]}>Tap ♡ on any drink to keep it here.</Text>
        </View>
      ) : (
        saved.map((m) => <DrinkCard key={m.recipe.id} match={m} favorite />)
      )}

      <SectionTitle hint={`${recipes.length} recipes`}>All drinks</SectionTitle>
      {all.map((m) => (
        <DrinkCard key={m.recipe.id} match={m} favorite={favorites.has(m.recipe.id)} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  newBtn: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: radius.pill, marginBottom: 6 },
  newBtnText: { fontSize: 15, fontWeight: '700' },
  empty: { padding: 18, borderRadius: radius.md, alignItems: 'center', gap: 4 },
  emptyText: { fontSize: 16, fontWeight: '600' },
  emptyHint: { fontSize: 15, fontWeight: '600' },
});
