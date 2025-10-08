import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ProfileTab() {
  return (
    <>
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="font-inter-bold text-2xl text-secondary">Profile</Text>
        <Text className="font-inter-regular text-base text-secondary/70 mt-2">Coming soon...</Text>
      </View>
      <StatusBar style="dark" />
    </>
  );
}
