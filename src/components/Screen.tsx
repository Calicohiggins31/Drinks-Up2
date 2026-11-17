import type { ReactNode } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';

type Props = {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  /** Replaces the large title with a custom banner (used on Mix). */
  hero?: ReactNode;
  children: ReactNode;
};

/** Large-title scroll screen shared by the tabs. */
export function Screen({ title, subtitle, right, hero, children }: Props) {
  const t = useTheme();
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.safe, { backgroundColor: t.background }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {hero ? (
          <View style={styles.heroWrap} accessibilityLabel={title}>
            {hero}
          </View>
        ) : (
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: t.text }]}>{title}</Text>
              {subtitle ? <Text style={[styles.subtitle, { color: t.textMuted }]}>{subtitle}</Text> : null}
            </View>
            {right}
          </View>
        )}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function SectionTitle({ children, hint }: { children: ReactNode; hint?: string }) {
  const t = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: t.text }]}>{children}</Text>
      {hint ? <Text style={[styles.sectionHint, { color: t.textMuted }]}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 48, gap: 10 },
  // On web the tab bar floats at the top of the page, so leave room for it.
  header: { flexDirection: 'row', alignItems: 'flex-end', paddingTop: Platform.OS === 'web' ? 72 : 12, paddingBottom: 8, gap: 12 },
  heroWrap: { paddingTop: Platform.OS === 'web' ? 72 : 8, paddingBottom: 6 },
  title: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, marginTop: 2 },
  section: { marginTop: 18, marginBottom: 2 },
  sectionTitle: { fontSize: 20, fontWeight: '700' },
  sectionHint: { fontSize: 13, marginTop: 2 },
});
