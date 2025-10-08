import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform,TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { AppNavigator } from '../../utils/navigation';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { texts } from '../../../constants/Texts';
import LoginAppIcon from '../../../assets/svg/login_app_icon.svg';
import ErrorUserIcon from '../../../assets/svg/error_user_icon.svg';
import FocusedUserIcon from '../../../assets/svg/focused_user_icon.svg';
import UserIcon from '../../../assets/svg/user_icon.svg';
import ErrorMailIcon from '../../../assets/svg/error-mail-icon.svg';
import FocusedMailIcon from '../../../assets/svg/focused-mail-icon.svg';
import MailIcon from '../../../assets/svg/mail-icon.svg';
import ErrorPasswordIcon from '../../../assets/svg/error_password_icon.svg';
import FocusedPasswordIcon from '../../../assets/svg/focused_password_icon.svg';
import PasswordIcon from '../../../assets/svg/password_icon.svg';

export default function CreateAccountScreen() {
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    handleCreateAccount,
  } = useRegisterForm();

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

          {/* Create Account Form */}
          <View className="flex-1">
            {/* Card Container */}
            <View className="bg-white rounded-2xl p-6 shadow-md">
              <Text className="font-inter-bold text-2xl text-secondary mb-6">
                {texts.register.createAccount.title}
              </Text>

              {/* Full Name Field */}
              <TextField
                label={texts.register.createAccount.fullNameLabel}
                value={fullName}
                onChangeText={setFullName}
                placeholder={texts.register.createAccount.fullNamePlaceholder}
                error={errors.fullName}
                icon={<UserIcon width={20} height={20} />}
                focusedIcon={<FocusedUserIcon width={20} height={20} />}
                errorIcon={<ErrorUserIcon width={20} height={20} />}
              />

              {/* Email Field */}
              <TextField
                label={texts.register.createAccount.emailLabel}
                value={email}
                onChangeText={setEmail}
                placeholder={texts.register.createAccount.emailPlaceholder}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                icon={<MailIcon width={20} height={20} />}
                focusedIcon={<FocusedMailIcon width={20} height={20} />}
                errorIcon={<ErrorMailIcon width={20} height={20} />}
              />

              {/* Password Field */}
              <View className="mb-2">
                <TextField
                  label={texts.register.createAccount.passwordLabel}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={texts.register.createAccount.passwordPlaceholder}
                  secureTextEntry
                  error={errors.password}
                  icon={<PasswordIcon width={20} height={20} />}
                  focusedIcon={<FocusedPasswordIcon width={20} height={20} />}
                  errorIcon={<ErrorPasswordIcon width={20} height={20} />}
                />
                {!errors.password && (
                  <Text className="text-secondary/60 text-xs font-inter-regular mt-1 ml-1">
                    {texts.register.createAccount.passwordHint}
                  </Text>
                )}
              </View>

              {/* Continue Button */}
              <View className="mt-6">
                <Button
                  title={texts.register.createAccount.createAccountButton}
                  onPress={handleCreateAccount}
                  variant="primary"
                  loading={isLoading}
                  disabled={isLoading}
                  showArrow
                />
              </View>
            </View>

            {/* Login Section */}
            <View className="items-center mt-8">
              <Text className="font-inter text-base text-gray-600 mb-4">
                {texts.register.createAccount.haveAccount}
              </Text>
              <Button
                title={texts.register.createAccount.loginButton}
                onPress={() => AppNavigator.navigateToLogin()}
                variant="secondary"
                disabled={isLoading}
                className="w-full"
              />
            </View>
          </View>

          {/* Footer */}
          <View className="py-8">
            <Text className="font-inter text-xs text-gray-400 text-center">
              {texts.register.createAccount.footer}
            </Text>
          </View>
        </View>
      </ScrollView>
            </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
  );
}
