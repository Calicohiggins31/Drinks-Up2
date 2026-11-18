import { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { IngredientPicker } from '../components/IngredientPicker';
import { ingredientName, LIST_ITEM_PREFIX } from '../data/ingredients';
import { findStoresNearby } from '../features/stores/storeFinder';
import { shoppingListText } from '../lib/shareText';
import { useAuth } from '../state/AuthContext';
import { useBar } from '../state/BarContext';
import { radius, useTheme } from '../theme';

export default function ShoppingListScreen() {
  const t = useTheme();
  const { shopping, toggleShoppingChecked, removeFromShopping, moveCheckedToBar, clearShopping, addToShopping } = useBar();
  const { userId } = useAuth();
  const [moved, setMoved] = useState(0);
  const [picking, setPicking] = useState(false);
  const picker = (
    <IngredientPicker
      visible={picking}
      title="Add to shopping list"
      customHint="to your list"
      onAddCustom={(name) => {
        addToShopping([`${LIST_ITEM_PREFIX}${name.slice(0, 60)}`]);
        setMoved(0);
        setPicking(false);
      }}
      onClose={() => setPicking(false)}
      onPick={(id) => {
        addToShopping([id]);
        setMoved(0);
        setPicking(false);
      }}
    />
  );
  const addButton = (
    <Pressable
      onPress={() => setPicking(true)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.addItem, { borderColor: t.accent, opacity: pressed ? 0.7 : 1 }]}
    >
      <Text style={[styles.secondaryText, { color: t.accent }]}>+ Add item</Text>
    </Pressable>
  );
  const ticked = shopping.filter((i) => i.checked).length;

  const confirmClear = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Clear your shopping list?')) clearShopping();
      return;
    }
    Alert.alert('Clear your shopping list?', 'This removes every item from the list.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearShopping },
    ]);
  };

  if (shopping.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: t.background }]}>
        <Text style={{ fontSize: 48 }}>🛒</Text>
        <Text style={[styles.title, { color: t.text }]}>{moved ? `Added ${moved} to My Bar` : 'Your list is empty'}</Text>
        <Text style={[styles.body, { color: t.textMuted }]}>
          Add anything you need below, or tap “Add to list” on the Mix screen or next to a missing ingredient on any drink.
        </Text>
        <View style={{ alignSelf: 'stretch', marginTop: 12 }}>{addButton}</View>
        {picker}
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: t.background }} contentContainerStyle={styles.content}>
      <Text style={[styles.body, { color: t.textMuted }]}>
        Tick items as you buy them, then move them to My Bar.{' '}
        {userId ? 'Backed up to your account.' : 'Saved on this phone.'}
      </Text>

      <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
        {shopping.map((item, idx) => (
          <View
            key={item.id}
            style={[styles.row, idx > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: t.border }]}
          >
            <Pressable
              onPress={() => toggleShoppingChecked(item.id)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: item.checked }}
              accessibilityLabel={ingredientName(item.id)}
              style={styles.tick}
              hitSlop={6}
            >
              <View style={[styles.box, { borderColor: item.checked ? t.success : t.border, backgroundColor: item.checked ? t.success : 'transparent' }]}>
                {item.checked ? <Text style={styles.boxTick}>✓</Text> : null}
              </View>
              <Text
                style={[
                  styles.name,
                  { color: item.checked ? t.textMuted : t.text, textDecorationLine: item.checked ? 'line-through' : 'none' },
                ]}
              >
                {ingredientName(item.id)}
              </Text>
            </Pressable>
            <Pressable onPress={() => removeFromShopping(item.id)} hitSlop={10} accessibilityLabel={`Remove ${ingredientName(item.id)}`}>
              <Text style={{ color: t.textMuted, fontSize: 16 }}>✕</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {addButton}

      <Pressable
        onPress={() => setMoved(moveCheckedToBar())}
        disabled={ticked === 0}
        style={[styles.primary, { backgroundColor: t.accent, opacity: ticked === 0 ? 0.4 : 1 }]}
      >
        <Text style={[styles.primaryText, { color: t.onAccent }]}>
          {ticked === 0 ? 'Tick what you bought' : `Done: add ${ticked} ticked to My Bar`}
        </Text>
      </Pressable>
      {moved ? <Text style={[styles.done, { color: t.success }]}>✓ Added {moved} to My Bar</Text> : null}

      <View style={styles.actions}>
        <Pressable
          onPress={() => Share.share({ message: shoppingListText(shopping) }).catch(() => {})}
          style={[styles.secondary, { borderColor: t.accent }]}
        >
          <Text style={[styles.secondaryText, { color: t.accent }]}>Share list</Text>
        </Pressable>
        <Pressable onPress={() => findStoresNearby().catch(() => {})} style={[styles.secondary, { borderColor: t.accent }]}>
          <Text style={[styles.secondaryText, { color: t.accent }]}>📍 Find a store</Text>
        </Pressable>
      </View>

      <Pressable onPress={confirmClear} style={styles.clear}>
        <Text style={{ color: t.warning, fontWeight: '600' }}>Clear list</Text>
      </Pressable>
      {picker}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 48, gap: 14 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 8 },
  title: { fontSize: 22, fontWeight: '800' },
  body: { fontSize: 15, lineHeight: 21, textAlign: 'center' },
  card: { borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  tick: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  box: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  boxTick: { color: '#fff', fontWeight: '800', fontSize: 14 },
  name: { fontSize: 16, flexShrink: 1 },
  primary: { paddingVertical: 15, borderRadius: radius.pill, alignItems: 'center' },
  primaryText: { fontSize: 17, fontWeight: '700' },
  done: { textAlign: 'center', fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 10 },
  secondary: { flex: 1, borderWidth: 1.5, borderRadius: radius.pill, paddingVertical: 12, alignItems: 'center' },
  secondaryText: { fontSize: 15, fontWeight: '700' },
  addItem: { borderWidth: 1.5, borderStyle: 'dashed', borderRadius: radius.md, paddingVertical: 13, alignItems: 'center' },
  clear: { alignItems: 'center', paddingVertical: 8 },
});
