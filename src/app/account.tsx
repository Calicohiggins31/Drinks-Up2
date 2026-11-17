import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { isValidEmail, normalizeState } from '../lib/usStates';
import { friendlyAuthError, useAuth } from '../state/AuthContext';
import { radius, useTheme } from '../theme';

const REASONS: Record<string, string> = {
  recipe: 'Create a free account to make your own recipes. They\'ll be saved to your account so you never lose them.',
  backup: 'Create a free account to back up your favourites and use them on all your devices.',
};

export default function AccountScreen() {
  const t = useTheme();
  const auth = useAuth();
  const { reason } = useLocalSearchParams<{ reason?: string }>();
  const [mode, setMode] = useState<'create' | 'signin'>('create');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const inputStyle = [styles.input, { backgroundColor: t.surface, borderColor: t.border, color: t.text }];
  const confirm = (title: string, message: string, action: string, onYes: () => void) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`${title}\n\n${message}`)) onYes();
      return;
    }
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel' },
      { text: action, style: 'destructive', onPress: onYes },
    ]);
  };

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await fn();
    } catch (e) {
      setError(friendlyAuthError(e));
    } finally {
      setBusy(false);
    }
  };

  if (!auth.configured) {
    return (
      <View style={[styles.center, { backgroundColor: t.background }]}>
        <Text style={styles.big}>🛠️</Text>
        <Text style={[styles.title, { color: t.text }]}>Accounts are coming soon</Text>
        <Text style={[styles.body, { color: t.textMuted }]}>Account sign-up isn't switched on in this version yet.</Text>
      </View>
    );
  }

  if (auth.loading) {
    return (
      <View style={[styles.center, { backgroundColor: t.background }]}>
        <ActivityIndicator color={t.accent} />
      </View>
    );
  }

  // Signed in
  if (auth.userId) {
    return (
      <ScrollView style={{ backgroundColor: t.background }} contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Text style={[styles.title, { color: t.text }]}>{auth.profile?.name || 'Your account'}</Text>
          <Text style={[styles.body, { color: t.textMuted }]}>{auth.email}</Text>
          {auth.profile?.city ? (
            <Text style={[styles.body, { color: t.textMuted }]}>{auth.profile.city}, {auth.profile.state}</Text>
          ) : null}
          <Text style={[styles.ok, { color: t.success }]}>✓ Your favourites and recipes are backed up</Text>
        </View>
        {reason === 'recipe' ? (
          <Pressable onPress={() => router.replace('/recipe-editor')} style={[styles.primary, { backgroundColor: t.accent }]}>
            <Text style={[styles.primaryText, { color: t.onAccent }]}>Create a recipe</Text>
          </Pressable>
        ) : null}
        <Pressable
          onPress={() => run(auth.signOut)}
          disabled={busy}
          style={[styles.secondary, { borderColor: t.accent }]}
        >
          <Text style={[styles.secondaryText, { color: t.accent }]}>Sign out</Text>
        </Pressable>
        <Text style={[styles.fine, { color: t.textMuted }]}>
          Signing out keeps your favourites on this phone. Your own recipes stay safe in your account.
        </Text>
        <Pressable onPress={() => router.push('/privacy')}>
          <Text style={[styles.link, { color: t.accent }]}>Privacy policy</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            confirm(
              'Delete your account?',
              'This permanently deletes your account, your own recipes and your backed-up favourites. This can\'t be undone.',
              'Delete',
              () => run(auth.deleteAccount),
            )
          }
          disabled={busy}
          style={styles.danger}
        >
          <Text style={{ color: t.warning, fontWeight: '600' }}>Delete account</Text>
        </Pressable>
        {error ? <Text style={[styles.error, { color: t.warning }]}>{error}</Text> : null}
      </ScrollView>
    );
  }

  const submit = () => {
    if (!isValidEmail(email)) return setError('Please enter a valid email address.');
    if (password.length < 8) return setError('Your password needs to be at least 8 characters.');
    if (mode === 'signin') {
      return run(async () => {
        await auth.signIn(email, password);
        if (reason === 'recipe') router.replace('/recipe-editor');
      });
    }
    if (!name.trim()) return setError('Please enter your name.');
    if (!city.trim()) return setError('Please enter your city.');
    const st = normalizeState(state);
    if (!st) return setError('Please enter a US state, like IL or Illinois.');
    run(async () => {
      const { needsConfirmation } = await auth.signUp({ name, email, password, city, state: st });
      if (needsConfirmation) {
        setMode('signin');
        setNotice(`Almost done! We sent a confirmation link to ${email.trim()}. Tap it, then sign in here.`);
      } else if (reason === 'recipe') {
        router.replace('/recipe-editor');
      }
    });
  };

  return (
    <ScrollView style={{ backgroundColor: t.background }} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={[styles.title, { color: t.text }]}>{mode === 'create' ? 'Create a free account' : 'Sign in'}</Text>
      <Text style={[styles.body, { color: t.textMuted }]}>
        {REASONS[reason ?? ''] ?? 'Save your own recipes and back up your favourites across devices.'}
      </Text>

      <View style={[styles.tabs, { backgroundColor: t.surfaceAlt }]}>
        {(['create', 'signin'] as const).map((m) => (
          <Pressable
            key={m}
            onPress={() => { setMode(m); setError(''); }}
            style={[styles.tab, mode === m && { backgroundColor: t.surface }]}
          >
            <Text style={{ color: mode === m ? t.text : t.textMuted, fontWeight: '600' }}>
              {m === 'create' ? 'Create account' : 'Sign in'}
            </Text>
          </Pressable>
        ))}
      </View>

      {mode === 'create' ? (
        <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor={t.textMuted} autoComplete="name" style={inputStyle} />
      ) : null}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={t.textMuted}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        style={inputStyle}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={mode === 'create' ? 'Password (8+ characters)' : 'Password'}
        placeholderTextColor={t.textMuted}
        secureTextEntry
        autoComplete={mode === 'create' ? 'new-password' : 'current-password'}
        style={inputStyle}
      />
      {mode === 'create' ? (
        <View style={styles.row}>
          <TextInput value={city} onChangeText={setCity} placeholder="City" placeholderTextColor={t.textMuted} style={[inputStyle, { flexGrow: 2, flexBasis: 0, minWidth: 0 }]} />
          <TextInput
            value={state}
            onChangeText={setState}
            placeholder="State"
            placeholderTextColor={t.textMuted}
            autoCapitalize="characters"
            style={[inputStyle, { flexGrow: 1, flexBasis: 0, minWidth: 0 }]}
          />
        </View>
      ) : null}

      {error ? <Text style={[styles.error, { color: t.warning }]}>{error}</Text> : null}
      {notice ? <Text style={[styles.notice, { color: t.success, backgroundColor: t.successSoft }]}>{notice}</Text> : null}

      <Pressable onPress={submit} disabled={busy} style={[styles.primary, { backgroundColor: t.accent, opacity: busy ? 0.6 : 1 }]}>
        {busy ? <ActivityIndicator color={t.onAccent} /> : (
          <Text style={[styles.primaryText, { color: t.onAccent }]}>{mode === 'create' ? 'Create account' : 'Sign in'}</Text>
        )}
      </Pressable>

      {mode === 'signin' ? (
        <Pressable
          onPress={() => {
            if (!isValidEmail(email)) return setError('Enter your email above first.');
            run(async () => {
              await auth.resetPassword(email);
              setNotice('If that email has an account, we sent a link to reset your password.');
            });
          }}
        >
          <Text style={[styles.link, { color: t.accent }]}>Forgot password?</Text>
        </Pressable>
      ) : null}

      <Text style={[styles.fine, { color: t.textMuted }]}>
        By creating an account you confirm you are 21 or older and agree to our{' '}
        <Text style={{ color: t.accent }} onPress={() => router.push('/privacy')}>privacy policy</Text>.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 48, gap: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 8 },
  big: { fontSize: 48 },
  title: { fontSize: 24, fontWeight: '800' },
  body: { fontSize: 15, lineHeight: 21 },
  ok: { fontSize: 15, fontWeight: '600', marginTop: 8 },
  card: { padding: 16, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, gap: 4 },
  tabs: { flexDirection: 'row', padding: 3, borderRadius: radius.sm + 2, marginTop: 4 },
  tab: { flex: 1, paddingVertical: 9, borderRadius: radius.sm, alignItems: 'center' },
  input: { fontSize: 16, paddingHorizontal: 14, paddingVertical: 12, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth },
  row: { flexDirection: 'row', gap: 10 },
  error: { fontSize: 14 },
  notice: { fontSize: 14, padding: 12, borderRadius: radius.sm, overflow: 'hidden' },
  primary: { paddingVertical: 15, borderRadius: radius.pill, alignItems: 'center', marginTop: 4 },
  primaryText: { fontSize: 17, fontWeight: '700' },
  secondary: { paddingVertical: 13, borderRadius: radius.pill, alignItems: 'center', borderWidth: 1.5 },
  secondaryText: { fontSize: 16, fontWeight: '700' },
  link: { fontSize: 15, fontWeight: '600', textAlign: 'center', paddingVertical: 6 },
  danger: { alignItems: 'center', paddingVertical: 10, marginTop: 12 },
  fine: { fontSize: 12, textAlign: 'center', lineHeight: 17 },
});
