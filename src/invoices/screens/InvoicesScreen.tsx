import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { texts } from '../../../constants/Texts';
import Button from '../../components/Button';
import ReceiptImg from '../../../assets/svg/receipt_img.svg';
import SearchIcon from '../../../assets/svg/search_icon.svg';
import UtilitiesIcon from '../../../assets/svg/tags_icon.svg';
import FuelIcon from '../../../assets/svg/fuel_icon.svg';
import FoodIcon from '../../../assets/svg/food_icon.svg';
import RightArrowIcon from '../../../assets/svg/right_arrow_icon.svg';
import CalendarIcon from '../../../assets/svg/calendar_icon.svg';
import InvoiceTagIcon from '../../../assets/svg/invoice_tag_icon.svg';
import { AppNavigator } from '../../utils/navigation';
import { useAppSelector } from '../../store/hooks';
import { selectInvoices, selectHasInvoices } from '../../home/store/selectors';

export default function InvoicesScreen() {
  const invoices = useAppSelector(selectInvoices);
  const hasInvoices = useAppSelector(selectHasInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'date' | 'category' | 'refundable' | null>(null);

  const handleStartScanning = () => {
    AppNavigator.navigateToScanner();
  };

  const handleViewDetail = (invoiceId: string) => {
    AppNavigator.navigateToInvoiceDetails();
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toUpperCase()) {
      case 'UTILITIES':
        return <UtilitiesIcon width={20} height={20} />;
      case 'FUEL':
        return <FuelIcon width={20} height={20} />;
      case 'FOOD':
        return <FoodIcon width={20} height={20} />;
      default:
        return <UtilitiesIcon width={20} height={20} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return `RS. ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(invoice =>
    invoice.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render empty state when no invoices
  if (!hasInvoices) {
    return (
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="px-6 pt-12 pb-4">
          <Text className="font-inter-bold text-2xl text-secondary">
            {texts.invoices.title}
          </Text>
        </View>

        {/* Empty State */}
        <View className="flex-1 items-center justify-center px-6">
          {/* Receipt Icon Circle */}
          <View 
            className="rounded-full items-center justify-center mb-8"
            style={{
              width: 140,
              height: 140,
              backgroundColor: '#EEF4FF',
            }}
          >
            <ReceiptImg width={80} height={80} />
          </View>

          {/* Empty Message */}
          <Text className="font-inter-regular text-base text-secondary text-center mb-10 px-6">
            {texts.invoices.emptyTitle}
          </Text>

          {/* Start Scanning Button */}
          <View className="w-full px-0">
            <Button
              title={texts.invoices.scanButton}
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
        <Text className="font-inter-bold text-2xl text-secondary mb-4">
          {texts.invoices.title}
        </Text>

        {/* Search Bar */}
        <View className="bg-white rounded-xl px-4 py-3 flex-row items-center mb-4">
          <SearchIcon width={20} height={20} />
          <TextInput
            className="flex-1 ml-3 font-inter-regular text-base text-secondary"
            placeholder={texts.invoices.searchPlaceholder}
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Chips */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => setSelectedFilter(selectedFilter === 'date' ? null : 'date')}
            className={`px-4 py-2 rounded-full border flex-row items-center ${
              selectedFilter === 'date' 
                ? 'bg-primary border-primary' 
                : 'bg-white border-white'
            }`}
          >
            <View className="mr-2">
              <CalendarIcon width={16} height={16} stroke={selectedFilter === 'date' ? '#FFFFFF' : '#1E1E1E'} />
            </View>
            <Text className={`font-inter-medium text-sm ${
              selectedFilter === 'date' ? 'text-white' : 'text-secondary'
            }`}>
              {texts.invoices.filterByDate}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedFilter(selectedFilter === 'category' ? null : 'category')}
            className={`px-4 py-2 rounded-full border flex-row items-center ${
              selectedFilter === 'category' 
                ? 'bg-primary border-primary' 
                : 'bg-white border-white'
            }`}
          >
            <View className="mr-2">
              <InvoiceTagIcon width={16} height={16} stroke={selectedFilter === 'category' ? '#FFFFFF' : '#1E1E1E'} />
            </View>
            <Text className={`font-inter-medium text-sm ${
              selectedFilter === 'category' ? 'text-white' : 'text-secondary'
            }`}>
              {texts.invoices.filterByCategory}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedFilter(selectedFilter === 'refundable' ? null : 'refundable')}
            className={`px-4 py-2 rounded-full border ${
              selectedFilter === 'refundable' 
                ? 'bg-primary border-primary' 
                : 'bg-white border-white'
            }`}
          >
            <Text className={`font-inter-medium text-sm ${
              selectedFilter === 'refundable' ? 'text-white' : 'text-secondary'
            }`}>
              {texts.invoices.filterByRefundable}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Invoice List */}
      <ScrollView className="flex-1 px-6 pt-4">
        {filteredInvoices.map((invoice, index) => (
          <TouchableOpacity
            key={invoice.id}
            onPress={() => handleViewDetail(invoice.id)}
            activeOpacity={0.7}
          >
            <View className="bg-white rounded-2xl p-4 mb-3" style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 2,
            }}>
              {/* Header Row - Image, Company, Amount */}
              <View className="flex-row mb-3">
                {/* Invoice Image Thumbnail */}
                <View className="w-16 h-16 bg-surface rounded-lg mr-3 items-center justify-center overflow-hidden">
                  {invoice.imageUri ? (
                    <View className="w-full h-full bg-gray-200" />
                  ) : (
                    <ReceiptImg width={32} height={32} />
                  )}
                </View>

                {/* Company Name and Amount */}
                <View className="flex-1">
                  <Text className="text-secondary text-base font-inter-semibold mb-1" numberOfLines={2}>
                    {invoice.companyName}
                  </Text>
                  <Text className="text-secondary/60 text-xs font-inter-regular">
                    {formatDate(invoice.date)}
                  </Text>
                </View>

                {/* Amount Column */}
                <View className="items-end ml-2">
                  <Text className="text-secondary text-base font-inter-semibold mb-1">
                    {formatCurrency(invoice.totalAmount)}
                  </Text>
                  <Text className="text-error text-xs font-inter-semibold">
                    TAX: {formatCurrency(invoice.totalTax)}
                  </Text>
                </View>
              </View>

              {/* Bottom Row - Category and View Detail */}
              <View className="flex-row justify-between items-center border-t border-gray-100 pt-3">
                <View className="flex-row items-center">
                  {getCategoryIcon(invoice.category)}
                  <Text className="text-secondary/60 text-xs font-inter-medium ml-2 uppercase">
                    {invoice.category}
                  </Text>
                </View>
                
                <TouchableOpacity 
                  onPress={() => handleViewDetail(invoice.id)}
                  className="flex-row items-center"
                >
                  <Text className="text-primary text-xs font-inter-semibold mr-2">
                    {texts.home.viewDetail}
                  </Text>
                  <RightArrowIcon />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add extra padding at bottom for tab bar */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
