import { Redirect } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    console.log('[TaxTracker] Index screen mounted, redirecting to splash');
  }, []);

  return <Redirect href="/splash" />;
}