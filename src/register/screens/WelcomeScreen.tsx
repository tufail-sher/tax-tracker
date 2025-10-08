import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { AppNavigator } from '../../utils/navigation';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { texts } from '../../../constants/Texts';

export default function WelcomeScreen() {
  const [fullName, setFullName] = useState('');
  const [cnic, setCnic] = useState('');
  const [ntn, setNtn] = useState('');

  const handleContinue = () => {
    AppNavigator.navigateToTaxFilingStatus();
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
          {/* Welcome Content */}
          <View className="flex-1">
            <Text className="font-inter-bold text-2xl text-secondary mb-4">
              {texts.register.welcome.title}
            </Text>
            <Text className="text-secondary/70 text-base font-inter-regular mb-6">
              {texts.register.welcome.subtitle}
            </Text>

            {/* Full Name Field */}
            <TextField
              label={texts.register.welcome.fullNameLabel}
              value={fullName}
              onChangeText={setFullName}
              placeholder={texts.register.welcome.fullNamePlaceholder}
            />

            {/* CNIC Field */}
            <TextField
              label={texts.register.welcome.cnicLabel}
              value={cnic}
              onChangeText={setCnic}
              placeholder={texts.register.welcome.cnicPlaceholder}
              keyboardType="numeric"
            />

            {/* NTN Field */}
            <TextField
              label={texts.register.welcome.ntnLabel}
              value={ntn}
              onChangeText={setNtn}
              placeholder={texts.register.welcome.ntnPlaceholder}
            />
          </View>

          {/* Continue Button at Bottom */}
          <View className="pb-8">
            <Button
              title={texts.register.welcome.nextButton}
              onPress={handleContinue}
              variant="primary"
              showArrow
            />
          </View>
        </View>
      </ScrollView>
            </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
