import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateTaxFilingStatus } from '../store/registerSlice';
import { AppNavigator } from '../../utils/navigation';

export const useTaxFilingStatus = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.register);

  const [selectedStatus, setSelectedStatus] = useState('');

  const handleContinue = async () => {
    if (!selectedStatus) {
      return;
    }

    const result = await dispatch(updateTaxFilingStatus(selectedStatus));

    if (updateTaxFilingStatus.fulfilled.match(result)) {
      AppNavigator.navigateToCreateProfile();
    }
  };

  return {
    selectedStatus,
    setSelectedStatus,
    handleContinue,
    isLoading,
  };
};
