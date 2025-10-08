# Register Account Module

This module handles the complete user registration flow for the Tax Tracker App.

## Module Structure

```
src/register/
├── controller/
│   └── RegisterController.ts     # API calls for registration
├── hooks/
│   ├── index.ts                  # Export all hooks
│   ├── useRegisterForm.ts        # Hook for create account screen
│   ├── useVerifyEmail.ts         # Hook for email verification
│   ├── useTaxFilingStatus.ts     # Hook for tax status selection
│   └── useCreateProfile.ts       # Hook for profile creation
├── screens/
│   ├── CreateAccountScreen.tsx   # Screen 1: Account creation
│   ├── VerifyEmailScreen.tsx     # Screen 2: Email verification
│   ├── WelcomeScreen.tsx         # Screen 3: Welcome message
│   ├── TaxFilingStatusScreen.tsx # Screen 4: Tax filing status
│   └── CreateProfileScreen.tsx   # Screen 5: Profile with image
├── store/
│   └── registerSlice.ts          # Redux slice for registration
└── utils/
    └── validation.ts             # Form validation utilities
```

## Registration Flow

1. **Create Account** (`/register`)
   - Full Name
   - Email Address
   - Password
   - Confirm Password
   - Validates all inputs
   - Creates account via API

2. **Verify Email** (`/register/verify-email`)
   - Enter 6-digit verification code
   - Option to resend code
   - Validates email ownership

3. **Welcome** (`/register/welcome`)
   - Welcome message
   - Success confirmation
   - Continue to next step

4. **Tax Filing Status** (`/register/tax-filing-status`)
   - Single
   - Married Filing Jointly
   - Married Filing Separately
   - Head of Household
   - Qualifying Widow(er)

5. **Create Profile** (`/register/create-profile`)
   - Profile picture (camera or gallery)
   - CNIC (13 digits)
   - Phone number
   - Address
   - Completes registration

## Features

### Image Picker
- Camera access for taking photos
- Gallery access for selecting existing photos
- Image cropping (1:1 aspect ratio)
- Quality optimization (0.8)

### Validation
- Full name: Minimum 3 characters
- Email: Valid email format
- Password: Minimum 8 characters
- Passwords must match
- CNIC: Exactly 13 digits
- Phone: Valid Pakistani phone number format
- Address: Minimum 10 characters
- Profile picture: Required

### State Management
All registration data is managed through Redux Toolkit:
- Account creation
- Email verification
- Tax filing status
- Profile completion

## Routes

All routes are configured in `app/register/_layout.tsx` with hidden headers:

- `/register` - Create Account
- `/register/verify-email` - Verify Email
- `/register/welcome` - Welcome
- `/register/tax-filing-status` - Tax Filing Status
- `/register/create-profile` - Create Profile

## Dependencies

- `expo-image-picker`: Profile picture selection
- `@reduxjs/toolkit`: State management
- `expo-router`: Navigation

## Permissions

Configured in `app.json`:
- Camera permission: "The app needs access to your camera to take profile pictures."
- Photo library permission: "The app needs access to your photos to set your profile picture."

## Usage

Navigate to the register flow:

```typescript
import { router } from 'expo-router';

router.push('/register');
```

The module will handle the complete registration flow and redirect to the main app (`/(tabs)`) upon completion.
