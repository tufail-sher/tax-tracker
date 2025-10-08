import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, TextField } from '../../components';
import { useForgotPassword } from '../hooks';
import { validateForgotPasswordForm } from '../utils';
import { AppNavigator } from '../../utils/navigation';
import { texts } from '../../../constants/Texts';

// Import SVG icons
import LoginAppIcon from '../../../assets/svg/login_app_icon.svg';
import UnFocusedEmailIcon from '../../../assets/svg/mail-icon.svg';
import FocusedEmailIcon from '../../../assets/svg/focused-mail-icon.svg';
import ErrorEmailIcon from '../../../assets/svg/error-mail-icon.svg';

export default function ForgotPasswordScreen() {
  const { isLoading, error, sendCode, clearError, isCodeSent } = useForgotPassword();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  // Navigate to verify screen when code is sent
  useEffect(() => {
    if (isCodeSent) {
      AppNavigator.navigate('/forgot/verify' as any);
    }
  }, [isCodeSent]);

  // Clear error when user types
  useEffect(() => {
    if (error && emailError === null) {
      clearError();
    }
  }, [emailError]);

  const handleSendCode = async () => {
    // Validate email
    const validation = validateForgotPasswordForm(email);
    
    if (!validation.isValid) {
      setEmailError(validation.email);
      return;
    }

    // Clear errors
    setEmailError(null);

    // Send reset code
    sendCode({ email });
  };

  const handleBackToLogin = () => {
    AppNavigator.navigateToLogin();
  };

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
              {texts.splash.tagline}
            </Text>
          </View>

          {/* Form */}
          <View className="flex-1">
            {/* Card Container */}
            <View className="bg-white rounded-2xl p-6 shadow-md">
              <Text className="font-inter-bold text-2xl text-secondary mb-2">
                {texts.forgotPassword.forgotTitle}
              </Text>
              
              <Text className="font-inter text-sm text-gray-600 mb-6">
                {texts.forgotPassword.forgotDescription}
              </Text>

              {/* Email Field */}
            <TextField
              label={texts.forgotPassword.emailLabel}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError(null);
              }}
              placeholder={texts.forgotPassword.emailPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError || error || undefined}
              icon={<UnFocusedEmailIcon width={20} height={20} />}
              focusedIcon={<FocusedEmailIcon width={20} height={20} />}
              errorIcon={<ErrorEmailIcon width={20} height={20} />}
            />

              {/* Send Code Button */}
              <View className="mt-6">
                <Button
                  title={texts.forgotPassword.sendCodeButton}
                  onPress={handleSendCode}
                  variant="primary"
                  loading={isLoading}
                  disabled={isLoading}
                  showArrow={false}
                />
              </View>
            </View>

            {/* Back to Login */}
            <TouchableOpacity
              onPress={handleBackToLogin}
              className="mt-6 flex-row items-center justify-center"
              disabled={isLoading}
            >
              <Text className="font-inter text-base text-gray-600">← </Text>
              <Text className="font-inter-medium text-base text-secondary">
                {texts.forgotPassword.backToLogin}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="py-8">
            <Text className="font-inter text-xs text-gray-400 text-center">
              {texts.forgotPassword.footer}
            </Text>
          </View>
        </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
