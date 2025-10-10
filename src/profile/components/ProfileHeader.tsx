import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BackArrowIcon from '../../../assets/svg/backarrow_icon.svg';

interface ProfileHeaderProps {
  title: string;
  onBack?: () => void;
}

export default function ProfileHeader({ title, onBack }: ProfileHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View className="bg-top-gradient px-6 pt-12 pb-8 rounded-b-[30px]">
      <View className="flex-row items-center">
        {/* Back Button */}
        <TouchableOpacity onPress={handleBack} className="mr-4" activeOpacity={0.7}>
          <BackArrowIcon  />
        </TouchableOpacity>

        {/* Title */}
        <Text className="font-inter-semibold text-xl text-secondary flex-1">
          {title}
        </Text>
      </View>
    </View>
  );
}
