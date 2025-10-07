import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  sendResetCode,
  verifyResetCode,
  resetPassword,
  clearError,
  resetForgotPasswordState,
  setStep,
} from '../store/forgotPasswordSlice';
import type {
  SendCodePayload,
  VerifyCodePayload,
  ResetPasswordPayload,
} from '../store/forgotPasswordSlice';

export const useForgotPassword = () => {
  const dispatch = useAppDispatch();
  const {
    email,
    verificationCode,
    isLoading,
    error,
    step,
    isCodeSent,
    isCodeVerified,
    isPasswordReset,
  } = useAppSelector((state) => state.forgotPassword);

  const sendCode = async (payload: SendCodePayload) => {
    return dispatch(sendResetCode(payload));
  };

  const verifyCode = async (payload: VerifyCodePayload) => {
    return dispatch(verifyResetCode(payload));
  };

  const resetPass = async (payload: ResetPasswordPayload) => {
    return dispatch(resetPassword(payload));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleResetState = () => {
    dispatch(resetForgotPasswordState());
  };

  const handleSetStep = (newStep: 'email' | 'verify' | 'reset' | 'success') => {
    dispatch(setStep(newStep));
  };

  return {
    email,
    verificationCode,
    isLoading,
    error,
    step,
    isCodeSent,
    isCodeVerified,
    isPasswordReset,
    sendCode,
    verifyCode,
    resetPass,
    clearError: handleClearError,
    resetState: handleResetState,
    setStep: handleSetStep,
  };
};
