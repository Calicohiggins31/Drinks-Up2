import { useRef, useState, type ComponentRef, type RefObject } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ageOn, LEGAL_AGE, parseBirthDate } from '../lib/age';
import { useBar } from '../state/BarContext';
import { radius, useTheme } from '../theme';

type InputRef = RefObject<ComponentRef<typeof TextInput> | null>;

/**
 * Shown before anything else until the user confirms they are of legal drinking age.
 * Only the result is stored on the phone, never the birth date itself.
 */
export function AgeGate() {
  const t = useTheme();
  const { ready, ageStatus, setAgeStatus } = useBar();
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const dayRef = useRef<ComponentRef<typeof TextInput>>(null);
  const yearRef = useRef<ComponentRef<typeof TextInput>>(null);

  if (!ready) return <View style={[styles.fill, { backgroundColor: t.background }]} />;

  if (ageStatus === 'denied') {
    return (
      <SafeAreaView style={[styles.fill, styles.center, { backgroundColor: t.background }]}>
        <Text style={styles.bigEmoji}>🚫</Text>
        <Text style={[styles.title, { color: t.text }]}>Sorry, you can't use Drinks Up</Text>
        <Text style={[styles.body, { color: t.textMuted }]}>
          You must be {LEGAL_AGE} or older to use this app.
        </Text>
      </SafeAreaView>
    );
  }

  const submit = () => {
    const birth = parseBirthDate(month, day, year);
    if (!birth) {
      setError('Please enter a real date of birth, like 04 / 27 / 1990.');
      return;
    }
    setAgeStatus(ageOn(birth) >= LEGAL_AGE ? 'verified' : 'denied');
  };

  const field = (
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    maxLength: number,
    next?: InputRef,
    ref?: InputRef,
  ) => (
    <TextInput
      ref={ref}
      value={value}
      onChangeText={(v) => {
        const digits = v.replace(/\D/g, '').slice(0, maxLength);
        onChange(digits);
        setError('');
        if (digits.length === maxLength) next?.current?.focus();
      }}
      placeholder={placeholder}
      placeholderTextColor={t.textMuted}
      keyboardType="number-pad"
      maxLength={maxLength}
      accessibilityLabel={placeholder === 'MM' ? 'Birth month' : placeholder === 'DD' ? 'Birth day' : 'Birth year'}
      onSubmitEditing={next ? () => next.current?.focus() : submit}
      style={[
        styles.input,
        { flexGrow: maxLength === 4 ? 1.6 : 1, flexBasis: 0, minWidth: 0, backgroundColor: t.surface, borderColor: error ? t.warning : t.border, color: t.text },
      ]}
    />
  );

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: t.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.fill, styles.center]}>
        <Text style={styles.bigEmoji}>🍸</Text>
        <Text style={[styles.brand, { color: t.text }]}>Drinks Up</Text>
        <Text style={[styles.title, { color: t.text }]}>Are you {LEGAL_AGE} or older?</Text>
        <Text style={[styles.body, { color: t.textMuted }]}>
          This app contains alcohol recipes. Enter your date of birth to continue.
        </Text>

        <View style={styles.row}>
          {field(month, setMonth, 'MM', 2, dayRef)}
          <Text style={[styles.slash, { color: t.textMuted }]}>/</Text>
          {field(day, setDay, 'DD', 2, yearRef, dayRef)}
          <Text style={[styles.slash, { color: t.textMuted }]}>/</Text>
          {field(year, setYear, 'YYYY', 4, undefined, yearRef)}
        </View>
        {error ? <Text style={[styles.error, { color: t.warning }]}>{error}</Text> : null}

        <Pressable
          onPress={submit}
          accessibilityRole="button"
          style={({ pressed }) => [styles.button, { backgroundColor: t.accent, opacity: pressed ? 0.8 : 1 }]}
        >
          <Text style={[styles.buttonText, { color: t.onAccent }]}>Continue</Text>
        </Pressable>

        <Text style={[styles.fine, { color: t.textMuted }]}>
          Your date of birth isn't stored. Please drink responsibly.
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28, gap: 10 },
  bigEmoji: { fontSize: 64 },
  brand: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  body: { fontSize: 16, textAlign: 'center', lineHeight: 22 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16, width: '100%', maxWidth: 340 },
  input: {
    fontSize: 22, fontWeight: '600', textAlign: 'center', paddingVertical: 14, borderRadius: radius.md, borderWidth: 1,
  },
  slash: { fontSize: 22 },
  error: { fontSize: 14, textAlign: 'center' },
  button: { marginTop: 16, paddingVertical: 15, borderRadius: radius.pill, width: '100%', maxWidth: 340, alignItems: 'center' },
  buttonText: { fontSize: 17, fontWeight: '700' },
  fine: { fontSize: 12, textAlign: 'center', marginTop: 12 },
});
