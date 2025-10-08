import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { verifyEmail, resendVerificationCode } from '../store/registerSlice';
import { AppNavigator } from '../../utils/navigation';

export const useVerifyEmail = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.register);

  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setError('');

    const result = await dispatch(verifyEmail(code));

    if (verifyEmail.fulfilled.match(result)) {
      AppNavigator.navigateToWelcome();
    }
  };

  const handleResendCode = async () => {
    await dispatch(resendVerificationCode());
  };

  return {
    code,
    setCode,
    error,
    isLoading,
    handleVerifyCode,
    handleResendCode,
  };
};
