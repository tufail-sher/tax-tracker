import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { CameraView, FlashMode, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import CameraButton from '../../../assets/svg/camera_button.svg';
import { texts } from '../../../constants/Texts';
import { useAppDispatch } from '../../store/hooks';
import { setCapturedImage } from '../../home/store/invoiceSlice';
import { AppNavigator } from '../../utils/navigation';

export default function CameraScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();


  const handleCapture = async () => {
    console.log('[TaxTracker] Camera capture button pressed');
    console.log('[TaxTracker] Camera ready:', cameraReady);
    console.log('[TaxTracker] Is capturing:', isCapturing);
    console.log('[TaxTracker] Camera ref:', !!cameraRef.current);
    
    if (!cameraReady) {
      Alert.alert('Camera Not Ready', 'Please wait for camera to initialize.');
      return;
    }
    
    if (isCapturing || !cameraRef.current) {
      console.log('[TaxTracker] Already capturing or no camera ref');
      return;
    }
    
    try {
      setIsCapturing(true);
      console.log('[TaxTracker] Taking picture...');
      
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        exif: false,
        skipProcessing: false,
      });
      
      console.log('[TaxTracker] Photo result:', JSON.stringify(photo));
      
      if (!photo) {
        console.error('[TaxTracker] No photo object returned');
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
        setIsCapturing(false);
        return;
      }
      
      if (!photo.uri) {
        console.error('[TaxTracker] No photo URI in result:', photo);
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
        setIsCapturing(false);
        return;
      }
      
      console.log('[TaxTracker] Photo captured successfully:', photo.uri);
      
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
              // Replace camera screen with invoice details (removes camera from stack)
              router.replace('/invoice-details');
            },
          },
        ]
      );
    } catch (error: any) {
      console.error('[TaxTracker] Error taking picture:', error);
      console.error('[TaxTracker] Error details:', error.message, error.stack);
      Alert.alert('Error', error.message || 'Failed to capture photo. Please try again.');
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

  // Camera permissions are still loading
  if (!permission) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white mt-4">{texts.scanner.permissionRequest}</Text>
      </View>
    );
  }

  // Camera permissions not granted yet
  if (!permission.granted) {
    return (
      <View className="flex-1 bg-black items-center justify-center px-6">
        <Text className="text-white text-center text-lg mb-4">
          {texts.scanner.permissionDenied}
        </Text>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-3 rounded-full mb-3"
          onPress={requestPermission}
        >
          <Text className="text-white font-inter-semibold">Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-600 px-6 py-3 rounded-full"
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
        onCameraReady={() => {
          console.log('[TaxTracker] Camera is ready, waiting 500ms for stabilization...');
          // Add a small delay to ensure camera is fully ready in release builds
          setTimeout(() => {
            console.log('[TaxTracker] Camera stabilized and ready for capture');
            setCameraReady(true);
          }, 500);
        }}
        onMountError={(error) => {
          console.error('[TaxTracker] Camera mount error:', error);
          Alert.alert('Camera Error', 'Failed to initialize camera. Please try again.');
          setCameraReady(false);
        }}
      >
        {/* Camera Loading Indicator */}
        {!cameraReady && (
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/80 items-center justify-center z-20">
            <ActivityIndicator size="large" color="#ffffff" />
            <Text className="text-white text-base mt-4">Initializing Camera...</Text>
          </View>
        )}

        {/* Top Bar */}
        <View className="absolute top-0 left-0 right-0 pt-12 px-6 flex-row justify-between items-center z-10">
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black/40 rounded-full p-3 w-12 h-12 items-center justify-center"
          >
            <MaterialIcons name="close" size={28} color="white" />
          </TouchableOpacity>

          {/* Flash Toggle Button */}
          <TouchableOpacity
            onPress={toggleFlash}
            className="bg-black/40 rounded-full p-3 w-12 h-12 items-center justify-center"
          >
            <MaterialIcons name={flashMode === 'on' ? 'flash-on' : 'flash-off'} size={28} color="white" />
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
            disabled={isCapturing || !cameraReady}
          >
            <CameraButton width={75} height={75} opacity={(isCapturing || !cameraReady) ? 0.5 : 1} />
          </TouchableOpacity>

          {/* Help Text */}
          <Text className="text-white/70 text-center font-inter-regular text-sm mt-6">
            {!cameraReady ? 'Initializing...' : isCapturing ? texts.scanner.capturing : texts.scanner.captureButton}
          </Text>
        </View>
      </CameraView>
    </View>
  );
}
