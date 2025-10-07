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

// Validate login form
export const validateLoginForm = (email: string, password: string): {
  email: string | null;
  password: string | null;
  isValid: boolean;
} => {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  
  return {
    email: emailError,
    password: passwordError,
    isValid: !emailError && !passwordError,
  };
};
