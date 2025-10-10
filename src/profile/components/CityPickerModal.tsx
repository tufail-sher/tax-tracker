import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { pakistanCities } from '../../constants/cities';

interface CityPickerModalProps {
  visible: boolean;
  selectedCity: string;
  onSelect: (city: string) => void;
  onClose: () => void;
}

export default function CityPickerModal({ visible, selectedCity, onSelect, onClose }: CityPickerModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCities = pakistanCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCity = (city: string) => {
    onSelect(city);
    setSearchQuery('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-[30px] max-h-[70%]">
          {/* Header */}
          <View className="px-6 pt-6 pb-4 border-b border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-inter-bold text-xl text-secondary">
                Select City
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="font-inter-semibold text-lg text-secondary">✕</Text>
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View className="bg-surface rounded-xl px-4 py-3">
              <TextInput
                className="font-inter-regular text-base text-secondary"
                placeholder="Search cities..."
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Cities List */}
          <ScrollView className="px-6">
            {filteredCities.map((city) => (
              <TouchableOpacity
                key={city}
                onPress={() => handleSelectCity(city)}
                className="py-4 border-b border-gray-100"
                activeOpacity={0.7}
              >
                <Text 
                  className={`font-inter-medium text-base ${
                    selectedCity === city ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  {city}
                </Text>
              </TouchableOpacity>
            ))}
            {filteredCities.length === 0 && (
              <View className="py-8 items-center">
                <Text className="font-inter-regular text-base text-secondary/60">
                  No cities found
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
