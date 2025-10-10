import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { texts } from '../../../constants/Texts';
import ProfileHeader from '../components/ProfileHeader';
import CalendarIcon from '../../../assets/svg/report_calendar_icon.svg';

export default function ReportScreen() {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleFromDatePress = () => {
    setShowFromPicker(true);
  };

  const handleToDatePress = () => {
    setShowToPicker(true);
  };

  const onFromDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowFromPicker(false);
    }
    if (event.type === 'set' && selectedDate) {
      setFromDate(selectedDate);
      if (Platform.OS === 'ios') {
        setShowFromPicker(false);
      }
    } else if (event.type === 'dismissed') {
      setShowFromPicker(false);
    }
  };

  const onToDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowToPicker(false);
    }
    if (event.type === 'set' && selectedDate) {
      setToDate(selectedDate);
      if (Platform.OS === 'ios') {
        setShowToPicker(false);
      }
    } else if (event.type === 'dismissed') {
      setShowToPicker(false);
    }
  };

  const handleDownloadReport = () => {
    if (fromDate && toDate) {
      // TODO: Implement report download logic
      console.log('Download report from', fromDate, 'to', toDate);
    }
  };

  const isFormValid = fromDate && toDate;

  return (
    <View className="flex-1 bg-surface">
      <ProfileHeader title={texts.report.title} />

      <View className="flex-1 px-6 pt-6">
        {/* Description */}
        <Text className="font-inter-regular text-base text-secondary mb-6">
          {texts.report.description}
        </Text>

        {/* From Date */}
        <View className="mb-4">
          <Text className="font-inter-medium text-sm text-secondary mb-2">
            {texts.report.from}
          </Text>
          <TouchableOpacity
            onPress={handleFromDatePress}
            className="bg-white rounded-xl px-4 py-3 flex-row justify-between items-center"
          >
            <Text className={`font-inter-regular text-base ${
              fromDate ? 'text-secondary' : 'text-secondary/40'
            }`}>
              {formatDate(fromDate) || texts.report.datePlaceholder}
            </Text>
            <CalendarIcon width={20} height={20} />
          </TouchableOpacity>
        </View>

        {/* To Date */}
        <View className="mb-6">
          <Text className="font-inter-medium text-sm text-secondary mb-2">
            {texts.report.to}
          </Text>
          <TouchableOpacity
            onPress={handleToDatePress}
            className="bg-white rounded-xl px-4 py-3 flex-row justify-between items-center"
          >
            <Text className={`font-inter-regular text-base ${
              toDate ? 'text-secondary' : 'text-secondary/40'
            }`}>
              {formatDate(toDate) || texts.report.datePlaceholder}
            </Text>
            <CalendarIcon width={20} height={20} />
          </TouchableOpacity>
        </View>

        {/* Date Pickers */}
        {showFromPicker && (
          <DateTimePicker
            value={fromDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onFromDateChange}
            maximumDate={new Date()}
          />
        )}

        {showToPicker && (
          <DateTimePicker
            value={toDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onToDateChange}
            minimumDate={fromDate || undefined}
            maximumDate={new Date()}
          />
        )}

        {/* Spacer to push button to bottom */}
        <View className="flex-1" />

        {/* Download Report Button */}
        <View className="mb-8">
          <TouchableOpacity
            onPress={handleDownloadReport}
            disabled={!isFormValid}
            className={`rounded-xl py-4 items-center ${
              isFormValid ? 'bg-primary' : 'bg-transparent border-2 border-gray-300'
            }`}
            activeOpacity={0.8}
          >
            <Text className={`font-inter-semibold text-base ${
              isFormValid ? 'text-white' : 'text-gray-400'
            }`}>
              {texts.report.downloadReport}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
