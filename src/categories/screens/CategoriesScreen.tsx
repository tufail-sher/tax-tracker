import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { texts } from '../../../constants/Texts';
import Button from '../../components/Button';
import CategoryImg from '../../../assets/svg/category_img.svg';
import UtilitiesIcon from '../../../assets/svg/tags_icon.svg';
import GroceryIcon from '../../../assets/svg/grocery_icon.svg';
import ServicesIcon from '../../../assets/svg/services_icon.svg';
import ShoppingIcon from '../../../assets/svg/shopping_cart_icon.svg';
import OtherIcon from '../../../assets/svg/other_icon.svg';
import FuelIcon from '../../../assets/svg/fuel_icon.svg';
import { AppNavigator } from '../../utils/navigation';
import { useAppSelector } from '../../store/hooks';
import { selectInvoices, selectHasInvoices } from '../../home/store/selectors';

interface CategoryData {
  name: string;
  icon: React.ReactNode;
  color: string;
  amount: number;
  percentage: number;
}

export default function CategoriesScreen() {
  const invoices = useAppSelector(selectInvoices);
  const hasInvoices = useAppSelector(selectHasInvoices);

  const handleStartScanning = () => {
    AppNavigator.navigateToScanner();
  };

  const getCategoryIcon = (category: string, size: number = 24) => {
    switch (category.toUpperCase()) {
      case 'UTILITIES':
        return <UtilitiesIcon width={size} height={size} />;
      case 'FUEL':
        return <FuelIcon width={size} height={size} />;
      case 'FOOD':
        return <GroceryIcon width={size} height={size} />;
      case 'GROCERY':
        return <GroceryIcon width={size} height={size} />;
      case 'SERVICES':
        return <ServicesIcon width={size} height={size} />;
      case 'SHOPPING':
        return <ShoppingIcon width={size} height={size} />;
      case 'OTHER':
        return <OtherIcon width={size} height={size} />;
      default:
        return <OtherIcon width={size} height={size} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toUpperCase()) {
      case 'UTILITIES':
        return '#A855F7'; // Purple
      case 'GROCERY':
        return '#F97316'; // Orange
      case 'FUEL':
        return '#EF4444'; // Red
      case 'SERVICES':
        return '#EC4899'; // Pink
      case 'SHOPPING':
        return '#84CC16'; // Lime
      case 'OTHER':
        return '#06B6D4'; // Cyan
      case 'FOOD':
        return '#F97316'; // Orange
      default:
        return '#6B7280'; // Gray
    }
  };

  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  // Calculate category totals
  const calculateCategories = (): CategoryData[] => {
    // Define all possible categories
    const allCategories = ['UTILITIES', 'GROCERY', 'FUEL', 'SERVICES', 'SHOPPING', 'OTHER'];
    
    const categoryMap = new Map<string, number>();
    let totalTax = 0;

    // Initialize all categories with 0
    allCategories.forEach(cat => {
      categoryMap.set(cat, 0);
    });

    // Calculate totals from invoices
    invoices.forEach(invoice => {
      const category = invoice.category.toUpperCase();
      const currentAmount = categoryMap.get(category) || 0;
      categoryMap.set(category, currentAmount + invoice.totalTax);
      totalTax += invoice.totalTax;
    });

    const categories: CategoryData[] = Array.from(categoryMap.entries()).map(([name, amount]) => ({
      name: name.charAt(0) + name.slice(1).toLowerCase(),
      icon: getCategoryIcon(name, 24),
      color: getCategoryColor(name),
      amount: amount,
      percentage: totalTax > 0 ? Math.round((amount / totalTax) * 100) : 0,
    }));

    // Sort by amount descending
    return categories.sort((a, b) => b.amount - a.amount);
  };

  const categories = hasInvoices ? calculateCategories() : [];
  const totalTaxPaid = invoices.reduce((sum, invoice) => sum + invoice.totalTax, 0);

  // Render empty state when no invoices
  if (!hasInvoices) {
    return (
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="px-6 pt-12 pb-4">
          <Text className="font-inter-bold text-2xl text-secondary">
            {texts.categories.title}
          </Text>
        </View>

        {/* Empty State */}
        <View className="flex-1 items-center justify-center px-6">
          {/* Category Icon Circle */}
          <View 
            className="rounded-full items-center justify-center mb-8"
            style={{
              width: 140,
              height: 140,
              backgroundColor: '#EEF4FF',
            }}
          >
            <CategoryImg width={80} height={80} />
          </View>

          {/* Empty Message */}
          <Text className="font-inter-regular text-base text-secondary text-center mb-10 px-6">
            {texts.categories.emptyTitle}
          </Text>

          {/* Start Scanning Button */}
          <View className="w-full px-0">
            <Button
              title={texts.categories.scanButton}
              onPress={handleStartScanning}
              variant="primary"
              showArrow
            />
          </View>
        </View>
      </View>
    );
  }

  // Render populated view when invoices exist
  return (
    <View className="flex-1 bg-white">
      {/* Header Section with Background Color */}
      <View className="bg-top-gradient px-6 pt-12 pb-6 rounded-b-[40px]">
        <Text className="font-inter-bold text-2xl text-secondary mb-6">
          {texts.categories.title}
        </Text>

        {/* Donut Chart Section */}
        <View className="items-center mb-6">
          {/* Donut Chart */}
          <View className="relative items-center justify-center mb-6">
            <Svg height="200" width="200" viewBox="0 0 200 200">
              <G rotation="-90" origin="100, 100">
                {categories
                  .filter(cat => cat.percentage > 0) // Only draw segments for non-zero categories
                  .map((category, index, filteredCategories) => {
                    // Calculate the starting point for this segment
                    let startAngle = 0;
                    for (let i = 0; i < index; i++) {
                      startAngle += filteredCategories[i].percentage * 3.6; // 360 degrees / 100%
                    }
                    const angle = category.percentage * 3.6;
                    
                    const radius = 80;
                    
                    return (
                      <Circle
                        key={category.name}
                        cx="100"
                        cy="100"
                        r={radius}
                        stroke={category.color}
                        strokeWidth={20}
                        fill="none"
                        strokeDasharray={`${(angle / 360) * (2 * Math.PI * radius)} ${2 * Math.PI * radius}`}
                        strokeDashoffset={-((startAngle / 360) * (2 * Math.PI * radius))}
                      />
                    );
                  })}
              </G>
            </Svg>
            
            {/* Center Text */}
            <View className="absolute items-center justify-center" style={{ width: 200, height: 200 }}>
              <Text className="font-inter-bold text-2xl text-secondary">
                {formatCurrency(totalTaxPaid)}
              </Text>
              <Text className="font-inter-regular text-xs text-primary mt-1">
                {texts.categories.taxPaidLabel}
              </Text>
            </View>
          </View>

          {/* Legend Chips */}
          <View className="flex-row flex-wrap justify-center gap-2 px-4">
            {categories.map((category, idx) => {
              // Get small colored icon for legend
              const SmallIcon = () => {
                switch (category.name.toUpperCase()) {
                  case 'UTILITIES':
                    return <UtilitiesIcon width={16} height={16} stroke={category.color} />;
                  case 'FUEL':
                    return <FuelIcon width={16} height={16} stroke={category.color} />;
                  case 'FOOD':
                  case 'GROCERY':
                    return <GroceryIcon width={16} height={16} stroke={category.color} />;
                  case 'SERVICES':
                    return <ServicesIcon width={16} height={16} stroke={category.color} />;
                  case 'SHOPPING':
                    return <ShoppingIcon width={16} height={16} stroke={category.color} />;
                  case 'OTHER':
                    return <OtherIcon width={16} height={16} stroke={category.color} />;
                  default:
                    return <OtherIcon width={16} height={16} stroke={category.color} />;
                }
              };

              return (
                <View
                  key={`${category.name}-legend-${idx}`}
                  className="bg-white rounded-full px-3 py-2 flex-row items-center"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                >
                  <View className="mr-2">
                    <SmallIcon />
                  </View>
                  <Text className="font-inter-medium text-xs text-secondary">
                    {category.name} {category.percentage}%
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* Categories List */}
      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-inter-semibold text-lg text-secondary mb-4">
          {texts.categories.yourCategories}
        </Text>

        {categories.map((category, index) => {
          // Get colored icon
          const IconComponent = () => {
            switch (category.name.toUpperCase()) {
              case 'UTILITIES':
                return <UtilitiesIcon width={24} height={24} stroke={category.color} />;
              case 'FUEL':
                return <FuelIcon width={24} height={24} stroke={category.color} />;
              case 'FOOD':
              case 'GROCERY':
                return <GroceryIcon width={24} height={24} stroke={category.color} />;
              case 'SERVICES':
                return <ServicesIcon width={24} height={24} stroke={category.color} />;
              case 'SHOPPING':
                return <ShoppingIcon width={24} height={24} stroke={category.color} />;
              case 'OTHER':
                return <OtherIcon width={24} height={24} stroke={category.color} />;
              default:
                return <OtherIcon width={24} height={24} stroke={category.color} />;
            }
          };

          return (
            <TouchableOpacity
              key={`${category.name}-${index}`}
              activeOpacity={0.7}
              className="mb-3"
            >
              <View 
                className="bg-white rounded-2xl p-4 flex-row items-center"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.08,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                {/* Category Icon */}
                <View
                  className="rounded-full items-center justify-center mr-4"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: `${category.color}15`,
                  }}
                >
                  <IconComponent />
                </View>

                {/* Category Name and Percentage */}
                <View className="flex-1">
                  <Text className="font-inter-semibold text-base text-secondary mb-1">
                    {category.name}
                  </Text>
                  <Text className="font-inter-regular text-sm text-secondary/60">
                    {category.percentage}% of total tax
                  </Text>
                </View>

                {/* Amount */}
                <Text className="font-inter-bold text-lg text-secondary">
                  {formatCurrency(category.amount)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Add extra padding at bottom for tab bar */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
