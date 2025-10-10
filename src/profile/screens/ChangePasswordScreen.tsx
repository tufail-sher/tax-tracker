import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { texts } from '../../../constants/Texts';
import ProfileHeader from '../components/ProfileHeader';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Validation states
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    // Validate current password
    if (!currentPassword.trim()) {
      newErrors.currentPassword = texts.changePassword.validation.currentPasswordRequired;
      isValid = false;
    }

    // Validate new password
    if (!newPassword.trim()) {
      newErrors.newPassword = texts.changePassword.validation.newPasswordRequired;
      isValid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = texts.changePassword.validation.passwordTooShort;
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = texts.changePassword.validation.confirmPasswordRequired;
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = texts.changePassword.validation.passwordNoMatch;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChangePassword = () => {
    if (validateForm()) {
      // TODO: Implement change password API call
      console.log('Change password:', {
        currentPassword,
        newPassword,
      });
      
      // Clear form on success
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  const isFormValid = currentPassword.trim() && newPassword.trim() && confirmPassword.trim() && newPassword.length >= 8;

  return (
    <View className="flex-1 bg-surface">
      <ProfileHeader title={texts.changePassword.title} />

      <ScrollView className="flex-1">
        <View className="px-6 pt-6">
          {/* Description */}
          <Text className="font-inter-regular text-base text-secondary mb-6">
            {texts.changePassword.description}
          </Text>

          {/* Current Password */}
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-secondary mb-2">
              {texts.changePassword.currentPassword}
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 font-inter-regular text-base text-secondary"
              placeholder={texts.changePassword.currentPasswordPlaceholder}
              placeholderTextColor="#999999"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.currentPassword ? (
              <Text className="font-inter-regular text-xs text-error mt-1">
                {errors.currentPassword}
              </Text>
            ) : null}
          </View>

          {/* New Password */}
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-secondary mb-2">
              {texts.changePassword.newPassword}
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 font-inter-regular text-base text-secondary"
              placeholder={texts.changePassword.newPasswordPlaceholder}
              placeholderTextColor="#999999"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.newPassword ? (
              <Text className="font-inter-regular text-xs text-error mt-1">
                {errors.newPassword}
              </Text>
            ) : null}
          </View>

          {/* Confirm New Password */}
          <View className="mb-6">
            <Text className="font-inter-medium text-sm text-secondary mb-2">
              {texts.changePassword.confirmPassword}
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 font-inter-regular text-base text-secondary"
              placeholder={texts.changePassword.confirmPasswordPlaceholder}
              placeholderTextColor="#999999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.confirmPassword ? (
              <Text className="font-inter-regular text-xs text-error mt-1">
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>

          {/* Spacer to push button to bottom */}
          <View className="flex-1" />

          {/* Change Password Button */}
          <View className="mb-8">
            <TouchableOpacity
              onPress={handleChangePassword}
              disabled={!isFormValid}
              className={`rounded-xl py-4 items-center ${
                isFormValid ? 'bg-primary' : 'bg-transparent border-2 border-gray-300'
              }`}
              activeOpacity={0.8}
            >
              <Text className={`font-inter-semibold text-base ${
                isFormValid ? 'text-white' : 'text-gray-400'
              }`}>
                {texts.changePassword.changePasswordButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
