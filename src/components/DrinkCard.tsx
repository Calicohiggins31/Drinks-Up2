import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { isClassic } from '../data/classics';
import { shortRating } from '../lib/ratingLabel';
import { useRatings } from '../state/RatingsContext';
import { ingredientName } from '../data/ingredients';
import type { DrinkMatch } from '../lib/matching';
import { radius, useTheme } from '../theme';

export function DrinkCard({ match, favorite }: { match: DrinkMatch; favorite?: boolean }) {
  const t = useTheme();
  const { recipe, missing, canMake } = match;
  const rating = shortRating(useRatings().ratings.get(recipe.id));
  const summary = recipe.ingredients
    .filter((i) => !i.optional)
    .map((i) => ingredientName(i.id))
    .join(' · ');

  return (
    <Pressable
      onPress={() => router.push(`/drink/${recipe.id}`)}
      accessibilityRole="button"
      accessibilityLabel={`${recipe.name}.${rating ? ` Rated ${rating}.` : ''} ${canMake ? 'You can make this.' : `Missing ${missing.length}.`}`}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: t.surface, borderColor: t.border, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={[styles.tile, { backgroundColor: recipe.color + '33' }]}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={[styles.name, { color: t.text }]} numberOfLines={1}>
            {recipe.name}
          </Text>
          {isClassic(recipe.id) ? (
            <Text style={[styles.tag, { color: t.textMuted, backgroundColor: t.surfaceAlt }]}>CLASSIC</Text>
          ) : null}
          {recipe.custom ? (
            <Text style={[styles.mine, { color: t.accent, backgroundColor: t.accentSoft }]}>YOURS</Text>
          ) : null}
          {favorite ? <Text style={{ color: t.accent }}>♥</Text> : null}
          {rating ? (
            <Text style={[styles.rating, { color: t.accent }]} accessibilityLabel={`Rated ${rating.replace(' (', ' stars from ').replace(')', ' ratings')}`}>
              ★ {rating}
            </Text>
          ) : null}
        </View>
        <Text style={[styles.summary, { color: t.textMuted }]} numberOfLines={1}>
          {summary}
        </Text>
        {canMake ? (
          <Text style={[styles.status, { color: t.success }]}>✓ Ready to mix</Text>
        ) : (
          <Text style={[styles.status, { color: t.warning }]} numberOfLines={1}>
            Need {missing.map((m) => ingredientName(m.id)).join(', ')}
          </Text>
        )}
      </View>
      <Text style={[styles.chevron, { color: t.textMuted }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tile: { width: 52, height: 52, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 28 },
  body: { flex: 1, gap: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { fontSize: 17, fontWeight: '600', flexShrink: 1 },
  summary: { fontSize: 13 },
  tag: { fontSize: 10, fontWeight: '800', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, overflow: 'hidden' },
  rating: { marginLeft: 'auto', fontSize: 14, fontWeight: '700' },
  mine: { fontSize: 10, fontWeight: '800', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, overflow: 'hidden' },
  status: { fontSize: 13, fontWeight: '600', marginTop: 2 },
  chevron: { fontSize: 26, fontWeight: '300' },
});
