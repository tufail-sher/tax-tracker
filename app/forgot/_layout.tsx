import { Stack } from 'expo-router';

export default function ForgotLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="verify" options={{ headerShown: false }} />
      <Stack.Screen name="reset" options={{ headerShown: false }} />
    </Stack>
  );
}
