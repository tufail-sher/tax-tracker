import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { texts } from '../../../constants/Texts';
import Button from '../../components/Button';
import QrScanIcon from '../../../assets/svg/qr_scan_icon.svg';
import CrownIcon from '../../../assets/svg/crown_icon.svg';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const handleStartScanning = () => {
    // TODO: Navigate to scanner screen
    console.log('Start scanning');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Top Section with Gradient Background - 40% of screen */}
      <View className="bg-top-gradient px-6 pt-16 pb-8 rounded-b-[40px]" style={{ height: height * 0.4 }}>
        {/* Header with Profile */}
        <View className="flex-row justify-between items-start mb-8">
          <View className="flex-1">
            <Text className="font-inter-bold text-3xl text-secondary">
              {texts.home.greeting}, Maryam
            </Text>
            <Text className="font-inter-regular text-base text-secondary/70 mt-1">
              {texts.home.status}
            </Text>
          </View>
          
          {/* Crown Icon and Profile Picture Container */}
          <View className="flex-row items-center ml-4">
            {/* Crown Icon - positioned to the left */}
            <View className="mr-3">
              <CrownIcon width={20} height={20} />
            </View>
            
            {/* Outer White Circle Border with Gradient */}
            <LinearGradient
              colors={['#FFFFFF', '#C1D5FC', '#C1D5FC', '#FFFFFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                width: 66,
                height: 66,
                borderRadius: 48,
                padding: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              {/* Inner Circle with Pink Background */}
              <View className="w-full h-full rounded-full overflow-hidden bg-pink-300 items-center justify-center">
                <Image
                  source={require('../../../assets/images/avatar.png')}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* QR Scanner Section - Positioned to overlap */}
      <View className="items-center px-6" style={{ marginTop: -60 }}>
        {/* QR Icon Circle with Border - Half in gradient, half below */}
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
          {texts.home.scanTitle}
        </Text>

        {/* Start Scanning Button */}
        <View className="w-full px-0">
          <Button
            title={texts.home.scanButton}
            onPress={handleStartScanning}
            variant="primary"
            showArrow
          />
        </View>
      </View>
    </View>
  );
}
