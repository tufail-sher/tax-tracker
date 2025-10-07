// Email validation
export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Email format is incorrect.';
  }
  
  return null;
};

// Verification code validation
export const validateVerificationCode = (code: string): string | null => {
  if (!code) {
    return 'Verification code is required';
  }
  
  if (code.length !== 6) {
    return 'Code must be 6 digits';
  }
  
  if (!/^\d+$/.test(code)) {
    return 'Code must contain only numbers';
  }
  
  return null;
};

// Password validation
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  
  return null;
};

// Confirm password validation
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};

// Validate forgot password form
export const validateForgotPasswordForm = (email: string): {
  email: string | null;
  isValid: boolean;
} => {
  const emailError = validateEmail(email);
  
  return {
    email: emailError,
    isValid: !emailError,
  };
};

// Validate verify code form
export const validateVerifyCodeForm = (code: string): {
  code: string | null;
  isValid: boolean;
} => {
  const codeError = validateVerificationCode(code);
  
  return {
    code: codeError,
    isValid: !codeError,
  };
};

// Validate reset password form
export const validateResetPasswordForm = (
  newPassword: string,
  confirmPassword: string
): {
  newPassword: string | null;
  confirmPassword: string | null;
  isValid: boolean;
} => {
  const newPasswordError = validatePassword(newPassword);
  const confirmPasswordError = validateConfirmPassword(newPassword, confirmPassword);
  
  return {
    newPassword: newPasswordError,
    confirmPassword: confirmPasswordError,
    isValid: !newPasswordError && !confirmPasswordError,
  };
};
