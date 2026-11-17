import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AgeGate } from '../components/AgeGate';
import { AccountSync } from '../state/AccountSync';
import { AuthProvider } from '../state/AuthContext';
import { BarProvider, useBar } from '../state/BarContext';
import { useTheme } from '../theme';

export default function RootLayout() {
  return (
    <BarProvider>
      <AuthProvider>
        <AccountSync />
        <StatusBar style="auto" />
        <Gated />
      </AuthProvider>
    </BarProvider>
  );
}

/** Nothing in the app is reachable until the age gate is passed. */
function Gated() {
  const t = useTheme();
  const { ageStatus } = useBar();
  if (ageStatus !== 'verified') return <AgeGate />;
  return (
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: t.background },
          headerTintColor: t.accent,
          headerTitleStyle: { color: t.text },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: t.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="drink/[id]" options={{ title: '', headerBackTitle: 'Back' }} />
        <Stack.Screen name="recipe-editor" options={{ title: 'New recipe', headerBackTitle: 'Cancel' }} />
        <Stack.Screen name="privacy" options={{ title: 'Privacy policy', headerBackTitle: 'Back' }} />
        <Stack.Screen name="account" options={{ title: 'Account', headerBackTitle: 'Back' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings', headerBackTitle: 'Back' }} />
      </Stack>
  );
}
