import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { texts } from '../../../constants/Texts';
import ProfilePlaceholder from '../../../assets/svg/profile_placeholder.svg';
import PersonalInfoIcon from '../../../assets/svg/personal_information_icon.svg';
import ReportsIcon from '../../../assets/svg/reports_icon.svg';
import SubscriptionIcon from '../../../assets/svg/subscription_icon.svg';
import PasswordIcon from '../../../assets/svg/profile_password_icon.svg';
import NotificationIcon from '../../../assets/svg/notification_icon.svg';
import HelpSupportIcon from '../../../assets/svg/help_support_icon.svg';
import ProfileArrow from '../../../assets/svg/profile_arrow_icon.svg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser, selectUserName, selectUserEmail, selectUserPlan, selectProfilePicture } from '../store/selectors';
import { fetchUserProfile } from '../store/profileSlice';
import { AppNavigator } from '../../utils/navigation';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userName = useAppSelector(selectUserName);
  const userEmail = useAppSelector(selectUserEmail);
  const userPlan = useAppSelector(selectUserPlan);
  const profilePicture = useAppSelector(selectProfilePicture);

  useEffect(() => {
    // Fetch user profile on mount
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handlePersonalInfo = () => {
    AppNavigator.navigateToPersonalInformation();
  };

  const handleReports = () => {
    AppNavigator.navigateToReports();
  };

  const handleSubscription = () => {
    AppNavigator.navigateToSubscription();
  };

  const handlePassword = () => {
    AppNavigator.navigateToPassword();
  };

  const handleNotifications = () => {
    AppNavigator.navigateToNotifications();
  };

  const handleHelpSupport = () => {
    AppNavigator.navigateToHelpSupport();
  };

  const handleUpgrade = () => {
    // TODO: Navigate to Upgrade screen
    console.log('Navigate to Upgrade');
  };

  const generalMenuItems: MenuItem[] = [
    {
      id: 'personal-info',
      title: texts.profile.personalInformation,
      icon: <PersonalInfoIcon width={24} height={24} />,
      onPress: handlePersonalInfo,
    },
    {
      id: 'reports',
      title: texts.profile.reports,
      icon: <ReportsIcon width={24} height={24} />,
      onPress: handleReports,
    },
    {
      id: 'subscription',
      title: texts.profile.subscription,
      icon: <SubscriptionIcon width={24} height={24} />,
      onPress: handleSubscription,
    },
    {
      id: 'password',
      title: texts.profile.password,
      icon: <PasswordIcon width={24} height={24} />,
      onPress: handlePassword,
    },
  ];

  const settingsMenuItems: MenuItem[] = [
    {
      id: 'notifications',
      title: texts.profile.notifications,
      icon: <NotificationIcon width={24} height={24} />,
      onPress: handleNotifications,
    },
    {
      id: 'help-support',
      title: texts.profile.helpSupport,
      icon: <HelpSupportIcon width={24} height={24} />,
      onPress: handleHelpSupport,
    },
  ];

  return (
    <View className="flex-1 bg-surface">
      {/* Header Section with Background Color */}
      <View className="bg-top-gradient px-6 pt-12 pb-6 rounded-b-[40px]">
        <Text className="font-inter-bold text-2xl text-secondary mb-6">
          {texts.profile.title}
        </Text>

        {/* Profile Info - No card, direct content */}
        <View className="flex-row items-center">
          {/* Profile Picture */}
          <View className="mr-4">
            {profilePicture ? (
              <View 
                className="rounded-full overflow-hidden"
                style={{
                  width: 80,
                  height: 80,
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
                  width: 80,
                  height: 80,
                }}
              >
                <ProfilePlaceholder />
              </View>
            )}
          </View>

          {/* User Info */}
          <View className="flex-1">
            <Text className="font-inter-bold text-xl text-secondary mb-1">
              {userName}
            </Text>
            <Text className="font-inter-regular text-sm text-secondary/70 mb-3">
              {userEmail}
            </Text>

            {/* Plan Badges */}
            <View className="flex-row items-center gap-2">
              <View className="bg-white/80 rounded-full px-3 py-1.5">
                <Text className="font-inter-medium text-xs text-primary">
                  {texts.profile.freePlan}
                </Text>
              </View>
              <TouchableOpacity onPress={handleUpgrade}>
                <Text className="font-inter-semibold text-sm text-primary">
                  {texts.profile.upgrade}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Menu Sections - No cards, just list items */}
      <ScrollView className="flex-1">
        <View className="px-6 pt-6">
          {/* General Section */}
          <Text className="font-inter-semibold text-lg text-secondary mb-4">
            {texts.profile.general}
          </Text>

          {generalMenuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              activeOpacity={0.7}
              className="flex-row items-center py-4"
            >
              {/* Icon */}
              <View className="mr-4">
                {item.icon}
              </View>

              {/* Title */}
              <Text className="flex-1 font-inter-medium text-base text-secondary">
                {item.title}
              </Text>

              {/* Arrow */}
              <ProfileArrow width={20} height={20} />
            </TouchableOpacity>
          ))}

          {/* Settings Section */}
          <Text className="font-inter-semibold text-lg text-secondary mb-4 mt-6">
            {texts.profile.settings}
          </Text>

          {settingsMenuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              activeOpacity={0.7}
              className="flex-row items-center py-4"
            >
              {/* Icon */}
              <View className="mr-4">
                {item.icon}
              </View>

              {/* Title */}
              <Text className="flex-1 font-inter-medium text-base text-secondary">
                {item.title}
              </Text>

              {/* Arrow */}
              <ProfileArrow width={20} height={20} />
            </TouchableOpacity>
          ))}

          {/* Add extra padding at bottom for tab bar */}
          <View className="h-24" />
        </View>
      </ScrollView>
    </View>
  );
}
