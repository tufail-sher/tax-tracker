import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';
import { AppNavigator } from '../../utils/navigation';
import { texts } from '../../../constants/Texts';

// Import SVG icons
import AppIcon from '../../../assets/svg/app-icon.svg';
import AiMagic from '../../../assets/svg/ai-magic.svg';
import Cells from '../../../assets/svg/cells.svg';
import ThumbsUp from '../../../assets/svg/thumbs-up.svg';
import ArrowIcon from '../../../assets/svg/arrow-icon.svg';

const { width, height } = Dimensions.get('window');

interface IntroSlide {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  description: string;
}

const introSlides: IntroSlide[] = [
  {
    icon: AiMagic,
    title: texts.intro.slide1.title,
    subtitle: texts.intro.slide1.subtitle,
    description: texts.intro.slide1.description
  },
  {
    icon: Cells,
    title: texts.intro.slide2.title,
    subtitle: texts.intro.slide2.subtitle,
    description: texts.intro.slide2.description
  },
  {
    icon: ThumbsUp,
    title: texts.intro.slide3.title,
    subtitle: texts.intro.slide3.subtitle,
    description: texts.intro.slide3.description
  }
];

export default function IntroScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  const handleNext = () => {
    if (currentPage < introSlides.length - 1) {
      const nextPage = currentPage + 1;
      pagerRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
    } else {
      // Navigate to main app on last slide
      AppNavigator.navigateToHome();
    }
  };

  const handleGetStarted = () => {
    AppNavigator.navigateToHome();
  };

  const renderSlide = (slide: IntroSlide, index: number) => {
    const IconComponent = slide.icon;
    return (
      <View key={index} style={{ width: width }} className="flex-1 px-8">
        {/* Icon Section */}
        <View className="flex-2 items-center justify-center">
          <View className="items-center justify-center mb-8">
            <IconComponent width={80} height={80} />
          </View>
        </View>

        {/* Text Content */}
        <View className="flex-1 items-center px-4">
          <Text className="text-blue-600 font-inter-bold text-sm tracking-wider mb-4 text-center">
            {slide.title}
          </Text>
          
          <Text className="text-gray-800 font-inter-bold text-2xl leading-8 text-center mb-4">
            {slide.subtitle}{' '}
            <Text className="text-blue-600">
              {slide.description}
            </Text>
          </Text>
        </View>

        {/* Bottom Section with Pagination and Button */}
        <View className="pb-12 px-4">
          {/* Pagination Dots */}
          <View className="flex-row justify-center mb-8">
            {introSlides.map((_, dotIndex) => (
              <View
                key={dotIndex}
                className={`h-2 mx-1 rounded-full ${
                  dotIndex === currentPage 
                    ? 'bg-blue-600 w-8' 
                    : dotIndex < currentPage
                    ? 'bg-blue-600 w-2'
                    : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </View>

          {/* Action Button */}
          {index === introSlides.length - 1 ? (
            <TouchableOpacity
              onPress={handleGetStarted}
              className="bg-blue-600 rounded-full py-4 px-8 flex-row items-center justify-center"
            >
              <Text className="text-white font-inter-semibold text-base mr-2">
                {texts.intro.buttons.getStarted}
              </Text>
              <ArrowIcon width={20} height={20} fill="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleNext}
              className="bg-blue-600 rounded-full w-14 h-14 items-center justify-center self-end"
            >
              <ArrowIcon width={24} height={24} fill="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/intro-background.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1">
        {/* Header with App Icon */}
        <View className="items-center pt-16 pb-8">
          <AppIcon width={60} height={60} />
        </View>

        {/* PagerView for slides */}
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {introSlides.map((slide, index) => renderSlide(slide, index))}
        </PagerView>
      </View>
    </ImageBackground>
  );
}