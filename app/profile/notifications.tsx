import React from 'react';
import { View, Text } from 'react-native';
import { texts } from '../../constants/Texts';

export default function NotificationsScreen() {
  return (
    <View className="flex-1 bg-surface items-center justify-center">
      <Text className="font-inter-bold text-xl text-secondary">
        Notifications Screen
      </Text>
      <Text className="font-inter-regular text-base text-secondary/70 mt-2">
        Coming Soon
      </Text>
    </View>
  );
}
