import React, { useEffect } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { AppNavigator } from '../../utils/navigation';
import { texts } from '../../../constants/Texts';
import Splash from '../../../assets/svg/splash.svg';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  useEffect(() => {
    // Navigate to intro screen after 3 seconds
    const timer = setTimeout(() => {
      AppNavigator.navigateToIntro();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center px-10">
      <View className="flex-1 justify-center items-center">
        <Splash
          width={Math.min(width * 0.6, 300)}
          height={Math.min(width * 0.6, 300)}
        />
      </View>
    </View>
  );
}
