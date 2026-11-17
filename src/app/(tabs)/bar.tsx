import { useMemo, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Chip } from '../../components/Chip';
import { Screen, SectionTitle } from '../../components/Screen';
import { CATEGORIES, INGREDIENTS, STARTER_KITS } from '../../data/ingredients';
import { useBar } from '../../state/BarContext';
import { radius, useTheme } from '../../theme';

export default function BarScreen() {
  const t = useTheme();
  const { owned, toggleIngredient, addIngredients, clearBar } = useBar();
  const [query, setQuery] = useState('');

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? INGREDIENTS.filter((i) => i.name.toLowerCase().includes(q)) : INGREDIENTS;
    return CATEGORIES.map((c) => ({ category: c, items: list.filter((i) => i.category === c) })).filter(
      (g) => g.items.length > 0,
    );
  }, [query]);

  const confirmClear = () => {
    if (Platform.OS === 'web') {
      clearBar();
      return;
    }
    Alert.alert('Clear your bar?', 'This removes every ingredient you have selected.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearBar },
    ]);
  };

  return (
    <Screen
      title="My Bar"
      subtitle={owned.size === 0 ? 'Tap everything you have at home' : `${owned.size} ingredients in stock`}
      right={
        owned.size > 0 ? (
          <Pressable onPress={confirmClear} hitSlop={8}>
            <Text style={[styles.clear, { color: t.accent }]}>Clear</Text>
          </Pressable>
        ) : null
      }
    >
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search ingredients"
        placeholderTextColor={t.textMuted}
        clearButtonMode="while-editing"
        autoCorrect={false}
        style={[styles.search, { backgroundColor: t.surfaceAlt, color: t.text }]}
      />

      {query === '' ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.kits}>
          {STARTER_KITS.map((kit) => (
            <Pressable
              key={kit.id}
              onPress={() => addIngredients(kit.ingredients)}
              style={({ pressed }) => [
                styles.kit,
                { backgroundColor: t.surface, borderColor: t.border, opacity: pressed ? 0.75 : 1 },
              ]}
            >
              <Text style={styles.kitEmoji}>{kit.emoji}</Text>
              <Text style={[styles.kitName, { color: t.text }]}>{kit.name}</Text>
              <Text style={[styles.kitHint, { color: t.textMuted }]}>Add {kit.ingredients.length} items</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      {grouped.length === 0 ? (
        <Text style={[styles.noResults, { color: t.textMuted }]}>No ingredients match "{query}".</Text>
      ) : null}

      {grouped.map((g) => {
        const have = g.items.filter((i) => owned.has(i.id)).length;
        return (
          <View key={g.category}>
            <SectionTitle hint={have > 0 ? `${have} of ${g.items.length} selected` : undefined}>
              {g.category}
            </SectionTitle>
            <View style={styles.chips}>
              {g.items.map((i) => (
                <Chip key={i.id} label={i.name} selected={owned.has(i.id)} onPress={() => toggleIngredient(i.id)} />
              ))}
            </View>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  clear: { fontSize: 16, fontWeight: '600', paddingBottom: 6 },
  search: { fontSize: 16, paddingHorizontal: 14, paddingVertical: 11, borderRadius: radius.md },
  kits: { gap: 10, paddingVertical: 4 },
  kit: { width: 150, padding: 12, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, gap: 2 },
  kitEmoji: { fontSize: 26 },
  kitName: { fontSize: 15, fontWeight: '600', marginTop: 4 },
  kitHint: { fontSize: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  noResults: { fontSize: 15, marginTop: 16, textAlign: 'center' },
});
