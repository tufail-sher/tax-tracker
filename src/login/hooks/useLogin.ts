import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser, clearError, logout } from '../store/loginSlice';
import type { LoginCredentials } from '../store/loginSlice';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error, isAuthenticated } = useAppSelector((state) => state.login);

  const login = async (credentials: LoginCredentials) => {
    return dispatch(loginUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout: handleLogout,
    clearError: handleClearError,
  };
};
