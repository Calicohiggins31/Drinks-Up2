import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { Recipe } from '../data/recipes';
import { fetchMyRating, fetchRatingSummary, ratingLabel, saveMyRating, type RatingSummary } from '../lib/ratings';
import { useAuth } from '../state/AuthContext';
import { useBar } from '../state/BarContext';
import { radius, useTheme } from '../theme';

/** Public star rating (average for everyone) and the person's private notes for one drink. */
export function RatingAndNotes({ recipe }: { recipe: Recipe }) {
  const t = useTheme();
  const { configured, userId } = useAuth();
  const { notes, setNote } = useBar();
  const canRate = configured && !recipe.custom;

  const [summary, setSummary] = useState<RatingSummary | null>(null);
  const [mine, setMine] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState(notes[recipe.id] ?? '');
  const saved = notes[recipe.id] ?? '';

  useEffect(() => {
    if (!canRate) return;
    let live = true;
    fetchRatingSummary(recipe.id).then((s) => live && setSummary(s));
    if (userId) fetchMyRating(userId, recipe.id).then((s) => live && setMine(s));
    return () => {
      live = false;
    };
  }, [canRate, recipe.id, userId]);

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
      setError('Couldn’t save your rating. Check your connection and try again.');
    }
  };

  return (
    <View style={styles.wrap}>
      {canRate ? (
        <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Text style={[styles.title, { color: t.text }]}>Rating</Text>
          <Text style={[styles.summary, { color: t.textMuted }]}>{ratingLabel(summary)}</Text>
          <View style={styles.stars} accessibilityRole="adjustable" accessibilityLabel={`Your rating: ${mine ?? 0} of 5`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable key={n} onPress={() => rate(n)} hitSlop={6} accessibilityLabel={`Rate ${n} star${n > 1 ? 's' : ''}`}>
                <Text style={[styles.star, { color: mine && n <= mine ? t.accent : t.border }]}>★</Text>
              </Pressable>
            ))}
          </View>
          <Text style={[styles.hint, { color: t.textMuted }]}>
            {userId ? (mine ? 'Your rating. Tap to change it.' : 'Tap to rate.') : 'Sign in with a free account to rate.'}
          </Text>
          {error ? <Text style={[styles.hint, { color: t.warning }]}>{error}</Text> : null}
        </View>
      ) : null}

      <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12, marginTop: 24 },
  card: { padding: 14, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, gap: 6 },
  title: { fontSize: 17, fontWeight: '700' },
  summary: { fontSize: 14 },
  stars: { flexDirection: 'row', gap: 8, marginTop: 2 },
  star: { fontSize: 34 },
  hint: { fontSize: 13 },
  notes: { minHeight: 80, fontSize: 15, padding: 12, borderRadius: radius.sm, textAlignVertical: 'top' },
  save: { alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 9, borderRadius: radius.pill },
});
