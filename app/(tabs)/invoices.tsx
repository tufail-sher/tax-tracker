import { StatusBar } from 'expo-status-bar';
import InvoicesScreen from '../../src/invoices/screens/InvoicesScreen';

export default function InvoicesTab() {
  return (
    <>
      <InvoicesScreen />
      <StatusBar style="dark" />
    </>
  );
}
