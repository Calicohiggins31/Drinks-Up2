import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Chip } from '../components/Chip';
import { IngredientPicker } from '../components/IngredientPicker';
import { ingredientName } from '../data/ingredients';
import type { Recipe, Unit } from '../data/recipes';
import { makeId, useBar } from '../state/BarContext';
import { radius, useTheme } from '../theme';

const EMOJIS = ['🍸', '🍹', '🥃', '🍷', '🥂', '🍺', '🍋', '🍊', '🍓', '🍍', '🥥', '🌿', '☕', '🔥', '💙', '⭐'];
const COLORS = ['#E8590C', '#2B9348', '#D7263D', '#3FA7D6', '#F2B544', '#8E44AD', '#C47A2C', '#E84A7F'];
const UNITS: Unit[] = ['oz', 'dash', 'tsp', 'slice', 'wedge', 'leaves', 'whole', 'top', 'pinch'];
const NEEDS_AMOUNT = new Set<Unit>(['oz', 'dash', 'tsp', 'slice', 'wedge', 'leaves', 'whole']);
const METHODS: Recipe['method'][] = ['Shake', 'Stir', 'Build', 'Muddle', 'Blend'];
const STRENGTHS: Recipe['strength'][] = ['None', 'Light', 'Medium', 'Strong'];

type Line = { key: string; id: string; amount: string; unit: Unit; optional: boolean };

let lineKey = 0;
const newKey = () => `l${lineKey++}`;

export default function RecipeEditor() {
  const t = useTheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { findRecipe, saveRecipe, units } = useBar();
  const existing = id ? findRecipe(id) : undefined;
  const ml = units === 'ml';

  const [name, setName] = useState(existing?.name ?? '');
  const [emoji, setEmoji] = useState(existing?.emoji ?? EMOJIS[0]);
  const [description, setDescription] = useState(existing?.description ?? '');
  const [about, setAbout] = useState(existing?.about ?? '');
  const [glass, setGlass] = useState(existing?.glass ?? '');
  const [method, setMethod] = useState<Recipe['method']>(existing?.method ?? 'Shake');
  const [strength, setStrength] = useState<Recipe['strength']>(existing?.strength ?? 'Medium');
  const [steps, setSteps] = useState(existing?.steps.join('\n') ?? '');
  const [lines, setLines] = useState<Line[]>(
    existing?.ingredients.map((i) => ({
      key: newKey(),
      id: i.id,
      unit: i.unit,
      optional: !!i.optional,
      amount: i.amount == null ? '' : String(ml && i.unit === 'oz' ? Math.round(i.amount * 30) : i.amount),
    })) ?? [],
  );
  const [picking, setPicking] = useState<string | 'new' | null>(null);

  const updateLine = (key: string, patch: Partial<Line>) =>
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, ...patch } : l)));

  const onPick = (ingredientId: string) => {
    if (picking === 'new') {
      setLines((prev) => [...prev, { key: newKey(), id: ingredientId, amount: '', unit: 'oz', optional: false }]);
    } else if (picking) {
      updateLine(picking, { id: ingredientId });
    }
    setPicking(null);
  };

  const fail = (msg: string) => (Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Almost there', msg));

  const save = () => {
    if (!name.trim()) return fail('Give your drink a name.');
    if (lines.length === 0) return fail('Add at least one ingredient.');
    const recipeId = existing?.id ?? makeId('drink_', name);
    const recipe: Recipe = {
      id: recipeId,
      name: name.trim(),
      emoji,
      color: COLORS[EMOJIS.indexOf(emoji) % COLORS.length] ?? COLORS[0],
      glass: glass.trim() || 'Any glass',
      method,
      strength,
      description: description.trim() || 'My own recipe.',
      about: about.trim() || undefined,
      custom: true,
      ingredients: lines.map((l) => {
        const n = parseFloat(l.amount.replace(',', '.'));
        const amount = Number.isFinite(n) && n > 0 ? (ml && l.unit === 'oz' ? n / 30 : n) : undefined;
        return { id: l.id, unit: l.unit, amount, optional: l.optional || undefined };
      }),
      steps: steps.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    saveRecipe(recipe);
    if (existing) router.back();
    else router.replace(`/drink/${recipeId}`);
  };

  const label = (text: string) => <Text style={[styles.label, { color: t.textMuted }]}>{text}</Text>;
  const inputStyle = [styles.input, { backgroundColor: t.surface, borderColor: t.border, color: t.text }];

  return (
    <>
      <Stack.Screen
        options={{
          title: existing ? 'Edit recipe' : 'New recipe',
          headerRight: () => (
            <Pressable onPress={save} hitSlop={10}>
              <Text style={{ color: t.accent, fontSize: 17, fontWeight: '700' }}>Save</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView
        style={{ backgroundColor: t.background }}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.private, { color: t.textMuted }]}>🔒 Saved only on this phone. Nobody else can see it.</Text>

        {label('Name')}
        <TextInput value={name} onChangeText={setName} placeholder="e.g. Grandpa's Punch" placeholderTextColor={t.textMuted} style={inputStyle} />

        {label('Icon')}
        <View style={styles.emojis}>
          {EMOJIS.map((e) => (
            <Pressable
              key={e}
              onPress={() => setEmoji(e)}
              style={[styles.emoji, { backgroundColor: e === emoji ? t.accentSoft : t.surface, borderColor: e === emoji ? t.accent : t.border }]}
            >
              <Text style={{ fontSize: 22 }}>{e}</Text>
            </Pressable>
          ))}
        </View>

        {label('Short description')}
        <TextInput value={description} onChangeText={setDescription} placeholder="One line, e.g. Fruity and fizzy" placeholderTextColor={t.textMuted} style={inputStyle} />

        {label('Ingredients')}
        {lines.map((l) => (
          <View key={l.key} style={[styles.line, { backgroundColor: t.surface, borderColor: t.border }]}>
            <View style={styles.lineTop}>
              <Pressable onPress={() => setPicking(l.key)} style={{ flex: 1 }}>
                <Text style={[styles.lineName, { color: t.text }]}>{ingredientName(l.id)} ›</Text>
              </Pressable>
              <Pressable onPress={() => setLines((prev) => prev.filter((x) => x.key !== l.key))} hitSlop={10}>
                <Text style={{ color: t.warning, fontWeight: '600' }}>Remove</Text>
              </Pressable>
            </View>
            <View style={styles.lineAmount}>
              {NEEDS_AMOUNT.has(l.unit) ? (
                <TextInput
                  value={l.amount}
                  onChangeText={(v) => updateLine(l.key, { amount: v })}
                  placeholder="Amount"
                  placeholderTextColor={t.textMuted}
                  keyboardType="decimal-pad"
                  style={[styles.amountInput, { backgroundColor: t.surfaceAlt, color: t.text }]}
                />
              ) : null}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
                {UNITS.map((unit) => (
                  <Pressable
                    key={unit}
                    onPress={() => updateLine(l.key, { unit })}
                    style={[styles.unit, { backgroundColor: l.unit === unit ? t.accent : t.surfaceAlt }]}
                  >
                    <Text style={{ color: l.unit === unit ? t.onAccent : t.text, fontWeight: '600', fontSize: 13 }}>
                      {unit === 'oz' && ml ? 'ml' : unit}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            <Pressable onPress={() => updateLine(l.key, { optional: !l.optional })} style={styles.optionalRow} hitSlop={6}>
              <Text style={{ color: l.optional ? t.accent : t.textMuted, fontSize: 14 }}>
                {l.optional ? '☑' : '☐'} Optional (garnish or nice-to-have)
              </Text>
            </Pressable>
          </View>
        ))}
        <Pressable onPress={() => setPicking('new')} style={[styles.addLine, { borderColor: t.accent }]}>
          <Text style={{ color: t.accent, fontWeight: '700', fontSize: 16 }}>+ Add ingredient</Text>
        </Pressable>

        {label('Steps (one per line)')}
        <TextInput
          value={steps}
          onChangeText={setSteps}
          multiline
          placeholder={'Shake everything with ice.\nStrain into a glass.'}
          placeholderTextColor={t.textMuted}
          style={[inputStyle, styles.multi]}
        />

        {label('How you make it')}
        <View style={styles.chips}>
          {METHODS.map((m) => <Chip key={m} label={m} selected={m === method} onPress={() => setMethod(m)} />)}
        </View>

        {label('Strength')}
        <View style={styles.chips}>
          {STRENGTHS.map((s) => (
            <Chip key={s} label={s === 'None' ? 'Alcohol-free' : s} selected={s === strength} onPress={() => setStrength(s)} />
          ))}
        </View>

        {label('Glass')}
        <TextInput value={glass} onChangeText={setGlass} placeholder="e.g. Highball" placeholderTextColor={t.textMuted} style={inputStyle} />

        {label('About this drink (optional)')}
        <TextInput
          value={about}
          onChangeText={setAbout}
          multiline
          placeholder="Where it comes from, what it tastes like, when you drink it…"
          placeholderTextColor={t.textMuted}
          style={[inputStyle, styles.multi]}
        />

        <Pressable onPress={save} style={({ pressed }) => [styles.saveBtn, { backgroundColor: t.accent, opacity: pressed ? 0.8 : 1 }]}>
          <Text style={{ color: t.onAccent, fontWeight: '700', fontSize: 17 }}>Save recipe</Text>
        </Pressable>
      </ScrollView>

      <IngredientPicker visible={picking !== null} onClose={() => setPicking(null)} onPick={onPick} />
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 60, gap: 8 },
  private: { fontSize: 13, marginBottom: 4 },
  label: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 14 },
  input: { fontSize: 16, paddingHorizontal: 14, paddingVertical: 11, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth },
  multi: { minHeight: 96, textAlignVertical: 'top' },
  emojis: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  emoji: { width: 46, height: 46, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  line: { padding: 12, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, gap: 10 },
  lineTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  lineName: { fontSize: 16, fontWeight: '600' },
  lineAmount: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  amountInput: { width: 80, fontSize: 16, paddingHorizontal: 10, paddingVertical: 8, borderRadius: radius.sm },
  unit: { paddingHorizontal: 11, paddingVertical: 7, borderRadius: radius.pill },
  optionalRow: { paddingVertical: 2 },
  addLine: { borderWidth: 1.5, borderStyle: 'dashed', borderRadius: radius.md, padding: 14, alignItems: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  saveBtn: { marginTop: 24, paddingVertical: 15, borderRadius: radius.pill, alignItems: 'center' },
});
