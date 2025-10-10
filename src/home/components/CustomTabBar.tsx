import React from 'react';
import { View, TouchableOpacity, Text, Platform, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { texts } from '../../../constants/Texts';
import HomeIcon from '../../../assets/svg/home_icon.svg';
import FocusedHomeIcon from '../../../assets/svg/focused_home_icon.svg';
import InvoiceIcon from '../../../assets/svg/invoice_icon.svg';
import FocusedInvoiceIcon from '../../../assets/svg/focused_invoice_icon.svg';
import AddIcon from '../../../assets/svg/add_icon.svg';
import FocusedAddIcon from '../../../assets/svg/focused_add_icon.svg';
import CategoriesIcon from '../../../assets/svg/categories_icon.svg';
import FocusedCategoriesIcon from '../../../assets/svg/focused_categories_icon.svg';
import ProfileIcon from '../../../assets/svg/profile_icon.svg';
import FocusedProfileIcon from '../../../assets/svg/focused_profile_icon.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconProps = { width: 24, height: 24 };

    switch (routeName) {
      case 'index':
        return isFocused ? <FocusedHomeIcon {...iconProps} /> : <HomeIcon {...iconProps} />;
      case 'invoices':
        return isFocused ? <FocusedInvoiceIcon {...iconProps} /> : <InvoiceIcon {...iconProps} />;
      case 'add':
        return isFocused ? <FocusedAddIcon width={28} height={28} /> : <AddIcon width={28} height={28} />;
      case 'categories':
        return isFocused ? <FocusedCategoriesIcon {...iconProps} /> : <CategoriesIcon {...iconProps} />;
      case 'profile':
        return isFocused ? <FocusedProfileIcon {...iconProps} /> : <ProfileIcon {...iconProps} />;
      default:
        return null;
    }
  };

  const getLabel = (routeName: string) => {
    switch (routeName) {
      case 'index':
        return texts.home.tabs.home;
      case 'invoices':
        return texts.home.tabs.invoices;
      case 'add':
        return texts.home.tabs.add;
      case 'categories':
        return texts.home.tabs.categories;
      case 'profile':
        return texts.home.tabs.profile;
      default:
        return routeName;
    }
  };

  return (
    <View style={{ 
      position: 'relative',
      backgroundColor: 'white',
    }}>
      {/* Curved Tab Shape Background */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Svg 
          width={SCREEN_WIDTH} 
          height="93" 
          viewBox="0 0 390 93" 
          fill="none"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <Path 
            d="M374.833 10.6846C383.058 11.1274 389.5 17.9255 389.5 26.1621V77C389.5 85.5604 382.56 92.5 374 92.5H16C7.43959 92.5 0.5 85.5604 0.5 77V26.1621L0.504883 25.7764C0.702083 17.7141 7.07095 11.1205 15.167 10.6846L195 1L374.833 10.6846Z" 
            fill="white" 
            stroke="#E4E4E4"
            strokeWidth="1"
          />
        </Svg>
      </View>

      {/* Tab Bar Content */}
      <View className="flex-row items-center justify-around px-4" style={{ paddingTop: 16, paddingBottom: 12 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              className="items-center justify-center flex-1"
            >
              <View className="items-center">
                {getIcon(route.name, isFocused)}
                <Text
                  className={`font-inter-medium text-xs mt-1 ${
                    isFocused ? 'text-tab-focused' : 'text-tab-unfocused'
                  }`}
                >
                  {getLabel(route.name)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {/* iOS Home Indicator Space */}
      {Platform.OS === 'ios' && <View className="h-5" />}
    </View>
  );
};

export default CustomTabBar;
