import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DrinkCard } from '../../components/DrinkCard';
import { Screen, SectionTitle } from '../../components/Screen';
import { RECIPES } from '../../data/recipes';
import { matchAll } from '../../lib/matching';
import { useBar } from '../../state/BarContext';
import { radius, useTheme } from '../../theme';

export default function SavedScreen() {
  const t = useTheme();
  const { owned, favorites } = useBar();

  const saved = useMemo(() => matchAll(owned, RECIPES.filter((r) => favorites.has(r.id))), [owned, favorites]);
  const all = useMemo(() => matchAll(owned), [owned]);

  return (
    <Screen title="Saved" subtitle="Your favourites, plus every recipe">
      {saved.length === 0 ? (
        <View style={[styles.empty, { backgroundColor: t.surfaceAlt }]}>
          <Text style={[styles.emptyText, { color: t.textMuted }]}>
            Tap ♡ on any drink to keep it here.
          </Text>
        </View>
      ) : (
        saved.map((m) => <DrinkCard key={m.recipe.id} match={m} favorite />)
      )}

      <SectionTitle hint={`${RECIPES.length} recipes`}>All drinks</SectionTitle>
      {all.map((m) => (
        <DrinkCard key={m.recipe.id} match={m} favorite={favorites.has(m.recipe.id)} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { padding: 20, borderRadius: radius.md, alignItems: 'center' },
  emptyText: { fontSize: 15 },
});
