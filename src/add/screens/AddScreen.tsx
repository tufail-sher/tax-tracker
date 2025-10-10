import React from 'react';
import { View, Text } from 'react-native';
import { texts } from '../../../constants/Texts';
import Button from '../../components/Button';
import QrScanIcon from '../../../assets/svg/qr_scan_icon.svg';
import { AppNavigator } from '../../utils/navigation';

export default function AddScreen() {
  const handleStartScanning = () => {
    AppNavigator.navigateToScanner();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-12 pb-4">
        <Text className="font-inter-bold text-2xl text-secondary">
          {texts.add.title}
        </Text>
      </View>

      {/* Centered Content */}
      <View className="flex-1 items-center justify-center px-6">
        {/* QR Scanner Icon Circle with Border */}
        <View 
          className="rounded-full items-center justify-center mb-10"
          style={{
            width: 120,
            height: 120,
            backgroundColor: '#F0F4FE',
            borderWidth: 3,
            borderColor: '#97BAF9',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <QrScanIcon width={60} height={60} />
        </View>

        {/* Scan Description */}
        <Text className="font-inter-regular text-base text-secondary text-center mb-10 px-6">
          {texts.add.scanTitle}
        </Text>

        {/* Start Scanning Button */}
        <View className="w-full px-0">
          <Button
            title={texts.add.scanButton}
            onPress={handleStartScanning}
            variant="primary"
            showArrow
          />
        </View>
      </View>
    </View>
  );
}
