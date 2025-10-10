# Add Module

## Overview
The Add module provides a dedicated screen for adding new invoices to the tax tracker app. It features a centered scanner interface that allows users to quickly capture invoice images.

## Features

### Centered Scanner Interface
- **QR Scanner Icon**: Large circular icon with blue gradient border
- **Descriptive Text**: Clear instruction text centered below the icon
- **Start Scanning Button**: Primary action button to launch the camera scanner

### Design
- Clean, minimal interface focused on the primary action
- Vertically and horizontally centered content
- Consistent styling with the rest of the app
- Uses NativeWind (Tailwind CSS) for styling

## Components

### AddScreen
Main screen component for the Add tab.

**Features:**
- Header with "Add Invoice" title
- Centered scanner icon with decorative border
- Description text
- Call-to-action button
- Navigation to camera scanner

**Layout:**
- Header at top with title
- Content centered vertically in remaining space
- Responsive design with proper spacing

## Styling Details

### Scanner Icon Circle
- **Size**: 120x120px
- **Background**: Light blue (#F0F4FE)
- **Border**: 3px solid (#97BAF9)
- **Shadow**: Elevation for depth
- **Icon Size**: 60x60px QR scan icon

### Button
- Full-width with arrow indicator
- Primary blue color
- Navigates to scanner screen on press

## Data Flow
- Button press triggers `AppNavigator.navigateToScanner()`
- Navigates to camera scanner screen
- After scanning, invoice data is processed and added to the app

## Text Localization
All text strings are imported from `constants/Texts.ts`:
- `texts.add.title` - Screen title
- `texts.add.scanTitle` - Description text
- `texts.add.scanButton` - Button text

## Navigation
- Accessible via bottom tab bar "Add" button
- Primary action navigates to scanner screen
- Integrated with app navigation system

## Future Enhancements
- Add manual entry option
- Show recent scans
- Add batch scanning capability
- Gallery image picker option
