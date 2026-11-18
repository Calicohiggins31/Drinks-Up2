import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ingredientName } from '../data/ingredients';
import type { DrinkMatch } from '../lib/matching';
import { shortRating } from '../lib/ratingLabel';
import { useRatings } from '../state/RatingsContext';
import { radius, useTheme } from '../theme';

type Props = {
  greeting: string;
  /** How many drinks the person can make right now. */
  readyCount: number;
  /** Today's featured drink; may be one ingredient away. */
  featured?: DrinkMatch;
  /** Label above the featured drink, e.g. "Tonight's pick". */
  featuredLabel: string;
  barEmpty: boolean;
  onSurprise?: () => void;
};

/** The banner at the top of Mix: greeting, headline and today's featured drink. */
export function MixHero({ greeting, readyCount, featured, featuredLabel, barEmpty, onSurprise }: Props) {
  const t = useTheme();
  const { ratings } = useRatings();
  const featuredRating = featured ? shortRating(ratings.get(featured.recipe.id)) : '';
  const headline = barEmpty
    ? 'What’s in your bar?'
    : readyCount === 0
      ? 'You’re close to your first drink'
      : `You can make ${readyCount} ${readyCount === 1 ? 'drink' : 'drinks'}`;

  return (
    <View style={[styles.hero, { backgroundColor: t.accent }]}>
      {/* Decorative glasses, purely visual. */}
      <Text style={[styles.decor, styles.decorTop]} importantForAccessibility="no" accessibilityElementsHidden>
        🍸
      </Text>
      <Text style={[styles.decor, styles.decorBottom]} importantForAccessibility="no" accessibilityElementsHidden>
        🍋
      </Text>

      <Text style={[styles.greeting, { color: t.onAccent }]}>{greeting} 🥂</Text>
      <Text style={[styles.headline, { color: t.onAccent }]} accessibilityRole="header">
        {headline}
      </Text>

      {barEmpty ? (
        <>
          <Text style={[styles.sub, { color: t.onAccent }]}>
            Tell Drinks Up which bottles, mixers and fruit you have, and we’ll show every drink you can make.
          </Text>
          <Pressable
            onPress={() => router.navigate('/bar')}
            style={({ pressed }) => [styles.ctaLight, { backgroundColor: t.surface, opacity: pressed ? 0.85 : 1 }]}
          >
            <Text style={[styles.ctaLightText, { color: t.accent }]}>Stock my bar</Text>
          </Pressable>
        </>
      ) : featured ? (
        <View style={[styles.card, { backgroundColor: t.surface }]}>
          <View style={styles.labelRow}>
            <Text style={[styles.label, { color: t.accent }]}>{featuredLabel.toUpperCase()}</Text>
            {featuredRating ? <Text style={[styles.label, { color: t.accent }]}>★ {featuredRating}</Text> : null}
          </View>
          <Pressable
            onPress={() => router.push(`/drink/${featured.recipe.id}`)}
            style={styles.featuredRow}
            accessibilityRole="button"
            accessibilityLabel={`${featuredLabel}: ${featured.recipe.name}`}
          >
            <View style={[styles.tile, { backgroundColor: featured.recipe.color + '40' }]}>
              <Text style={styles.tileEmoji}>{featured.recipe.emoji}</Text>
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={[styles.name, { color: t.text }]} numberOfLines={1}>
                {featured.recipe.name}
              </Text>
              <Text style={[styles.desc, { color: t.textMuted }]} numberOfLines={2}>
                {featured.recipe.description}
              </Text>
              <Text style={[styles.status, { color: featured.canMake ? t.success : t.warning }]} numberOfLines={1}>
                {featured.canMake
                  ? '✓ You have everything'
                  : `Just need ${featured.missing.map((m) => ingredientName(m.id)).join(', ')}`}
              </Text>
            </View>
          </Pressable>
          <View style={styles.buttons}>
            <Pressable
              onPress={() => router.push(`/drink/${featured.recipe.id}`)}
              style={({ pressed }) => [styles.btn, { backgroundColor: t.accent, opacity: pressed ? 0.85 : 1 }]}
            >
              <Text style={[styles.btnText, { color: t.onAccent }]}>See recipe</Text>
            </Pressable>
            {onSurprise ? (
              <Pressable
                onPress={onSurprise}
                accessibilityHint="Opens a random drink you can make right now"
                style={({ pressed }) => [styles.btn, styles.btnOutline, { borderColor: t.accent, opacity: pressed ? 0.7 : 1 }]}
              >
                <Text style={[styles.btnText, { color: t.accent }]}>🎲 Surprise me</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: radius.lg + 4, padding: 18, gap: 6, overflow: 'hidden' },
  decor: { position: 'absolute', fontSize: 110, opacity: 0.16 },
  decorTop: { top: -18, right: -14, transform: [{ rotate: '14deg' }] },
  decorBottom: { bottom: -30, left: -20, transform: [{ rotate: '-18deg' }] },
  greeting: { fontSize: 15, fontWeight: '600', opacity: 0.9 },
  headline: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5, lineHeight: 33 },
  sub: { fontSize: 15, lineHeight: 21, opacity: 0.92, marginTop: 2 },
  ctaLight: { alignSelf: 'flex-start', marginTop: 10, paddingHorizontal: 22, paddingVertical: 12, borderRadius: radius.pill },
  ctaLightText: { fontSize: 16, fontWeight: '800' },
  card: { marginTop: 12, borderRadius: radius.lg, padding: 14, gap: 10 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 12, fontWeight: '800', letterSpacing: 0.8 },
  featuredRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  tile: { width: 64, height: 64, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center' },
  tileEmoji: { fontSize: 36 },
  name: { fontSize: 20, fontWeight: '800' },
  desc: { fontSize: 14, lineHeight: 19 },
  status: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  buttons: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: radius.pill, alignItems: 'center' },
  btnOutline: { borderWidth: 1.5 },
  btnText: { fontSize: 15, fontWeight: '700' },
});
