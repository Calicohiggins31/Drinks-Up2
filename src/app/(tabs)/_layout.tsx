import { NativeTabs } from 'expo-router/native-tabs';
import { useBar } from '../../state/BarContext';
import { useTheme } from '../../theme';

export default function TabsLayout() {
  const t = useTheme();
  const { owned } = useBar();
  return (
    <NativeTabs tintColor={t.accent}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Mix</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'wineglass', selected: 'wineglass.fill' }} md="local_bar" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="bar">
        <NativeTabs.Trigger.Label>My Bar</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'cabinet', selected: 'cabinet.fill' }} md="liquor" />
        {owned.size > 0 ? <NativeTabs.Trigger.Badge>{String(owned.size)}</NativeTabs.Trigger.Badge> : null}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="saved">
        <NativeTabs.Trigger.Label>Saved</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'heart', selected: 'heart.fill' }} md="favorite" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
