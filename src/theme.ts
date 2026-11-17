import { useColorScheme } from 'react-native';

const light = {
  background: '#FBF7F2',
  surface: '#FFFFFF',
  surfaceAlt: '#F3ECE3',
  text: '#1E1A16',
  textMuted: '#6E655C',
  border: '#E6DDD2',
  accent: '#E8590C',
  accentSoft: '#FFE8D6',
  onAccent: '#FFFFFF',
  success: '#2B9348',
  successSoft: '#DFF5E3',
  warning: '#B7791F',
  warningSoft: '#FDF0D5',
};

const dark: typeof light = {
  background: '#14110F',
  surface: '#1F1B18',
  surfaceAlt: '#2A2521',
  text: '#F6EFE7',
  textMuted: '#A99E92',
  border: '#3A332D',
  accent: '#FF8A3D',
  accentSoft: '#3D2616',
  onAccent: '#1A0F07',
  success: '#5CD07A',
  successSoft: '#1C3322',
  warning: '#F2B544',
  warningSoft: '#3A2E14',
};

export type Theme = typeof light;

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light;
}

export const radius = { sm: 8, md: 14, lg: 20, pill: 999 };
