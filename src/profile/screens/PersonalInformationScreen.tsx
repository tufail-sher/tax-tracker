import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { texts } from '../../../constants/Texts';
import BackArrowIcon from '../../../assets/svg/backarrow_icon.svg';
import ProfilePlaceholder from '../../../assets/svg/profile_placeholder.svg';
import ChromeIcon from '../../../assets/svg/personal_information_chrome_icon.svg';
import CityPickerModal from '../components/CityPickerModal';
import { ProfileCamera } from '../components/ProfileCamera';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUser, selectProfilePicture } from '../store/selectors';
import { updateUserProfile } from '../store/profileSlice';

export default function PersonalInformationScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const profilePicture = useAppSelector(selectProfilePicture);

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [cnic, setCnic] = useState(user?.cnic || '');
  const [ntn, setNtn] = useState(user?.ntn || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || '');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [tempProfilePicture, setTempProfilePicture] = useState<string | null>(null);

  // Validation states
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    cnic: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
      setCnic(user.cnic || '');
      setNtn(user.ntn || '');
      setPhone(user.phone || '');
      setCity(user.city || '');
    }
  }, [user]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCNIC = (cnic: string) => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    return cnicRegex.test(cnic);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+92\s?\d{3}\s?\d{7}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      email: '',
      cnic: '',
      phone: '',
    };

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!cnic.trim()) {
      newErrors.cnic = 'CNIC is required';
      isValid = false;
    } else if (!validateCNIC(cnic)) {
      newErrors.cnic = 'CNIC format: 12345-1234567-1';
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Phone format: +92 333 7654321';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveChanges = () => {
    if (validateForm()) {
      dispatch(updateUserProfile({
        name: fullName,
        email,
        cnic,
        ntn,
        phone,
        city,
      }));
      // TODO: Show success message
      console.log('Profile updated successfully');
    }
  };

  const isFormValid = fullName.trim() && email.trim() && cnic.trim() && phone.trim();

  const handleEditPicture = () => {
    setShowImageOptions(true);
  };

  const requestPermissions = async (type: 'camera' | 'library') => {
    try {
      if (type === 'camera') {
        const cameraPermission = await ImagePicker.getCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
          const result = await ImagePicker.requestCameraPermissionsAsync();
          if (result.status !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Camera permission is required to take photos.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
              ]
            );
            return false;
          }
        }
      } else {
        const mediaPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (mediaPermission.status !== 'granted') {
          const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (result.status !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Media library permission is required to select photos.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
              ]
            );
            return false;
          }
        }
      }
      return true;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  };

  const openCamera = async () => {
    setShowImageOptions(false);
    const hasPermission = await requestPermissions('camera');
    if (hasPermission) {
      setTimeout(() => setShowCamera(true), 300);
    }
  };

  const openLibrary = async () => {
    setShowImageOptions(false);
    const hasPermission = await requestPermissions('library');
    
    if (!hasPermission) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setTempProfilePicture(result.assets[0].uri);
        // TODO: Upload to server and update Redux store
        console.log('Selected image:', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to select image. Please try again.');
    }
  };

  const handlePhotoTaken = (uri: string) => {
    setShowCamera(false);
    setTempProfilePicture(uri);
    // TODO: Upload to server and update Redux store
    console.log('Photo taken:', uri);
  };

  const displayProfilePicture = tempProfilePicture || profilePicture;

  return (
    <View className="flex-1 bg-surface">
      {/* Header with Profile Picture Overlap */}
      <View className="mb-12">
        {/* Header with Gradient Background */}
        <View className="bg-top-gradient px-6 pt-12 pb-20 rounded-b-[40px] ">
          <View className="flex-row items-center mb-5 ">
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} className="mr-4" activeOpacity={0.7}>
              <BackArrowIcon width={24} height={24} />
            </TouchableOpacity>

            {/* Title */}
            <Text className="font-inter-semibold text-xl text-secondary flex-1">
              {texts.personalInformation.title}
            </Text>
          </View>
        </View>

        {/* Profile Picture - Overlapping Header (Half inside, half outside) */}
        <TouchableOpacity
          onPress={handleEditPicture}
          activeOpacity={0.8}
          className="absolute bottom-0 left-0 right-0 items-center"
          style={{ transform: [{ translateY: 50 }] }}
        >
          <View className="relative">
            {displayProfilePicture ? (
              <View 
                className="rounded-full overflow-hidden bg-white"
                style={{
                  width: 110,
                  height: 110,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Image
                  source={{ uri: displayProfilePicture }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View
                className="rounded-full items-center justify-center bg-white"
                style={{
                  width: 110,
                  height: 110,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <ProfilePlaceholder  />
              </View>
            )}
            
            {/* Edit Icon Badge */}
            <View
              className="absolute bottom-1 right-2 bg-primary rounded-full"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <ChromeIcon />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 mt-10">
        <View className="px-6 pt-2">
          {/* Full Name */}
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-secondary mb-2">
              {texts.personalInformation.fullName}
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 font-inter-regular text-base text-secondary"
              placeholder={texts.personalInformation.fullNamePlaceholder}
              placeholderTextColor="#999999"
              value={fullName}
              onChangeText={setFullName}
            />
            {errors.fullName ? (
              <Text className="font-inter-regular text-xs text-error mt-1">
                {errors.fullName}
              </Text>
            ) : null}
          </View>

          {/* Email */}
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-secondary mb-2">
              {texts.personalInformation.email}
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 font-inter-regular text-base text-secondary"
              placeholder={texts.personalInformation.emailPlaceholder}
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? (
              <Text className="font-inter-regular text-xs text-error mt-1">
                {errors.email}
              </Text>
            ) : null}
          </View>

          {/* CNIC Number */}
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-secondary mb-2">
              {texts.personalInformation.cnicNumber}
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 font-inter-regular text-base text-secondary"
              placeholder={texts.personalInformation.cnicPlaceholder}
              placeholderTextColor="#999999"
              value={cnic}
              onChangeText={setCnic}
              keyboardType="numeric"
            />
            {errors.cnic ? (
              <Text className="font-inter-regular text-xs text-error mt-1">
                {errors.cnic}
              </Text>
            ) : null}
          </View>

          {/* NTN (Optional) */}
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-secondary mb-2">
              {texts.personalInformation.ntn}
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 font-inter-regular text-base text-secondary"
              placeholder={texts.personalInformation.ntnPlaceholder}
              placeholderTextColor="#999999"
              value={ntn}
              onChangeText={setNtn}
            />
          </View>

          {/* Phone Number */}
          <View className="mb-4">
            <Text className="font-inter-medium text-sm text-secondary mb-2">
              {texts.personalInformation.phoneNumber}
            </Text>
            <TextInput
              className="bg-white rounded-xl px-4 py-3 font-inter-regular text-base text-secondary"
              placeholder={texts.personalInformation.phonePlaceholder}
              placeholderTextColor="#999999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            {errors.phone ? (
              <Text className="font-inter-regular text-xs text-error mt-1">
                {errors.phone}
              </Text>
            ) : null}
          </View>

          {/* City */}
          <View className="mb-6">
            <Text className="font-inter-medium text-sm text-secondary mb-2">
              {texts.personalInformation.city}
            </Text>
            <TouchableOpacity
              onPress={() => setShowCityPicker(true)}
              className="bg-white rounded-xl px-4 py-3 flex-row justify-between items-center"
            >
              <Text className={`font-inter-regular text-base ${
                city ? 'text-secondary' : 'text-secondary/40'
              }`}>
                {city || texts.personalInformation.cityPlaceholder}
              </Text>
              <Text className="text-secondary text-lg">▼</Text>
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <View className="mb-8">
            <TouchableOpacity
              onPress={handleSaveChanges}
              disabled={!isFormValid}
              className={`rounded-xl py-4 items-center ${
                isFormValid ? 'bg-primary' : 'bg-transparent border-2 border-gray-300'
              }`}
              activeOpacity={0.8}
            >
              <Text className={`font-inter-semibold text-base ${
                isFormValid ? 'text-white' : 'text-gray-400'
              }`}>
                {texts.personalInformation.saveChanges}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* City Picker Modal */}
      <CityPickerModal
        visible={showCityPicker}
        selectedCity={city}
        onSelect={setCity}
        onClose={() => setShowCityPicker(false)}
      />

      {/* Image Options Modal */}
      <Modal
        visible={showImageOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImageOptions(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowImageOptions(false)}>
          <View className="flex-1 bg-black/50 justify-center items-center px-6">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
                <Text className="font-inter-semibold text-xl mb-2 text-center text-secondary">
                  Select Photo
                </Text>
                <Text className="font-inter-regular text-sm mb-6 text-center text-secondary/70">
                  Choose how you want to add your profile picture
                </Text>

                <TouchableOpacity
                  onPress={openLibrary}
                  className="py-4 border-b border-gray-100"
                >
                  <Text className="font-inter-medium text-base text-center text-primary">
                    CHOOSE FROM LIBRARY
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={openCamera}
                  className="py-4"
                >
                  <Text className="font-inter-medium text-base text-center text-primary">
                    TAKE PHOTO
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Camera Modal */}
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
        statusBarTranslucent
        presentationStyle="fullScreen"
      >
        <ProfileCamera
          onPhotoTaken={handlePhotoTaken}
          onClose={() => setShowCamera(false)}
        />
      </Modal>
    </View>
  );
}
