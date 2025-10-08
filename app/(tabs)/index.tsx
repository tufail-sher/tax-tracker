import { StatusBar } from 'expo-status-bar';
import HomeScreen from '../../src/home/screens/HomeScreen';

export default function HomeTab() {
  return (
    <>
      <HomeScreen />
      <StatusBar style="dark" />
    </>
  );
}