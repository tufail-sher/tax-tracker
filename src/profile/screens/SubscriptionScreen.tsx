import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { texts } from '../../../constants/Texts';
import ProfileHeader from '../components/ProfileHeader';
import AppIcon from '../../../assets/svg/app-icon.svg';
import CheckIcon from '../../../assets/svg/check_icon.svg';

export default function SubscriptionScreen() {
  const handleGetPremium = () => {
    // TODO: Implement subscription logic
    console.log('Get Premium Plan');
  };

  return (
    <ImageBackground
      source={require('../../../assets/intro-background.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1">
        {/* Header */}
        <ProfileHeader title={texts.subscription.title} />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6">
            {/* App Icon */}
            <View className="items-center pt-8 pb-6">
              <AppIcon width={80} height={80} />
            </View>

            {/* App Name */}
            <Text className="font-inter-bold text-3xl text-secondary text-center mb-3">
              {texts.subscription.appName}
            </Text>

            {/* Subtitle */}
            <Text className="font-inter-regular text-base text-secondary/70 text-center mb-8 px-4">
              {texts.subscription.unlockFeatures}
            </Text>

            {/* Pricing */}
            <View className="items-center mb-8">
              <Text className="font-inter-bold text-4xl text-primary mb-2">
                {texts.subscription.pricePerYear}
              </Text>
              <Text className="font-inter-regular text-base text-primary">
                {texts.subscription.pricePerMonth}
              </Text>
            </View>

            {/* Features List */}
            <View className="mb-6">
              {texts.subscription.features.map((feature, index) => (
                <View key={index} className="flex-row items-start mb-4">
                  <View className="mt-1 mr-3">
                    <CheckIcon width={24} height={24} />
                  </View>
                  <Text className="flex-1 font-inter-regular text-base text-secondary leading-6">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            {/* Trial Info Box */}
            <View className="bg-light-blue rounded-2xl p-4 mb-8 border-2 border-primary/20">
              <Text className="font-inter-regular text-base text-secondary text-center">
                {texts.subscription.trialInfo}{'\n'}
                <Text className="font-inter-bold text-primary">
                  {texts.subscription.pricePerYear}
                </Text>
                {' '}
                <Text className="font-inter-regular text-primary">
                  {texts.subscription.pricePerMonth}
                </Text>
              </Text>
            </View>

            {/* Get Premium Button */}
            <View className="mb-4">
              <TouchableOpacity
                onPress={handleGetPremium}
                className="bg-primary rounded-xl py-4 items-center"
                activeOpacity={0.8}
              >
                <Text className="font-inter-bold text-lg text-white mb-1">
                  {texts.subscription.getPremium}
                </Text>
                <Text className="font-inter-regular text-sm text-white/90">
                  {texts.subscription.tapToStart}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Spacing */}
            <View className="h-8" />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
