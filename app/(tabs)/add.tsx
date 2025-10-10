import { StatusBar } from 'expo-status-bar';
import { AddScreen } from '../../src/add';

export default function AddTab() {
  return (
    <>
      <AddScreen />
      <StatusBar style="dark" />
    </>
  );
}
