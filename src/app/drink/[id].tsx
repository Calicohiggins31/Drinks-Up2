import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { BackupPrompt } from '../../components/BackupPrompt';
import { PrivateNotes, RatingBar } from '../../components/RatingAndNotes';
import { ingredientName } from '../../data/ingredients';
import { formatAmount, hasIngredient, matchRecipe, SERVING_OPTIONS, usedIngredient } from '../../lib/matching';
import { recipeShareText } from '../../lib/shareText';
import { trackView } from '../../lib/usage';
import { useBar } from '../../state/BarContext';
import { radius, useTheme } from '../../theme';

export default function DrinkScreen() {
  const t = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    owned, favorites, toggleFavorite, toggleIngredient, units, setUnits, findRecipe, deleteRecipe, shopping, addToShopping,
  } = useBar();
  const listed = new Set(shopping.map((i) => i.id));
  const recipe = findRecipe(id);
  const [servings, setServings] = useState(1);
  const builtIn = recipe && !recipe.custom;
  useEffect(() => {
    if (builtIn) trackView(id); // anonymous count; never for people's own recipes
  }, [id, builtIn]);

  if (!recipe) {
    return (
      <View style={[styles.center, { backgroundColor: t.background }]}>
        <Text style={{ color: t.textMuted }}>That drink could not be found.</Text>
      </View>
    );
  }

  const { canMake, missing } = matchRecipe(recipe, owned);
  const isFav = favorites.has(recipe.id);

  const share = () => {
    Share.share({ title: recipe.name, message: recipeShareText(recipe, units, servings) }).catch(() => {});
  };

  const confirmDelete = () => {
    const remove = () => {
      deleteRecipe(recipe.id);
      router.back();
    };
    if (Platform.OS === 'web') {
      if (window.confirm(`Delete ${recipe.name}?`)) remove();
      return;
    }
    Alert.alert(`Delete ${recipe.name}?`, 'This removes your recipe from this phone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: remove },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: recipe.name,
          headerRight: () => (
            <View style={styles.headerBtns}>
              <Pressable onPress={share} hitSlop={10} accessibilityLabel="Share recipe">
                <Text style={{ fontSize: 15, fontWeight: '700', color: t.accent }}>Share</Text>
              </Pressable>
              <Pressable
                onPress={() => toggleFavorite(recipe.id)}
                hitSlop={10}
                accessibilityLabel={isFav ? 'Remove from saved' : 'Save drink'}
              >
                <Text style={{ fontSize: 24, color: t.accent }}>{isFav ? '♥' : '♡'}</Text>
              </Pressable>
            </View>
          ),
        }}
      />
      <ScrollView style={{ backgroundColor: t.background }} contentContainerStyle={styles.content}>
        <View style={[styles.hero, { backgroundColor: recipe.color + '33' }]}>
          <Text style={styles.heroEmoji}>{recipe.emoji}</Text>
        </View>

        {recipe.custom ? (
          <View style={[styles.yours, { backgroundColor: t.accentSoft }]}>
            <Text style={[styles.yoursText, { color: t.accent }]}>🔒 Your recipe</Text>
          </View>
        ) : null}
        <Text style={[styles.name, { color: t.text }]}>{recipe.name}</Text>
        <Text style={[styles.description, { color: t.textMuted }]}>{recipe.description}</Text>

        <View style={styles.meta}>
          {[recipe.glass, recipe.method, recipe.strength === 'None' ? 'Alcohol-free' : `${recipe.strength} strength`].map(
            (m) => (
              <View key={m} style={[styles.metaPill, { backgroundColor: t.surfaceAlt }]}>
                <Text style={[styles.metaText, { color: t.text }]}>{m}</Text>
              </View>
            ),
          )}
        </View>

        <RatingBar key={`rating-${recipe.id}`} recipe={recipe} />

        {isFav ? <View style={{ marginTop: 16 }}><BackupPrompt /></View> : null}

        {recipe.about ? (
          <View style={[styles.aboutBox, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Text style={[styles.aboutTitle, { color: t.text }]}>About this drink</Text>
            <Text style={[styles.aboutText, { color: t.text }]}>{recipe.about}</Text>
          </View>
        ) : null}

        <View
          style={[styles.banner, { backgroundColor: canMake ? t.successSoft : t.warningSoft }]}
          accessibilityLiveRegion="polite"
        >
          <Text style={[styles.bannerText, { color: canMake ? t.success : t.warning }]}>
            {canMake
              ? '✓ You have everything for this one'
              : `Missing ${missing.length}: ${missing.map((m) => ingredientName(m.id)).join(', ')}`}
          </Text>
          {!canMake ? (
            missing.every((m) => listed.has(m.id)) ? (
              <Pressable onPress={() => router.push('/shopping')} hitSlop={6}>
                <Text style={[styles.bannerLink, { color: t.accent }]}>🛒 On your shopping list ›</Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => addToShopping(missing.map((m) => m.id))} hitSlop={6}>
                <Text style={[styles.bannerLink, { color: t.accent }]}>+ Add missing to shopping list</Text>
              </Pressable>
            )
          ) : null}
        </View>

        <View style={styles.sectionRow}>
          <Text style={[styles.sectionTitle, { color: t.text }]}>Ingredients</Text>
          <View style={[styles.unitToggle, { backgroundColor: t.surfaceAlt }]}>
            {(['oz', 'ml'] as const).map((u) => (
              <Pressable
                key={u}
                onPress={() => setUnits(u)}
                style={[styles.unitItem, units === u && { backgroundColor: t.surface }]}
              >
                <Text style={{ color: units === u ? t.text : t.textMuted, fontWeight: '600' }}>{u}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.servingsRow}>
          <Text style={[styles.servingsLabel, { color: t.textMuted }]}>Making for</Text>
          <View style={[styles.unitToggle, { backgroundColor: t.surfaceAlt }]}>
            {SERVING_OPTIONS.map((n) => (
              <Pressable
                key={n}
                onPress={() => setServings(n)}
                accessibilityRole="button"
                accessibilityLabel={`Making for ${n}`}
                accessibilityState={{ selected: servings === n }}
                style={[styles.unitItem, servings === n && { backgroundColor: t.surface }]}
              >
                <Text style={{ color: servings === n ? t.text : t.textMuted, fontWeight: '600' }}>{n}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        {servings > 2 && recipe.method === 'Shake' ? (
          <Text style={[styles.batchTip, { color: t.textMuted }]}>
            Tip: most shakers hold 2 drinks. Shake in batches, or build in a pitcher and stir with ice.
          </Text>
        ) : null}

        <View style={[styles.list, { backgroundColor: t.surface, borderColor: t.border }]}>
          {recipe.ingredients.map((item, idx) => {
            const have = hasIngredient(item, owned);
            const using = usedIngredient(item, owned);
            const swapped = using && using !== item.id;
            return (
              <View
                key={item.id}
                style={[
                  styles.row,
                  idx > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: t.border },
                ]}
              >
                <Text style={[styles.mark, { color: have ? t.success : item.optional ? t.textMuted : t.warning }]}>
                  {have ? '✓' : item.optional ? '○' : '✕'}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.ingName, { color: t.text }]}>
                    {ingredientName(swapped ? using : item.id)}
                    {item.optional ? <Text style={{ color: t.textMuted }}> (optional)</Text> : null}
                  </Text>
                  {swapped ? (
                    <Text style={[styles.ingNote, { color: t.textMuted }]}>Instead of {ingredientName(item.id)}</Text>
                  ) : item.alternatives?.length && !have ? (
                    <Text style={[styles.ingNote, { color: t.textMuted }]}>
                      or {item.alternatives.map(ingredientName).join(' / ')}
                    </Text>
                  ) : null}
                </View>
                <Text style={[styles.amount, { color: t.textMuted }]}>{formatAmount(item, units, servings)}</Text>
                {!have ? (
                  <View style={styles.rowBtns}>
                    <Pressable
                      onPress={() => toggleIngredient(item.id)}
                      hitSlop={6}
                      accessibilityLabel={`I have ${ingredientName(item.id)}`}
                      style={[styles.haveBtn, { borderColor: t.accent }]}
                    >
                      <Text style={{ color: t.accent, fontWeight: '700', fontSize: 13 }}>I have it</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => (listed.has(item.id) ? router.push('/shopping') : addToShopping([item.id]))}
                      hitSlop={6}
                      accessibilityLabel={
                        listed.has(item.id) ? `${ingredientName(item.id)} is on your list` : `Add ${ingredientName(item.id)} to shopping list`
                      }
                    >
                      <Text style={{ color: listed.has(item.id) ? t.success : t.textMuted, fontWeight: '700', fontSize: 13 }}>
                        {listed.has(item.id) ? '✓ Listed' : '+ List'}
                      </Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { color: t.text, marginTop: 24 }]}>Method</Text>
        {recipe.steps.map((step, i) => (
          <View key={i} style={styles.step}>
            <View style={[styles.stepNum, { backgroundColor: t.accent }]}>
              <Text style={{ color: t.onAccent, fontWeight: '700' }}>{i + 1}</Text>
            </View>
            <Text style={[styles.stepText, { color: t.text }]}>{step}</Text>
          </View>
        ))}

        <PrivateNotes key={recipe.id} recipe={recipe} />

        {recipe.custom ? (
          <View style={styles.customActions}>
            <Pressable
              onPress={() => router.push({ pathname: '/recipe-editor', params: { id: recipe.id } })}
              style={[styles.actionBtn, { backgroundColor: t.accent }]}
            >
              <Text style={{ color: t.onAccent, fontWeight: '700', fontSize: 16 }}>Edit recipe</Text>
            </Pressable>
            <Pressable onPress={confirmDelete} style={[styles.actionBtn, { borderWidth: 1, borderColor: t.warning }]}>
              <Text style={{ color: t.warning, fontWeight: '700', fontSize: 16 }}>Delete</Text>
            </Pressable>
          </View>
        ) : null}

        <Text style={[styles.footnote, { color: t.textMuted }]}>
          Ice and water are assumed. Please drink responsibly.
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 16, paddingBottom: 48 },
  hero: { height: 160, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center' },
  heroEmoji: { fontSize: 84 },
  name: { fontSize: 30, fontWeight: '800', marginTop: 16, letterSpacing: -0.5 },
  description: { fontSize: 16, marginTop: 4, lineHeight: 22 },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  metaPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill },
  metaText: { fontSize: 13, fontWeight: '600' },
  banner: { marginTop: 16, padding: 14, borderRadius: radius.md },
  bannerText: { fontSize: 15, fontWeight: '600' },
  bannerLink: { fontSize: 15, fontWeight: '700', marginTop: 8 },
  rowBtns: { alignItems: 'flex-end', gap: 6 },
  headerBtns: { flexDirection: 'row', alignItems: 'center', gap: 18 },
  servingsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  servingsLabel: { fontSize: 15, fontWeight: '600' },
  batchTip: { fontSize: 13, marginTop: 8, lineHeight: 18 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700' },
  unitToggle: { flexDirection: 'row', padding: 3, borderRadius: radius.sm },
  unitItem: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.sm - 2 },
  list: { marginTop: 10, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  mark: { fontSize: 16, fontWeight: '700', width: 18, textAlign: 'center' },
  ingName: { fontSize: 16 },
  ingNote: { fontSize: 12, marginTop: 1 },
  amount: { fontSize: 15 },
  haveBtn: { borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
  step: { flexDirection: 'row', gap: 12, marginTop: 12, alignItems: 'flex-start' },
  stepNum: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stepText: { flex: 1, fontSize: 16, lineHeight: 23, paddingTop: 3 },
  yours: { alignSelf: 'flex-start', marginTop: 16, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  yoursText: { fontSize: 13, fontWeight: '700' },
  aboutBox: { marginTop: 16, padding: 14, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, gap: 6 },
  aboutTitle: { fontSize: 16, fontWeight: '700' },
  aboutText: { fontSize: 15, lineHeight: 22 },
  customActions: { flexDirection: 'row', gap: 10, marginTop: 28 },
  actionBtn: { flex: 1, paddingVertical: 13, borderRadius: radius.pill, alignItems: 'center' },
  footnote: { fontSize: 12, marginTop: 28, textAlign: 'center' },
});
