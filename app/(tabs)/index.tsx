import { ScreenContent } from '../../src/components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

export default function HomeTab() {
  return (
    <>
      <ScreenContent title="Tax Tracker" path="app/(tabs)/index.tsx" />
      <StatusBar style="auto" />
    </>
  );
}