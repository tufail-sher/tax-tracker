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
      // Navigate to login screen on last slide
      AppNavigator.navigateToLogin();
    }
  };

  const handleGetStarted = () => {
    AppNavigator.navigateToLogin();
  };

  const renderSlide = (slide: IntroSlide, index: number) => {
    const IconComponent = slide.icon;
    return (
      <View key={index} style={{ width: width }} className="flex-1 px-4">
        {/* Icon Section */}
        <View className="flex-1 items-start justify-center">
          <View 
            className="items-start justify-center mb-8 border-white border rounded-full p-4 bg-white/20"
           
          >
            <IconComponent />
          </View>
        {/* Text Content */}
        <View className="items-start px-4" >
          <Text className="font-inter-bold font-semibold text-lg tracking-wider mb-4 text-center text-primary">
            {slide.title}
          </Text>
          
          <Text className="font-inter-bold text-3xl leading-8 text-start mb-4 text-secondary">
            {slide.subtitle}{' '}
            <Text className="font-inter-bold text-3xl leading-8 text-start mb-4 text-primary">
              {slide.description}
            </Text>
          </Text>
        </View>
        </View>

     

        {/* Bottom Section with Pagination and Button */}
        <View className="flex-row items-center justify-between pb-12 px-4">
          {/* Pagination Dots - Left side */}
          <View className="flex-row">
            {introSlides.map((_, dotIndex) => (
              <View
                key={dotIndex}
                className={`h-2 mx-1 rounded-full ${
                  dotIndex === currentPage 
                    ? 'bg-primary w-8' 
                    : dotIndex < currentPage
                    ? 'bg-primary w-2'
                    : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </View>

          {/* Action Button - Right side */}
          {index === introSlides.length - 1 ? (
            <TouchableOpacity
              onPress={handleGetStarted}
              className="bg-primary rounded-full py-4 px-8 flex-row items-center justify-center"
            >
              <Text className="text-white font-inter-semibold text-base mr-2">
                {texts.intro.buttons.getStarted}
              </Text>
              <ArrowIcon width={20} height={20} fill="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleNext}
              className="bg-primary rounded-full w-14 h-14 items-center justify-center"
            >
              <ArrowIcon width={24} height={24} fill="white" />
            </TouchableOpacity>
          )}
          
        </View>
      </View>
    );
  };

  return (
    <View className="w-full h-full bg-white">  
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
    </View>
  );
}