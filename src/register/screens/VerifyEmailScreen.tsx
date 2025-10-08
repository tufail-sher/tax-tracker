import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useVerifyEmail } from '../hooks/useVerifyEmail';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { texts } from '../../../constants/Texts';
import LoginAppIcon from '../../../assets/svg/login_app_icon.svg';

export default function VerifyEmailScreen() {
  const {
    code,
    setCode,
    error,
    isLoading,
    handleVerifyCode,
    handleResendCode,
  } = useVerifyEmail();

  return (
       <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
        <View className="flex-1 px-6 pt-16">
          {/* App Icon and Header */}
          <View className="items-center mb-8">
            <LoginAppIcon width={80} height={80} />
            <Text className="font-inter-medium text-base text-secondary mt-6">
              {texts.register.createAccount.subtitle}
            </Text>
          </View>

          {/* Verify Email Form */}
          <View className="flex-1">
            {/* Card Container */}
            <View className="bg-white rounded-2xl p-6 shadow-md">
              <Text className="font-inter-bold text-2xl text-secondary mb-2">
                {texts.register.verifyEmail.title}
              </Text>
              <Text className="font-inter-regular text-sm text-secondary/70 mb-6">
                {texts.register.verifyEmail.description} taxtracker@fbr.com
              </Text>

              {/* Verification Code Field */}
              <TextField
                label={texts.register.verifyEmail.verificationCodeLabel}
                value={code}
                onChangeText={setCode}
                placeholder={texts.register.verifyEmail.verificationCodePlaceholder}
                keyboardType="numeric"
                error={error}
              />

              {/* Resend Code Link */}
              <View className="mt-2 mb-6">
                <Text className="text-secondary/70 text-sm font-inter-regular text-center">
                  {texts.register.verifyEmail.didntReceive}{' '}
                  <Text
                    className="text-primary font-inter-semibold"
                    onPress={handleResendCode}
                  >
                    {texts.register.verifyEmail.resend}
                  </Text>
                </Text>
              </View>

              {/* Create Account Button */}
              <View className="mt-6">
                <Button
                  title={texts.register.verifyEmail.createAccountButton}
                  onPress={handleVerifyCode}
                  variant="primary"
                  loading={isLoading}
                  disabled={isLoading}
                />
              </View>
            </View>

            {/* Terms and Privacy */}
            <View className="mt-8 px-6">
              <Text className="text-secondary/70 text-xs font-inter-regular text-center">
                {texts.register.verifyEmail.termsText}{' '}
                <Text className="text-primary font-inter-semibold">
                  {texts.register.verifyEmail.termsLink}
                </Text>{' '}
                {texts.register.verifyEmail.and}{' '}
                <Text className="text-primary font-inter-semibold">
                  {texts.register.verifyEmail.privacyLink}
                </Text>
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View className="py-8">
            <Text className="font-inter text-xs text-gray-400 text-center">
              © 2025 Tax Tracker. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
