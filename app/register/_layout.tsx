import { Stack } from 'expo-router';

export default function RegisterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verify-email"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="welcome"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tax-filing-status"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-profile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
