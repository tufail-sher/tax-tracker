import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { CameraView, Camera, FlashMode } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CameraButton from '../../../assets/svg/camera_button.svg';
import { texts } from '../../../constants/Texts';
import { useAppDispatch } from '../../store/hooks';
import { setCapturedImage } from '../../home/store/invoiceSlice';
import { AppNavigator } from '../../utils/navigation';

export default function CameraScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const handleCapture = async () => {
    if (isCapturing || !cameraRef.current) return;
    
    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      if (photo) {
        // Save the captured image to Redux
        dispatch(setCapturedImage({ imageUri: photo.uri }));
        
        Alert.alert(
          texts.scanner.successTitle,
          texts.scanner.successMessage,
          [
            {
              text: texts.scanner.retryButton,
              onPress: () => setIsCapturing(false),
            },
            {
              text: texts.scanner.doneButton,
              onPress: () => {
                // Navigate to invoice details and remove scanner from stack
                AppNavigator.navigateToInvoiceDetails();
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert(texts.scanner.errorTitle, texts.scanner.errorMessage);
      setIsCapturing(false);
    }
  };

  const toggleFlash = () => {
    setFlashMode(current => 
      current === 'off' ? 'on' : 'off'
    );
  };

  const getFlashIcon = () => {
    return flashMode === 'on' ? 'flash' : 'flash-off';
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white">{texts.scanner.permissionRequest}</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-6">
        <Text className="text-white text-center text-lg mb-4">
          {texts.scanner.permissionDenied}
        </Text>
        <TouchableOpacity
          className="bg-primary px-6 py-3 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white font-inter-semibold">{texts.scanner.goBackButton}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* Camera View */}
      <CameraView
        ref={cameraRef}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        facing="back"
        flash={flashMode}
      >
        {/* Top Bar */}
        <View className="absolute top-0 left-0 right-0 pt-12 px-6 flex-row justify-between items-center z-10">
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black/40 rounded-full p-3 w-12 h-12 items-center justify-center"
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          {/* Flash Toggle Button */}
          <TouchableOpacity
            onPress={toggleFlash}
            className="bg-black/40 rounded-full p-3 w-12 h-12 items-center justify-center"
          >
            <Ionicons name={getFlashIcon()} size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Camera Frame Guide */}
        <View className="flex-1 items-center justify-center">
          {/* Frame Guide - 300x400 with corner borders */}
          <View className="relative" style={{ width: 300, height: 400 }}>
            {/* Top Left Corner */}
            <View className="absolute top-0 left-0 w-12 h-12 border-primary border-l-4 border-t-4 rounded-tl-xl" />
            {/* Top Right Corner */}
            <View className="absolute top-0 right-0 w-12 h-12 border-primary border-r-4 border-t-4 rounded-tr-xl" />
            {/* Bottom Left Corner */}
            <View className="absolute bottom-0 left-0 w-12 h-12 border-primary border-l-4 border-b-4 rounded-bl-xl" />
            {/* Bottom Right Corner */}
            <View className="absolute bottom-0 right-0 w-12 h-12 border-primary border-r-4 border-b-4 rounded-br-xl" />
          </View>

          {/* Instruction Text */}
          <Text className="text-white text-center font-inter-medium text-base mt-8 px-6">
            {texts.scanner.instruction}
          </Text>
        </View>

        {/* Bottom Section with Camera Button */}
        <View className="absolute bottom-0 left-0 right-0 pb-12 px-6 items-center">
          {/* Capture Button */}
          <TouchableOpacity
            onPress={handleCapture}
            className="items-center"
            disabled={isCapturing}
          >
            <CameraButton width={75} height={75} opacity={isCapturing ? 0.5 : 1} />
          </TouchableOpacity>

          {/* Help Text */}
          <Text className="text-white/70 text-center font-inter-regular text-sm mt-6">
            {isCapturing ? texts.scanner.capturing : texts.scanner.captureButton}
          </Text>
        </View>
      </CameraView>
    </View>
  );
}
