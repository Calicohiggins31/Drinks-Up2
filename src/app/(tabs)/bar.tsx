import { useMemo, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Chip } from '../../components/Chip';
import { Screen, SectionTitle } from '../../components/Screen';
import { CATEGORIES, INGREDIENTS } from '../../data/ingredients';
import { useBar } from '../../state/BarContext';
import { radius, useTheme } from '../../theme';

export default function BarScreen() {
  const t = useTheme();
  const { owned, toggleIngredient, clearBar, customIngredients, addCustomIngredient, deleteCustomIngredient } = useBar();
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const all = useMemo(() => [...INGREDIENTS, ...customIngredients], [customIngredients]);
  const exactMatch = all.some((i) => i.name.toLowerCase() === q);

  const grouped = useMemo(() => {
    const list = q ? all.filter((i) => i.name.toLowerCase().includes(q)) : all;
    return CATEGORIES.map((c) => ({ category: c, items: list.filter((i) => i.category === c) })).filter(
      (g) => g.items.length > 0,
    );
  }, [q, all]);

  const addOwn = () => {
    const id = addCustomIngredient(query);
    if (!owned.has(id)) toggleIngredient(id);
    setQuery('');
  };

  const confirmDeleteOwn = (id: string, name: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Delete "${name}"?`)) deleteCustomIngredient(id);
      return;
    }
    Alert.alert(`Delete "${name}"?`, 'It will be removed from your bar. Your recipes that use it will show it as missing.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteCustomIngredient(id) },
    ]);
  };

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
        placeholder="Search, or add your own"
        placeholderTextColor={t.textMuted}
        clearButtonMode="while-editing"
        autoCorrect={false}
        style={[styles.search, { backgroundColor: t.surfaceAlt, color: t.text }]}
      />

      {q && !exactMatch ? (
        <Pressable onPress={addOwn} style={[styles.addOwn, { backgroundColor: t.accentSoft }]}>
          <Text style={[styles.addOwnText, { color: t.text }]}>+ Add “{query.trim()}” as your own ingredient</Text>
          <Text style={[styles.hint, { color: t.textMuted }]}>Not on the list? Add it and use it in your own recipes.</Text>
        </Pressable>
      ) : null}

      {grouped.map((g) => {
        const have = g.items.filter((i) => owned.has(i.id)).length;
        return (
          <View key={g.category}>
            <SectionTitle
              hint={
                g.category === 'Your own'
                  ? 'Press and hold one to delete it'
                  : have > 0
                    ? `${have} of ${g.items.length} selected`
                    : undefined
              }
            >
              {g.category}
            </SectionTitle>
            <View style={styles.chips}>
              {g.items.map((i) => (
                <Chip
                  key={i.id}
                  label={i.name}
                  selected={owned.has(i.id)}
                  onPress={() => toggleIngredient(i.id)}
                  onLongPress={g.category === 'Your own' ? () => confirmDeleteOwn(i.id, i.name) : undefined}
                />
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
  hint: { fontSize: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  addOwn: { padding: 14, borderRadius: 14, gap: 4 },
  addOwnText: { fontSize: 15, fontWeight: '600' },
});
