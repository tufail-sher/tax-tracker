interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
}

interface ProfileFormData {
  profileImage: string;
  phoneNumber: string;
  city: string;
}

export const validateRegisterForm = (data: RegisterFormData) => {
  const errors: Partial<Record<keyof RegisterFormData, string>> = {};

  // Full Name validation
  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters';
  }

  // Email validation
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password validation
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};

export const validateProfileForm = (data: ProfileFormData) => {
  const errors: Partial<Record<keyof ProfileFormData, string>> = {};

  // Profile Image validation
  if (!data.profileImage) {
    errors.profileImage = 'Profile picture is required';
  }

  // Phone Number validation
  if (!data.phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!/^(\+92|0)?[0-9]{10}$/.test(data.phoneNumber.replace(/\s/g, ''))) {
    errors.phoneNumber = 'Please enter a valid phone number';
  }

  // City validation
  if (!data.city.trim()) {
    errors.city = 'City is required';
  }

  return errors;
};
