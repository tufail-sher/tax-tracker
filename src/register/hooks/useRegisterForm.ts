import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createAccount } from '../store/registerSlice';
import { validateRegisterForm } from '../utils/validation';
import { AppNavigator } from '../../utils/navigation';

export const useRegisterForm = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.register);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});

  const handleCreateAccount = async () => {
    const validationErrors = validateRegisterForm({
      fullName,
      email,
      password,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const result = await dispatch(
      createAccount({ fullName, email, password })
    );

    if (createAccount.fulfilled.match(result)) {
      AppNavigator.navigateToVerifyEmail();
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    handleCreateAccount,
  };
};
