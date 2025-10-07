import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, TextField } from '../../components';
import { useForgotPassword } from '../hooks';
import { validateResetPasswordForm } from '../utils';
import { AppNavigator } from '../../utils/navigation';
import { texts } from '../../../constants/Texts';

// Import SVG icons
import LoginAppIcon from '../../../assets/svg/login_app_icon.svg';
import UnFocusedPasswordIcon from '../../../assets/svg/password_icon.svg';
import FocusedPasswordIcon from '../../../assets/svg/focused_password_icon.svg';
import ErrorPasswordIcon from '../../../assets/svg/error_password_icon.svg';

export default function ResetPasswordScreen() {
  const { email, verificationCode, isLoading, error, resetPass, clearError, isPasswordReset } = useForgotPassword();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    newPassword: string | null;
    confirmPassword: string | null;
  }>({
    newPassword: null,
    confirmPassword: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Show success and navigate to login when password is reset
  useEffect(() => {
    if (isPasswordReset && !showSuccess) {
      setShowSuccess(true);
      Alert.alert(
        texts.forgotPassword.successTitle,
        texts.forgotPassword.successDescription,
        [
          {
            text: 'OK',
            onPress: () => {
              AppNavigator.navigateToLogin();
            },
          },
        ]
      );
    }
  }, [isPasswordReset, showSuccess]);

  // Clear error when user types
  useEffect(() => {
    if (error && errors.newPassword === null && errors.confirmPassword === null) {
      clearError();
    }
  }, [errors]);

  const handleResetPassword = async () => {
    // Validate passwords
    const validation = validateResetPasswordForm(newPassword, confirmPassword);
    
    if (!validation.isValid) {
      setErrors({
        newPassword: validation.newPassword,
        confirmPassword: validation.confirmPassword,
      });
      return;
    }

    // Clear errors
    setErrors({ newPassword: null, confirmPassword: null });

    // Reset password
    if (email && verificationCode) {
      resetPass({
        email,
        code: verificationCode,
        newPassword,
        confirmPassword,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
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
                {texts.forgotPassword.resetTitle}
              </Text>
              
              <Text className="font-inter text-sm text-gray-600 mb-6">
                {texts.forgotPassword.resetDescription}
              </Text>

              {/* New Password Field */}
            <TextField
              label={texts.forgotPassword.newPasswordLabel}
              value={newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
                if (errors.newPassword) setErrors({ ...errors, newPassword: null });
              }}
              placeholder={texts.forgotPassword.newPasswordPlaceholder}
              secureTextEntry
              error={errors.newPassword || undefined}
              icon={<UnFocusedPasswordIcon width={20} height={20} />}
              focusedIcon={<FocusedPasswordIcon width={20} height={20} />}
              errorIcon={<ErrorPasswordIcon width={20} height={20} />}
            />

            {/* Confirm Password Field */}
            <TextField
              label={texts.forgotPassword.confirmPasswordLabel}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
              }}
              placeholder={texts.forgotPassword.confirmPasswordPlaceholder}
              secureTextEntry
              error={errors.confirmPassword || error || undefined}
              icon={<UnFocusedPasswordIcon width={20} height={20} />}
              focusedIcon={<FocusedPasswordIcon width={20} height={20} />}
              errorIcon={<ErrorPasswordIcon width={20} height={20} />}
            />

              {/* Reset Password Button */}
              <View className="mt-6">
                <Button
                  title={texts.forgotPassword.resetButton}
                  onPress={handleResetPassword}
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
    </KeyboardAvoidingView>
  );
}
