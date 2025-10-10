import { StatusBar } from 'expo-status-bar';
import { CategoriesScreen } from '../../src/categories';

export default function CategoriesTab() {
  return (
    <>
      <CategoriesScreen />
      <StatusBar style="dark" />
    </>
  );
}
