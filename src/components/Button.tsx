import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import ArrowIcon from '../../assets/svg/arrow-icon.svg';
import BlackArrowIcon from '../../assets/svg/black-arrow.svg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  className?: string;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  showArrow = true,
  className = '',
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-md py-4 px-8 flex-row items-center justify-center ${
        isPrimary ? 'bg-primary' : 'bg-white border border-gray-300'
      } ${disabled || loading ? 'opacity-50' : ''} ${className}`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? 'white' : '#2249E2'} />
      ) : (
        <>
          <Text
            className={`font-inter-semibold text-base ${
              isPrimary ? 'text-white' : 'text-secondary'
            }`}
          >
            {title}
          </Text>
          {showArrow && (
            <View className="ml-2">
              {isPrimary ? (
                <ArrowIcon width={20} height={20} fill="white" />
              ) : (
                <BlackArrowIcon width={20} height={20} />
              )}
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}
