import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createProfile } from '../store/registerSlice';
import { validateProfileForm } from '../utils/validation';
import { AppNavigator } from '../../utils/navigation';

export const useCreateProfile = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.register);

  const [profileImage, setProfileImage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState<{
    profileImage?: string;
    phoneNumber?: string;
    city?: string;
  }>({});

  const handleCreateProfile = async () => {
    const validationErrors = validateProfileForm({
      profileImage,
      phoneNumber,
      city,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const result = await dispatch(
      createProfile({ profileImage, phoneNumber, city })
    );

    if (createProfile.fulfilled.match(result)) {
      AppNavigator.navigateToLogin();
    }
  };

  return {
    profileImage,
    setProfileImage,
    phoneNumber,
    setPhoneNumber,
    city,
    setCity,
    errors,
    isLoading,
    handleCreateProfile,
  };
};
