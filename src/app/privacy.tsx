import { ScrollView, StyleSheet, Text } from 'react-native';
import { PRIVACY_POLICY } from '../content/privacyPolicy';
import { useTheme } from '../theme';

export default function PrivacyScreen() {
  const t = useTheme();
  return (
    <ScrollView style={{ backgroundColor: t.background }} contentContainerStyle={styles.content}>
      {PRIVACY_POLICY.map((s) => (
        <Text key={s.heading} style={{ color: t.text }}>
          <Text style={styles.heading}>{s.heading}{'\n'}</Text>
          {s.body.map((p, i) => (
            <Text key={i} style={[styles.body, { color: t.text }]}>{p}{'\n\n'}</Text>
          ))}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 48 },
  heading: { fontSize: 18, fontWeight: '700', lineHeight: 30 },
  body: { fontSize: 15, lineHeight: 22 },
});
