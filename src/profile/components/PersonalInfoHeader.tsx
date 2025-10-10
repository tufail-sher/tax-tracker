import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import BackArrowIcon from '../../../assets/svg/backarrow_icon.svg';
import ProfilePlaceholder from '../../../assets/svg/profile_placeholder.svg';
import ChromeIcon from '../../../assets/svg/personal_information_chrome_icon.svg';

interface PersonalInfoHeaderProps {
  title: string;
  profilePicture?: string | null;
  onBack?: () => void;
  onEditPicture?: () => void;
}

export default function PersonalInfoHeader({ 
  title, 
  profilePicture, 
  onBack,
  onEditPicture 
}: PersonalInfoHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View className="mb-16">
      {/* Header with Gradient Background */}
      <View className="bg-top-gradient px-6 pt-12 pb-20 rounded-b-[30px]">
        <View className="flex-row items-center">
          {/* Back Button */}
          <TouchableOpacity onPress={handleBack} className="mr-4" activeOpacity={0.7}>
            <BackArrowIcon width={24} height={24} />
          </TouchableOpacity>

          {/* Title */}
          <Text className="font-inter-bold text-2xl text-secondary flex-1">
            {title}
          </Text>
        </View>
      </View>

      {/* Profile Picture - Overlapping Header */}
      <View className="absolute bottom-0 left-0 right-0 items-center" style={{ transform: [{ translateY: 50 }] }}>
        <View className="relative">
          {profilePicture ? (
            <View 
              className="rounded-full overflow-hidden bg-white"
              style={{
                width: 100,
                height: 100,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Image
                source={{ uri: profilePicture }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          ) : (
            <View
              className="rounded-full items-center justify-center bg-white"
              style={{
                width: 100,
                height: 100,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <ProfilePlaceholder width={60} height={60} />
            </View>
          )}
          
          {/* Edit Icon Badge */}
          <TouchableOpacity
            onPress={onEditPicture}
            activeOpacity={0.7}
            className="absolute bottom-0 right-0 bg-primary rounded-full p-2"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <ChromeIcon width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
