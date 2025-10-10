import { StatusBar } from 'expo-status-bar';
import { ProfileScreen } from '../../src/profile';

export default function ProfileTab() {
  return (
    <>
      <ProfileScreen />
      <StatusBar style="dark" />
    </>
  );
}
