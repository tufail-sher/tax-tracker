import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCreateProfile } from '../hooks/useCreateProfile';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { texts } from '../../../constants/Texts';
import UserIcon from '../../../assets/svg/user_icon.svg';
import ArrowDownIcon from '../../../assets/svg/arrow_down_icon.svg';

export default function CreateProfileScreen() {
  const {
    profileImage,
    setProfileImage,
    phoneNumber,
    setPhoneNumber,
    city,
    setCity,
    errors,
    isLoading,
    handleCreateProfile,
  } = useCreateProfile();

  const [showImageOptionsModal, setShowImageOptionsModal] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad',
  ];

  const requestPermission = async (type: 'camera' | 'library') => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === 'granted';
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === 'granted';
    }
  };

  const pickImage = async (source: 'camera' | 'library') => {
    try {
      const hasPermission = await requestPermission(source);
      if (!hasPermission) {
        // Permission denied - just close modal
        setShowImageOptionsModal(false);
        return;
      }

      let result;
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1] as [number, number],
        quality: 0.8,
      };

      if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
      }
    } catch (error) {
      // Error picking image - just close modal
      console.error('Failed to pick image:', error);
    } finally {
      setShowImageOptionsModal(false);
    }
  };

  return (
    <KeyboardAvoidingView
       style={{ flex: 1 }}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
     >
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <ScrollView
           contentContainerStyle={{ flexGrow: 1 }}
           keyboardShouldPersistTaps="handled"
           showsVerticalScrollIndicator={false}
           bounces={false}
         >
        <View className="flex-1 px-6 pt-16">
          {/* Header */}
          <View className="mb-8">
            <Text className="font-inter-semibold text-lg text-secondary mb-3">
              {texts.register.createProfile.title}
            </Text>
            <Text className="text-secondary/70 text-sm font-inter-regular">
              {texts.register.createProfile.subtitle}
            </Text>
          </View>

          {/* Profile Image */}
          <View className="items-center mb-8">
            <TouchableOpacity onPress={() => setShowImageOptionsModal(true)} className="relative mb-4">
              <View className="w-32 h-32 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    className="w-full h-full"
                  />
                ) : (
                  <UserIcon width={60} height={60} />
                )}
              </View>
              <View className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary items-center justify-center border-4 border-white">
                <Text className="text-white text-xl font-inter-bold">+</Text>
              </View>
            </TouchableOpacity>
            <Text className="text-secondary font-inter-semibold text-sm mb-1">
              {texts.register.createProfile.uploadPicture}
            </Text>
            <Text className="text-secondary/60 text-sm font-inter-regular">
              {texts.register.createProfile.optionalText}
            </Text>
            {errors.profileImage && (
              <Text className="text-red-500 text-xs font-inter-regular mt-1">
                {errors.profileImage}
              </Text>
            )}
          </View>

          {/* Phone Number Field */}
          <TextField 
            label={texts.register.createProfile.phoneNumberLabel}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder={texts.register.createProfile.phoneNumberPlaceholder}
            keyboardType="phone-pad"
            error={errors.phoneNumber}
          />

          {/* City Dropdown */}
          <View className="mb-6">
            <Text className="text-secondary font-inter-medium text-sm mb-2">{texts.register.createProfile.cityLabel}</Text>
            <TouchableOpacity 
              onPress={() => setShowCityDropdown(true)}
              className="bg-gray-50 rounded-lg border border-gray-200 px-4 py-4 flex-row items-center justify-between"
            >
              <Text className={`font-inter-regular text-base ${city ? 'text-secondary' : 'text-secondary/50'}`}>
                {city || texts.register.createProfile.cityPlaceholder}
              </Text>
              <ArrowDownIcon width={20} height={20} />
            </TouchableOpacity>
            {errors.city && (
              <Text className="text-red-500 text-xs font-inter-regular mt-1">
                {errors.city}
              </Text>
            )}
          </View>

          <View className="flex-1" />

          {/* Get Started Button at Bottom */}
          <View className="pb-8">
            <Button
              title={texts.register.createProfile.getStartedButton}
              variant="primary"
              onPress={handleCreateProfile}
              showArrow
              disabled={isLoading}
              loading={isLoading}
            />
          </View>
        </View>
      </ScrollView>
        </TouchableWithoutFeedback>

      {/* Image Options Modal */}
      <Modal
        visible={showImageOptionsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImageOptionsModal(false)}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setShowImageOptionsModal(false)}
          className="flex-1 bg-black/50 justify-end"
        >
          <TouchableOpacity activeOpacity={1} className="bg-white rounded-t-3xl p-6">
            <Text className="font-inter-bold text-xl text-secondary mb-4 text-center">
              {texts.register.createProfile.selectPictureTitle}
            </Text>
            <Text className="font-inter-regular text-sm text-secondary/70 mb-6 text-center">
              {texts.register.createProfile.selectPictureSubtitle}
            </Text>

            {/* Camera Option */}
            <TouchableOpacity
              onPress={() => pickImage('camera')}
              className="bg-primary rounded-lg p-4 mb-3"
            >
              <Text className="font-inter-semibold text-base text-white text-center">
                {texts.register.createProfile.cameraOption}
              </Text>
            </TouchableOpacity>

            {/* Gallery Option */}
            <TouchableOpacity
              onPress={() => pickImage('library')}
              className="bg-primary rounded-lg p-4 mb-3"
            >
              <Text className="font-inter-semibold text-base text-white text-center">
                {texts.register.createProfile.galleryOption}
              </Text>
            </TouchableOpacity>

            {/* Cancel Option */}
            <TouchableOpacity
              onPress={() => setShowImageOptionsModal(false)}
              className="bg-gray-200 rounded-lg p-4"
            >
              <Text className="font-inter-semibold text-base text-secondary text-center">
                {texts.register.createProfile.cancelOption}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* City Dropdown Modal */}
      <Modal
        visible={showCityDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCityDropdown(false)}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setShowCityDropdown(false)}
          className="flex-1 bg-black/50 justify-end"
        >
          <TouchableOpacity activeOpacity={1} className="bg-white rounded-t-3xl p-6">
            <Text className="font-inter-bold text-xl text-secondary mb-6 text-center">
              {texts.register.createProfile.selectCityTitle}
            </Text>

            <ScrollView className="max-h-96">
              {cities.map((cityName, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setCity(cityName);
                    setShowCityDropdown(false);
                  }}
                  className={`py-4 border-b border-gray-100 ${
                    city === cityName ? 'bg-primary/10' : ''
                  }`}
                >
                  <Text className={`font-inter-regular text-base text-center ${
                    city === cityName ? 'text-primary font-inter-semibold' : 'text-secondary'
                  }`}>
                    {cityName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => setShowCityDropdown(false)}
              className="bg-gray-200 rounded-lg p-4 mt-4"
            >
              <Text className="font-inter-semibold text-base text-secondary text-center">
                {texts.register.createProfile.cancelOption}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}
