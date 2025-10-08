import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, TextField } from '../../components';
import { useForgotPassword } from '../hooks';
import { validateVerifyCodeForm } from '../utils';
import { AppNavigator } from '../../utils/navigation';
import { texts } from '../../../constants/Texts';

// Import SVG icons
import LoginAppIcon from '../../../assets/svg/login_app_icon.svg';

export default function VerifyCodeScreen() {
  const { email, isLoading, error, verifyCode, clearError, isCodeVerified, sendCode } = useForgotPassword();

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  // Navigate to reset password screen when code is verified
  useEffect(() => {
    if (isCodeVerified) {
      AppNavigator.navigate('/forgot/reset' as any);
    }
  }, [isCodeVerified]);

  // Clear error when user types
  useEffect(() => {
    if (error && codeError === null) {
      clearError();
    }
  }, [codeError]);

  const handleVerifyCode = async () => {
    // Validate code
    const validation = validateVerifyCodeForm(code);
    
    if (!validation.isValid) {
      setCodeError(validation.code);
      return;
    }

    // Clear errors
    setCodeError(null);

    // Verify code
    if (email) {
      verifyCode({ email, code });
    }
  };

  const handleResendCode = async () => {
    if (email) {
      setCode('');
      setCodeError(null);
      clearError();
      sendCode({ email });
    }
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
                {texts.forgotPassword.verifyTitle}
              </Text>
              
              <Text className="font-inter text-sm text-gray-600 mb-1">
                {texts.forgotPassword.verifyDescription}
              </Text>
              
              <Text className="font-inter-semibold text-sm text-primary mb-6">
                {email}
              </Text>

              {/* Verification Code Field */}
            <TextField
              label={texts.forgotPassword.verificationCodeLabel}
              value={code}
              onChangeText={(text) => {
                setCode(text);
                if (codeError) setCodeError(null);
              }}
              placeholder={texts.forgotPassword.verificationCodePlaceholder}
              keyboardType="numeric"
              error={codeError || error || undefined}
            />

              {/* Resend Code */}
              <View className="flex-row justify-center mt-4">
                <Text className="font-inter text-sm text-gray-600">
                  {texts.forgotPassword.didntReceive}{' '}
                </Text>
                <TouchableOpacity onPress={handleResendCode} disabled={isLoading}>
                  <Text className="font-inter-semibold text-sm text-primary">
                    {texts.forgotPassword.resend}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Verify Code Button */}
              <View className="mt-6">
                <Button
                  title={texts.forgotPassword.verifyButton}
                  onPress={handleVerifyCode}
                  variant="primary"
                  loading={isLoading}
                  disabled={isLoading}
                  showArrow={false}
                />
              </View>
            </View>
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
