import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, TextField } from '../../components';
import { useLogin } from '../hooks';
import { validateLoginForm } from '../utils';
import { AppNavigator } from '../../utils/navigation';

// Import SVG icons
import LoginAppIcon from '../../../assets/svg/login_app_icon.svg';
import UnFocusedEmailIcon from '../../../assets/svg/mail-icon.svg';
import FocusedEmailIcon from '../../../assets/svg/focused-mail-icon.svg';
import ErrorEmailIcon from '../../../assets/svg/error-mail-icon.svg';
import UnFocusedPasswordIcon from '../../../assets/svg/password_icon.svg';
import FocusedPasswordIcon from '../../../assets/svg/focused_password_icon.svg';
import ErrorPasswordIcon from '../../../assets/svg/error_password_icon.svg';

export default function LoginScreen() {
  const { isLoading, error, isAuthenticated, login, clearError } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email: string | null;
    password: string | null;
  }>({
    email: null,
    password: null,
  });

  // Navigate to home when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      AppNavigator.navigateToHome();
    }
  }, [isAuthenticated]);

  // Show error alert
  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error, [
        {
          text: 'OK',
          onPress: () => clearError(),
        },
      ]);
    }
  }, [error, clearError]);

  const handleLogin = async () => {
    // Validate form
    const validation = validateLoginForm(email, password);
    
    if (!validation.isValid) {
      setErrors({
        email: validation.email,
        password: validation.password,
      });
      return;
    }

    // Clear errors
    setErrors({ email: null, password: null });

    // Call login action
    login({ email, password });
  };

  const handleCreateAccount = () => {
    // Navigate to create account screen (to be implemented)
    Alert.alert('Create Account', 'This feature will be implemented soon!');
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    AppNavigator.navigateToForgotPassword();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView
        className="flex-1 h-full"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-16">
          {/* App Icon and Header */}
          <View className="items-center mb-8">
            <LoginAppIcon width={80} height={80} />
            <Text className="font-inter-medium text-base text-secondary mt-6">
              Track and analyze your taxes
            </Text>
          </View>

          {/* Login Form */}
          <View className="flex-1">
            {/* Card Container */}
            <View className="bg-white rounded-2xl p-6 shadow-md">
              <Text className="font-inter-bold text-2xl text-secondary mb-6">
                Login to your account
              </Text>

              {/* Email Field */}
            <TextField
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email || undefined}
              icon={<UnFocusedEmailIcon width={20} height={20} />}
              focusedIcon={<FocusedEmailIcon width={20} height={20} />}
              errorIcon={<ErrorEmailIcon width={20} height={20} />}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              placeholder="••••••••••"
              secureTextEntry
              error={errors.password || undefined}
              showForgot
              onForgotPress={handleForgotPassword}
              icon={<UnFocusedPasswordIcon width={20} height={20} />}
              focusedIcon={<FocusedPasswordIcon width={20} height={20} />}
              errorIcon={<ErrorPasswordIcon width={20} height={20} />}
            />
 {/* Login Button */}
              <View className="mt-6">
                <Button
                  title="Login"
                  onPress={handleLogin}
                  variant="primary"
                  loading={isLoading}
                  disabled={isLoading}
                />
              </View>
             
            </View>

            {/* Create Account Section */}
            <View className="items-center mt-8">
              <Text className="font-inter text-base text-gray-600 mb-4">
                Don't have an account?
              </Text>
              <Button
                title="Create account"
                onPress={handleCreateAccount}
                variant="secondary"
                disabled={isLoading}
                className="w-full"
              />
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
    </KeyboardAvoidingView>
  );
}