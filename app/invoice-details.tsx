import { StatusBar } from 'expo-status-bar';
import InvoiceDetailsScreen from '../src/home/screens/InvoiceDetailsScreen';

export default function InvoiceDetails() {
  return (
    <>
      <InvoiceDetailsScreen />
      <StatusBar style="dark" />
    </>
  );
}
