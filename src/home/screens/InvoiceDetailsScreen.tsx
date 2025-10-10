import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setInvoiceDetails, setLoading, setError } from '../store/invoiceSlice';
import { texts } from '../../../constants/Texts';
import TagsIcon from '../../../assets/svg/tags_icon.svg';
import { extractInvoiceData, calculateRefundable } from '../services/ocrService';

export default function InvoiceDetailsScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentInvoice = useAppSelector((state) => state.invoice.currentInvoice);
  const isLoading = useAppSelector((state) => state.invoice.isLoading);

  useEffect(() => {
    const processInvoice = async () => {
      if (currentInvoice && !currentInvoice.isProcessed) {
        try {
          dispatch(setLoading(true));
          
          // Extract data using OCR service
          const ocrResult = await extractInvoiceData(currentInvoice.imageUri);
          
          // Calculate refundable amount
          const refundableAmount = calculateRefundable(ocrResult.taxBreakdown);
          
          // Update invoice with extracted data
          const extractedData = {
            ...currentInvoice,
            companyName: ocrResult.companyName,
            date: ocrResult.date,
            totalAmount: ocrResult.totalAmount,
            totalTax: ocrResult.totalTax,
            taxBreakdown: ocrResult.taxBreakdown,
            totalRefundable: refundableAmount,
            category: ocrResult.category,
            isProcessed: true,
          };

          dispatch(setInvoiceDetails(extractedData));
          dispatch(setLoading(false));
        } catch (error) {
          console.error('OCR Error:', error);
          dispatch(setError(texts.invoiceDetails.extractionError));
          dispatch(setLoading(false));
        }
      }
    };

    processInvoice();
  }, [currentInvoice, dispatch]);

  if (!currentInvoice) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-secondary font-inter-medium">No invoice data available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Loading Overlay */}
      {isLoading && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
          <View className="bg-white rounded-2xl px-8 py-6 items-center">
            <ActivityIndicator size="large" color="#2249E2" />
            <Text className="text-secondary font-inter-medium text-base mt-4">
              {texts.invoiceDetails.processing}
            </Text>
          </View>
        </View>
      )}
      {/* Header */}
      <View className="px-6 pt-12 pb-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4"
        >
          <Ionicons name="arrow-back" size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <Text className="font-inter-bold text-xl text-secondary">
          {texts.invoiceDetails.title}
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Invoice Image */}
        <View className="bg-surface rounded-2xl overflow-hidden mb-6">
          <Image
            source={{ uri: currentInvoice.imageUri }}
            className="w-full h-96"
            resizeMode="contain"
          />
        </View>

        {/* Company Name and Category */}
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-1">
            <Text className="font-inter-bold text-xl text-secondary mb-1">
              {currentInvoice.companyName || texts.invoiceDetails.processing}
            </Text>
            <Text className="font-inter-regular text-sm text-secondary/60">
              {currentInvoice.date}
            </Text>
          </View>
          
          {/* Category Tag */}
          <View className="flex-row items-center bg-surface px-3 py-2 rounded-full">
            <TagsIcon width={16} height={16} />
            <Text className="font-inter-medium text-xs text-secondary ml-2">
              {currentInvoice.category}
            </Text>
          </View>
        </View>

        {/* Amount Summary */}
        <View className="flex-row justify-between mb-8">
          <View className="flex-1 mr-3">
            <Text className="font-inter-regular text-sm text-secondary/60 mb-2">
              {texts.invoiceDetails.totalAmount}
            </Text>
            <Text className="font-inter-bold text-2xl text-secondary">
              Rs. {currentInvoice.totalAmount.toFixed(2)}
            </Text>
          </View>
          
          <View className="flex-1 ml-3">
            <Text className="font-inter-regular text-sm text-secondary/60 mb-2">
              {texts.invoiceDetails.totalTax}
            </Text>
            <Text className="font-inter-bold text-2xl text-error">
              Rs. {currentInvoice.totalTax.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Tax Breakdown */}
        <View className="mb-6">
          <Text className="font-inter-bold text-lg text-secondary mb-4">
            {texts.invoiceDetails.taxBreakdown}
          </Text>
          
          {currentInvoice.taxBreakdown.map((tax, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center bg-surface px-4 py-4 rounded-xl mb-3"
            >
              <Text className="font-inter-regular text-base text-secondary">
                {tax.name}
              </Text>
              <Text className="font-inter-semibold text-base text-secondary">
                Rs. {tax.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Refundable */}
        <View className="flex-row justify-between items-center py-6 border-t border-surface mb-8">
          <Text className="font-inter-bold text-base text-secondary">
            {texts.invoiceDetails.totalRefundable}
          </Text>
          <Text className="font-inter-bold text-2xl text-success">
            RS. {currentInvoice.totalRefundable.toFixed(2)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
