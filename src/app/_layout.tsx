import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BarProvider } from '../state/BarContext';
import { useTheme } from '../theme';

export default function RootLayout() {
  const t = useTheme();
  return (
    <BarProvider>
      <StatusBar style="auto" />
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
      </Stack>
    </BarProvider>
  );
}
