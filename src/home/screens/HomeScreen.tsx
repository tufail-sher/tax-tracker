import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { texts } from '../../../constants/Texts';
import Button from '../../components/Button';
import QrScanIcon from '../../../assets/svg/qr_scan_icon.svg';
import CrownIcon from '../../../assets/svg/crown_icon.svg';
import UtilitiesIcon from '../../../assets/svg/tags_icon.svg';
import FuelIcon from '../../../assets/svg/fuel_icon.svg';
import FoodIcon from '../../../assets/svg/food_icon.svg';
import SixtyDegreeArrow from '../../../assets/svg/sixty_degree_arrow.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { AppNavigator } from '../../utils/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectInvoices, selectHasInvoices } from '../store/selectors';
import { fetchInvoices } from '../store/invoiceSlice';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const invoices = useAppSelector(selectInvoices);
  const hasInvoices = useAppSelector(selectHasInvoices);

  useEffect(() => {
    // Fetch invoices on mount (will use API in future)
    dispatch(fetchInvoices());
  }, [dispatch]);

  const handleStartScanning = () => {
    AppNavigator.navigateToScanner();
  };

  const handleViewDetail = (invoiceId: string) => {
    AppNavigator.navigateToInvoiceDetails();
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toUpperCase()) {
      case 'UTILITIES':
        return <UtilitiesIcon width={16} height={16} />;
      case 'FUEL':
        return <FuelIcon width={16} height={16} />;
      case 'FOOD':
        return <FoodIcon width={16} height={16} />;
      default:
        return <UtilitiesIcon width={16} height={16} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return `RS. ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Mock data for chart (to be replaced with actual data in future)
  const chartData = [
    { month: 'Mar', value: 70, change: null },
    { month: 'Apr', value: 85, change: '+7.8%' },
    { month: 'May', value: 60, change: null },
    { month: 'Jun', value: 75, change: null },
    { month: 'Jul', value: 90, change: '+3.4%' },
  ];

  // Render empty state when no invoices
  if (!hasInvoices) {
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

  // Render populated view when invoices exist
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Top Section with Gradient Background */}
      <View className="bg-top-gradient px-6 pt-16 pb-6 rounded-b-[40px]">
        {/* Header with Profile */}
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-1">
            <Text className="font-inter-bold text-3xl text-secondary">
              {texts.home.greeting}, Maryam
            </Text>
            <Text className="font-inter-regular text-base text-primary mt-1">
              {texts.home.statusWithData} <Text className="font-inter-bold">3.7%</Text>
            </Text>
          </View>
          
          {/* Crown Icon and Profile Picture Container */}
          <View className="flex-row items-center ml-4">
            <View className="mr-3">
              <CrownIcon width={20} height={20} />
            </View>
            
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

        {/* Chart Section */}
        <View className="flex-row items-end justify-between h-40 mb-4">
          {chartData.map((item, index) => (
            <View key={item.month} className="flex-1 items-center mx-1">
              {/* Change Indicator */}
              <View className="mb-2 h-6">
                {item.change && (
                  <View className={`px-2 py-1 rounded-full ${item.change.startsWith('+') ? 'bg-green-500' : 'bg-red-500'}`}>
                    <Text className="text-white text-[10px] font-inter-semibold">{item.change}</Text>
                  </View>
                )}
              </View>
              
              {/* Bar */}
              <View 
                className={`w-full rounded-t-lg ${index === chartData.length - 1 ? 'bg-primary' : 'bg-white/50'}`}
                style={{ height: `${item.value}%` }}
              />
              
              {/* Month Label */}
              <Text className="text-secondary text-xs font-inter-medium mt-2">{item.month}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats Cards */}
      <View className="px-6 mt-6">
        <View className="flex-row justify-between mb-6">
          {/* Total Tax Paid Card */}
          <View className="flex-1 mr-2 bg-white rounded-2xl p-4" style={{ 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <Text className="text-secondary/60 text-xs font-inter-regular mb-1">
              {texts.home.totalTaxPaid}
            </Text>
            <Text className="text-secondary text-2xl font-inter-bold mb-1">
              RS. 1,807
            </Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-1" />
              <Text className="text-green-500 text-xs font-inter-medium">-6.3%</Text>
            </View>
          </View>

          {/* Potential Refund Card */}
          <View className="flex-1 ml-2 bg-white rounded-2xl p-4" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}>
            <Text className="text-secondary/60 text-xs font-inter-regular mb-1">
              {texts.home.potentialRefund}
            </Text>
            <Text className="text-secondary text-2xl font-inter-bold mb-1">
              RS. 1,807
            </Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 rounded-full bg-red-500 mr-1" />
              <Text className="text-red-500 text-xs font-inter-medium">+7.8%</Text>
            </View>
          </View>
        </View>

        {/* Invoices Section */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-secondary text-xl font-inter-bold">
            {texts.home.invoicesTitle}
          </Text>
          <TouchableOpacity>
            <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
              <SixtyDegreeArrow />
            </View>
          </TouchableOpacity>
        </View>

        {/* Invoice List */}
        {invoices.slice(0, 4).map((invoice, index) => (
          <TouchableOpacity
            key={invoice.id}
            onPress={() => handleViewDetail(invoice.id)}
            activeOpacity={0.7}
          >
            <View className={`bg-white rounded-2xl p-4 ${index < 3 ? 'mb-3' : 'mb-24'}`} style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}>
              {/* Company Name and Amount */}
              <View className="flex-row justify-between items-start mb-2">
                <Text className="flex-1 text-secondary text-sm font-inter-semibold mr-2">
                  {invoice.companyName}
                </Text>
                <Text className="text-secondary text-sm font-inter-semibold">
                  {formatCurrency(invoice.totalAmount)}
                </Text>
              </View>

              {/* Date and Tax */}
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-secondary/60 text-xs font-inter-regular">
                  {formatDate(invoice.date)}
                </Text>
                <Text className="text-error text-xs font-inter-semibold">
                  TAX: {formatCurrency(invoice.totalTax)}
                </Text>
              </View>

              {/* Category and View Detail */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  {getCategoryIcon(invoice.category)}
                  <Text className="text-secondary/60 text-xs font-inter-medium ml-1">
                    {invoice.category}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleViewDetail(invoice.id)}>
                  <Text className="text-primary text-xs font-inter-semibold">
                    {texts.home.viewDetail} →
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
