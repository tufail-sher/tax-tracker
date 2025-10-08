import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useTaxFilingStatus } from '../hooks/useTaxFilingStatus';
import Button from '../../components/Button';
import { texts } from '../../../constants/Texts';

const TAX_STATUSES = [
  { 
    id: 'salaried', 
    label: texts.register.taxFilingStatus.options.salaried,
    description: 'You receive a regular salary from an employer'
  },
  { 
    id: 'business', 
    label: texts.register.taxFilingStatus.options.business,
    description: 'You own a business or are self-employed'
  },
  { 
    id: 'both', 
    label: texts.register.taxFilingStatus.options.both,
    description: 'You have salary income and business income'
  },
  { 
    id: 'non_filer', 
    label: texts.register.taxFilingStatus.options.nonFiler,
    description: 'You don\'t currently file tax returns'
  },
];

export default function TaxFilingStatusScreen() {
  const { selectedStatus, setSelectedStatus, handleContinue, isLoading } =
    useTaxFilingStatus();

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
          {/* Tax Filing Status Content */}
          <View className="flex-1">
            <Text className="font-inter-bold text-2xl text-secondary mb-2">
              {texts.register.taxFilingStatus.title}
            </Text>
            <Text className="text-secondary/70 text-sm font-inter-regular mb-6">
              {texts.register.taxFilingStatus.subtitle}
            </Text>

            {/* Tax Status Options */}
            <View className="mb-6">
              {TAX_STATUSES.map((status, index) => (
                <TouchableOpacity
                  key={status.id}
                  onPress={() => setSelectedStatus(status.id)}
                  className={`border rounded-lg p-4 mb-3 ${
                    selectedStatus === status.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <View className="flex-row items-start">
                    <View className="mt-0.5 mr-3">
                      <View
                        className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                          selectedStatus === status.id
                            ? 'border-primary'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedStatus === status.id && (
                          <View className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </View>
                    </View>
                    <View className="flex-1">
                      <Text
                        className={`text-base font-inter-semibold mb-1 ${
                          selectedStatus === status.id
                            ? 'text-secondary'
                            : 'text-secondary'
                        }`}
                      >
                        {status.label}
                      </Text>
                      <Text className="text-secondary/70 text-sm font-inter-regular">
                        {status.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Continue Button at Bottom */}
          <View className="pb-8">
            <Button
              title={texts.register.taxFilingStatus.continueButton}
              onPress={handleContinue}
              variant="primary"
              disabled={!selectedStatus || isLoading}
              loading={isLoading}
              showArrow
            />
          </View>
        </View>
      </ScrollView>
            </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
