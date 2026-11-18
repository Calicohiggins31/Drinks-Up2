import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { INGREDIENTS } from '../data/ingredients';
import { useBar } from '../state/BarContext';
import { radius, useTheme } from '../theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onPick: (id: string) => void;
  title?: string;
  /** Offer "Add … as your own ingredient" for anything not on the list (default true). */
  allowCustom?: boolean;
  /** If set, typed-in items are passed here instead of becoming a custom ingredient. */
  onAddCustom?: (name: string) => void;
  /** Wording for the typed-in option, e.g. "to your list". */
  customHint?: string;
};

/** Full-screen searchable list of every ingredient, with the option to add your own. */
export function IngredientPicker({
  visible,
  onClose,
  onPick,
  title = 'Choose ingredient',
  allowCustom = true,
  onAddCustom,
  customHint = 'as your own ingredient',
}: Props) {
  const t = useTheme();
  const { customIngredients, addCustomIngredient } = useBar();
  const [query, setQuery] = useState('');

  const all = useMemo(() => [...customIngredients, ...INGREDIENTS], [customIngredients]);
  const q = query.trim().toLowerCase();
  const list = q ? all.filter((i) => i.name.toLowerCase().includes(q)) : all;
  const exact = all.some((i) => i.name.toLowerCase() === q);

  const pick = (id: string) => {
    setQuery('');
    onPick(id);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: t.text }]}>{title}</Text>
          <Pressable onPress={onClose} hitSlop={10}>
            <Text style={[styles.close, { color: t.accent }]}>Cancel</Text>
          </Pressable>
        </View>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder={allowCustom ? 'Search or type a new ingredient' : 'Search ingredients'}
          placeholderTextColor={t.textMuted}
          autoFocus
          autoCorrect={false}
          style={[styles.search, { backgroundColor: t.surfaceAlt, color: t.text }]}
        />
        {allowCustom && q && !exact ? (
          <Pressable
            onPress={() => {
              if (onAddCustom) {
                onAddCustom(query.trim());
                setQuery('');
              } else {
                pick(addCustomIngredient(query));
              }
            }}
            style={[styles.addNew, { backgroundColor: t.accentSoft }]}
          >
            <Text style={[styles.addNewText, { color: t.text }]}>
              + Add “{query.trim()}” {customHint}
            </Text>
          </Pressable>
        ) : null}
        <FlatList
          data={list}
          keyExtractor={(i) => i.id}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => pick(item.id)}
              style={({ pressed }) => [styles.row, { borderBottomColor: t.border, opacity: pressed ? 0.6 : 1 }]}
            >
              <Text style={[styles.rowName, { color: t.text }]}>{item.name}</Text>
              <Text style={[styles.rowCat, { color: t.textMuted }]}>{item.category}</Text>
            </Pressable>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
  title: { fontSize: 22, fontWeight: '700' },
  close: { fontSize: 16, fontWeight: '600' },
  search: { fontSize: 16, paddingHorizontal: 14, paddingVertical: 11, borderRadius: radius.md, marginBottom: 8 },
  addNew: { padding: 14, borderRadius: radius.md, marginBottom: 8 },
  addNewText: { fontSize: 15, fontWeight: '600' },
  row: { paddingVertical: 13, borderBottomWidth: StyleSheet.hairlineWidth },
  rowName: { fontSize: 16 },
  rowCat: { fontSize: 12, marginTop: 2 },
});
