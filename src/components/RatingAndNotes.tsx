import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { Recipe } from '../data/recipes';
import { fetchMyRating, fetchRatingSummary, ratingLabel, saveMyRating, type RatingSummary } from '../lib/ratings';
import { useAuth } from '../state/AuthContext';
import { useBar } from '../state/BarContext';
import { radius, useTheme } from '../theme';

/**
 * Compact rating shown near the top of a drink page:
 * the public average, plus five stars the signed-in person taps to rate.
 */
export function RatingBar({ recipe }: { recipe: Recipe }) {
  const t = useTheme();
  const { configured, userId } = useAuth();
  const canRate = configured && !recipe.custom;

  const [summary, setSummary] = useState<RatingSummary | null>(null);
  const [mine, setMine] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!canRate) return;
    let live = true;
    fetchRatingSummary(recipe.id).then((s) => live && setSummary(s));
    if (userId) fetchMyRating(userId, recipe.id).then((s) => live && setMine(s));
    return () => {
      live = false;
    };
  }, [canRate, recipe.id, userId]);

  if (!canRate) return null;

  const rate = async (stars: number) => {
    if (!userId) {
      router.push({ pathname: '/account', params: { reason: 'rate' } });
      return;
    }
    const previous = mine;
    setMine(stars);
    setError('');
    try {
      await saveMyRating(userId, recipe.id, stars);
      setSummary(await fetchRatingSummary(recipe.id));
    } catch {
      setMine(previous);
      setError('Couldn\u2019t save your rating. Check your connection and try again.');
    }
  };

  return (
    <View style={[styles.bar, { backgroundColor: t.surface, borderColor: t.border }]}>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={[styles.barTitle, { color: t.text }]}>{mine ? 'Your rating' : 'Rate this drink'}</Text>
        <Text style={[styles.summary, { color: t.textMuted }]}>{ratingLabel(summary)}</Text>
      </View>
      <View style={styles.stars} accessibilityLabel={`Your rating: ${mine ?? 0} of 5`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable key={n} onPress={() => rate(n)} hitSlop={4} accessibilityRole="button" accessibilityLabel={`Rate ${n} star${n > 1 ? 's' : ''}`}>
            <Text style={[styles.star, { color: mine && n <= mine ? t.accent : t.border }]}>★</Text>
          </Pressable>
        ))}
      </View>
      {error ? <Text style={[styles.hint, styles.fullWidth, { color: t.warning }]}>{error}</Text> : null}
      {!userId ? (
        <Text style={[styles.hint, styles.fullWidth, { color: t.textMuted }]}>Tap a star to rate (free account).</Text>
      ) : null}
    </View>
  );
}

/** The person's private notes for one drink. */
export function PrivateNotes({ recipe }: { recipe: Recipe }) {
  const t = useTheme();
  const { userId } = useAuth();
  const { notes, setNote } = useBar();
  const [draft, setDraft] = useState(notes[recipe.id] ?? '');
  const saved = notes[recipe.id] ?? '';

  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border, marginTop: 24 }]}>
      <Text style={[styles.title, { color: t.text }]}>My notes 🔒</Text>
      <TextInput
        value={draft}
        onChangeText={setDraft}
        onEndEditing={() => setNote(recipe.id, draft)}
        onBlur={() => setNote(recipe.id, draft)}
        placeholder="Only you can see these. e.g. “Less lime next time”"
        placeholderTextColor={t.textMuted}
        multiline
        maxLength={2000}
        accessibilityLabel="My private notes"
        style={[styles.notes, { backgroundColor: t.surfaceAlt, color: t.text }]}
      />
      {draft !== saved ? (
        <Pressable onPress={() => setNote(recipe.id, draft)} style={[styles.save, { backgroundColor: t.accent }]}>
          <Text style={{ color: t.onAccent, fontWeight: '700' }}>Save note</Text>
        </Pressable>
      ) : saved ? (
        <Text style={[styles.hint, { color: t.textMuted }]}>
          {userId ? 'Saved and backed up to your account.' : 'Saved on this phone.'}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 14,
    padding: 12, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth,
  },
  barTitle: { fontSize: 15, fontWeight: '700' },
  fullWidth: { width: '100%' },
  card: { padding: 14, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, gap: 6 },
  title: { fontSize: 17, fontWeight: '700' },
  summary: { fontSize: 13 },
  stars: { flexDirection: 'row', gap: 4 },
  star: { fontSize: 30 },
  hint: { fontSize: 13 },
  notes: { minHeight: 80, fontSize: 15, padding: 12, borderRadius: radius.sm, textAlignVertical: 'top' },
  save: { alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 9, borderRadius: radius.pill },
});
