import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../state/AuthContext';
import { useBar } from '../state/BarContext';
import { radius, useTheme } from '../theme';

/** Number of favourites before we suggest backing them up. */
export const BACKUP_PROMPT_AFTER = 5;

/** Gentle, dismissible nudge to create an account once someone has a few favourites. */
export function BackupPrompt() {
  const t = useTheme();
  const { configured, userId } = useAuth();
  const { favorites, backupPromptDismissed, dismissBackupPrompt } = useBar();
  if (!configured || userId || backupPromptDismissed || favorites.size < BACKUP_PROMPT_AFTER) return null;

  return (
    <View style={[styles.card, { backgroundColor: t.accentSoft }]}>
      <View style={{ flex: 1, gap: 6 }}>
        <Text style={[styles.text, { color: t.text }]}>
          Create a free account to back up your favourites and sync across devices.
        </Text>
        <Pressable onPress={() => router.push({ pathname: '/account', params: { reason: 'backup' } })} hitSlop={6}>
          <Text style={[styles.cta, { color: t.accent }]}>Create free account ›</Text>
        </Pressable>
      </View>
      <Pressable onPress={dismissBackupPrompt} hitSlop={12} accessibilityLabel="Dismiss">
        <Text style={[styles.close, { color: t.textMuted }]}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 12, padding: 14, borderRadius: radius.md, alignItems: 'flex-start' },
  text: { fontSize: 15, lineHeight: 21 },
  cta: { fontSize: 15, fontWeight: '700' },
  close: { fontSize: 16, fontWeight: '600' },
});
