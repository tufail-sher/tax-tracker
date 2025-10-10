import { StatusBar } from 'expo-status-bar';
import CameraScannerScreen from '../src/scanner/screens/CameraScannerScreen';

export default function ScannerScreen() {
  return (
    <>
      <CameraScannerScreen />
      <StatusBar style="light" />
    </>
  );
}
