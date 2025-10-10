import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        presentation: 'card',
      }}
    >
      <Stack.Screen 
        name="personal-information" 
      />
      <Stack.Screen 
        name="reports" 
      />
      <Stack.Screen 
        name="subscription" 
      />
      <Stack.Screen 
        name="password" 
      />
      <Stack.Screen 
        name="notifications" 
      />
      <Stack.Screen 
        name="help-support" 
      />
    </Stack>
  );
}
