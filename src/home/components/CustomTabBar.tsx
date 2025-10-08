import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { texts } from '../../../constants/Texts';
import HomeIcon from '../../../assets/svg/home_icon.svg';
import FocusedHomeIcon from '../../../assets/svg/focused_home_icon.svg';
import InvoiceIcon from '../../../assets/svg/invoice_icon.svg';
import FocusedInvoiceIcon from '../../../assets/svg/focused_invoice_icon.svg';
import AddIcon from '../../../assets/svg/add_icon.svg';
import CategoriesIcon from '../../../assets/svg/categories_icon.svg';
import FocusedCategoriesIcon from '../../../assets/svg/focused_categories_icon.svg';
import ProfileIcon from '../../../assets/svg/profile_icon.svg';
import FocusedProfileIcon from '../../../assets/svg/focused_profile_icon.svg';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconProps = { width: 24, height: 24 };

    switch (routeName) {
      case 'index':
        return isFocused ? <FocusedHomeIcon {...iconProps} /> : <HomeIcon {...iconProps} />;
      case 'invoices':
        return isFocused ? <FocusedInvoiceIcon {...iconProps} /> : <InvoiceIcon {...iconProps} />;
      case 'add':
        return <AddIcon width={28} height={28} />;
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
    <View className="bg-white" style={{ 
      borderTopLeftRadius: 24, 
      borderTopRightRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
    }}>
      <View className="flex-row items-center justify-around px-4 py-3 pb-6">
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

          // Special styling for Add button (middle button)
          if (route.name === 'add') {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
                className="items-center justify-center -mt-8"
              >
                <View className="w-14 h-14 rounded-2xl bg-primary items-center justify-center">
                  {getIcon(route.name, false)}
                </View>
              </TouchableOpacity>
            );
          }

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
