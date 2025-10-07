import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  showForgot?: boolean;
  onForgotPress?: () => void;
  icon?: React.ReactNode;
  focusedIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
}

export default function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  showForgot = false,
  onForgotPress,
  icon,
  focusedIcon,
  errorIcon,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Determine which icon to show
  const getIcon = () => {
    if (error && errorIcon) return errorIcon;
    if (isFocused && focusedIcon) return focusedIcon;
    return icon;
  };

  return (
    <View className="mb-4">
      {/* Label and Forgot Password */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-inter-medium text-sm text-secondary">{label}</Text>
        {showForgot && (
          <TouchableOpacity onPress={onForgotPress}>
            <Text className="font-inter-medium text-sm text-primary">Forgot?</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Input Field */}
      <View
        className={`flex-row items-center bg-white border rounded-xl px-4 py-3 ${
          error ? 'border-red-500' : isFocused ? 'border-primary' : 'border-gray-300'
        }`}
      >
        {(icon || focusedIcon || errorIcon) && (
          <View className="mr-3">{getIcon()}</View>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 font-inter text-base text-secondary"
        />
      </View>

      {/* Error Message */}
      {error && (
        <View className="flex-row items-center mt-1">
          <Text className="font-inter text-xs text-red-500 ml-1">⚠️ {error}</Text>
        </View>
      )}
    </View>
  );
}
