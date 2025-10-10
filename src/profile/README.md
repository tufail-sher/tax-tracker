# Profile Module

## Overview
The Profile module provides user profile management functionality with a clean, organized interface for accessing various settings and features.

## Features

### Profile Header Section
- **Gradient Background**: Light blue gradient background for visual appeal
- **Profile Card**: White card with user information
  - Profile picture with placeholder fallback
  - User name and email
  - Plan badges (Free Plan / Premium)
  - Upgrade button

### Menu Sections

#### General Section
1. **Personal Information**
   - View and edit personal details
   - Icon: `personal_information_icon.svg`

2. **Reports**
   - Access tax reports and analytics
   - Icon: `reports_icon.svg`

3. **Subscription**
   - Manage subscription and billing
   - Icon: `subscription_icon.svg`

4. **Password**
   - Change account password
   - Icon: `profile_password_icon.svg`

#### Settings Section
1. **Notifications**
   - Configure notification preferences
   - Icon: `notification_icon.svg`

2. **Help & Support**
   - Access help resources and support
   - Icon: `help_support_icon.svg`

## Components

### ProfileScreen
Main screen component displaying user profile and menu options.

**Features:**
- Fetches user data from Redux store
- Displays profile information
- Organized menu items with icons
- Navigation ready for all menu items

## State Management

### Redux Store
The profile module uses Redux Toolkit with async thunks for state management.

#### Profile Slice
- **State**: User profile data, loading status, errors
- **Actions**: setUser, clearUser, updateUserField
- **Async Thunks**:
  - `fetchUserProfile`: Fetch user profile from API
  - `updateUserProfile`: Update user profile data
  - `uploadProfilePicture`: Upload profile picture

#### Selectors
- `selectUser`: Get full user object
- `selectUserName`: Get user name
- `selectUserEmail`: Get user email
- `selectUserPlan`: Get user plan (free/premium)
- `selectProfilePicture`: Get profile picture URL
- `selectIsLoading`: Get loading state
- `selectError`: Get error message

## Data Types

### UserProfile
```typescript
{
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  plan: 'free' | 'premium';
  phone?: string;
  cnic?: string;
  ntn?: string;
  city?: string;
}
```

### ProfileState
```typescript
{
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}
```

## Styling

### Design Elements
- **NativeWind**: Tailwind CSS for styling
- **Gradient Background**: Light blue gradient header
- **Profile Card**: White card with shadow
- **Menu Items**: White cards with icons and arrows
- **Typography**: Inter font family
- **Colors**: Consistent with app theme

### Layout
- Scrollable content
- Proper spacing and padding
- Shadow effects for depth
- Rounded corners
- Tab bar spacing at bottom

## Icons

All icons are SVG components:
- `profile_placeholder.svg`: Profile picture placeholder
- `personal_information_icon.svg`: Personal info menu item
- `reports_icon.svg`: Reports menu item
- `subscription_icon.svg`: Subscription menu item
- `profile_password_icon.svg`: Password menu item
- `notification_icon.svg`: Notifications menu item
- `help_support_icon.svg`: Help & Support menu item
- `sixty_degree_arrow.svg`: Navigation arrows

## Navigation

Menu items are ready for navigation:
- Personal Information → Personal details screen
- Reports → Tax reports screen
- Subscription → Subscription management
- Password → Password change screen
- Notifications → Notification settings
- Help & Support → Help center

## Text Localization

All text strings from `constants/Texts.ts`:
- `texts.profile.title`
- `texts.profile.freePlan`
- `texts.profile.upgrade`
- `texts.profile.general`
- `texts.profile.personalInformation`
- `texts.profile.reports`
- `texts.profile.subscription`
- `texts.profile.password`
- `texts.profile.settings`
- `texts.profile.notifications`
- `texts.profile.helpSupport`

## API Integration

The module is ready for API integration:
- Async thunks prepared for API calls
- TODO comments mark where to add actual API endpoints
- Mock data used for development

## Future Enhancements

1. **Profile Editing**
   - Edit profile information inline
   - Photo upload functionality
   - Crop and resize images

2. **Settings Screens**
   - Notification preferences
   - Privacy settings
   - Data export

3. **Premium Features**
   - Subscription management
   - Payment integration
   - Feature comparison

4. **Reports**
   - Tax report generation
   - Export to PDF
   - Share functionality

5. **Help Center**
   - FAQ section
   - Contact support
   - Tutorial videos
