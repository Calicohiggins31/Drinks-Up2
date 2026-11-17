import Constants from 'expo-constants';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useAuth } from '../state/AuthContext';
import { useBar } from '../state/BarContext';
import { radius, useTheme, type Theme } from '../theme';

type RowProps = { t: Theme; title: string; detail?: string; right?: ReactNode; onPress?: () => void };

function Row({ t, title, detail, right, onPress }: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, { borderBottomColor: t.border, opacity: pressed ? 0.6 : 1 }]}
    >
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={[styles.rowTitle, { color: t.text }]}>{title}</Text>
        {detail ? <Text style={[styles.rowDetail, { color: t.textMuted }]}>{detail}</Text> : null}
      </View>
      {right ?? (onPress ? <Text style={[styles.chevron, { color: t.textMuted }]}>›</Text> : null)}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const t = useTheme();
  const { units, setUnits, shareUsageStats, setShareUsageStats } = useBar();
  const { configured, userId, email } = useAuth();

  return (
    <ScrollView style={{ backgroundColor: t.background }} contentContainerStyle={styles.content}>
      {configured ? (
        <>
          <Text style={[styles.group, { color: t.textMuted }]}>ACCOUNT</Text>
          <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Row
              t={t}
              title={userId ? 'Your account' : 'Create a free account'}
              detail={userId ? email ?? undefined : 'Make your own recipes and back up your favourites'}
              onPress={() => router.push('/account')}
            />
          </View>
        </>
      ) : null}

      <Text style={[styles.group, { color: t.textMuted }]}>UNITS</Text>
      <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
        <Row
              t={t}
          title="Measurements"
          right={
            <View style={[styles.toggle, { backgroundColor: t.surfaceAlt }]}>
              {(['oz', 'ml'] as const).map((u) => (
                <Pressable key={u} onPress={() => setUnits(u)} style={[styles.toggleItem, units === u && { backgroundColor: t.surface }]}>
                  <Text style={{ color: units === u ? t.text : t.textMuted, fontWeight: '600' }}>{u}</Text>
                </Pressable>
              ))}
            </View>
          }
        />
      </View>

      <Text style={[styles.group, { color: t.textMuted }]}>PRIVACY</Text>
      <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
        <Row
              t={t}
          title="Share anonymous usage stats"
          detail={
            userId
              ? 'Counts which ingredients and drinks are popular. Because you’re signed in, counts include your city and state.'
              : 'Counts which ingredients and drinks are popular. No name, email, ID or location is sent.'
          }
          right={
            <Switch
              value={shareUsageStats}
              onValueChange={setShareUsageStats}
              trackColor={{ true: t.accent, false: t.border }}
              accessibilityLabel="Share anonymous usage stats"
            />
          }
        />
        <Row t={t} title="Privacy policy" onPress={() => router.push('/privacy')} />
      </View>

      <Text style={[styles.version, { color: t.textMuted }]}>Drinks Up {Constants.expoConfig?.version ?? ''}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 48, gap: 8 },
  group: { fontSize: 12, fontWeight: '700', letterSpacing: 0.6, marginTop: 14, marginLeft: 4 },
  card: { borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 13, borderBottomWidth: StyleSheet.hairlineWidth },
  rowTitle: { fontSize: 16, fontWeight: '500' },
  rowDetail: { fontSize: 13, lineHeight: 18 },
  chevron: { fontSize: 24, fontWeight: '300' },
  toggle: { flexDirection: 'row', padding: 3, borderRadius: radius.sm },
  toggleItem: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.sm - 2 },
  version: { fontSize: 12, textAlign: 'center', marginTop: 20 },
});
