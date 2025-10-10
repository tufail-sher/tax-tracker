# Camera Scanner Implementation

## Overview
Custom camera screen for capturing photos of receipts and invoices using expo-camera.

## Features

### 1. **Camera Functionality**
- Simple photo capture interface
- High-quality photo capture (80% quality)
- Manual capture with button press

### 2. **Flash Control**
- Toggle flash on/off
- Visual indicator for flash state
- Flash icon changes based on state (flash/flash-off)

### 3. **Custom UI Elements**
- **Top Bar**:
  - Close button (top left) - Returns to home screen
  - Flash toggle button (top right)
  
- **Camera Frame**:
  - Blue corner indicators (300x400 rectangle)
  - Visual guide for positioning receipts
  - Rounded corners with border
  
- **Camera Button**:
  - Custom SVG button at bottom
  - Tap to capture photo
  - Disabled state while capturing
  
- **Status Messages**:
  - Permission request message
  - Permission denied message
  - Positioning instructions
  - Capturing status
  - Help text at bottom

### 4. **Permissions**
- **iOS**: NSCameraUsageDescription added to Info.plist
- **Android**: CAMERA permission added to AndroidManifest.xml
- Automatic permission request on screen load
- Fallback UI for denied permissions

### 5. **Photo Capture**
When a photo is captured:
- Alert displays with success message
- Captured photo URI logged to console
- Two options:
  - **Take Another**: Capture another photo
  - **Done**: Return to home screen

## File Structure

```
app/
  scanner.tsx                     # Scanner route (headerShown: false)
  _layout.tsx                     # Added scanner screen config
src/
  scanner/
    screens/
      CameraScannerScreen.tsx    # Main camera scanner component
assets/
  svg/
    camera_button.svg            # Custom camera button
constants/
  Texts.ts                       # Added scanner text constants
```

## Navigation

From HomeScreen:
```typescript
const handleStartScanning = () => {
  AppNavigator.navigateToScanner();
};
```

## Styling

### Colors
- Background: Black (#000000)
- Scanner frame corners: Primary Blue (#4F7FFF)
- Text: White
- Overlay buttons: Black with 40% opacity

### Layout
- Full screen camera view
- Fixed top bar (pt-12)
- Centered camera frame (300x400)
- Bottom section with camera button (pb-12)

## Usage

1. User taps "Start Scanning" button on home screen
2. Camera permission is requested (if not already granted)
3. Camera opens in full screen
4. User positions receipt/invoice within the frame
5. User taps the camera button to capture photo
6. Alert shows with success message and photo URI
7. User can take another photo or return to home

## Dependencies

- `expo-camera`: Camera functionality and barcode scanning
- `expo-router`: Navigation
- `@expo/vector-icons`: Icons for UI elements
- `react-native-svg`: Custom camera button

## Next Steps (TODO)

- [ ] Process and save captured photos to storage
- [ ] Add OCR for receipt text extraction
- [ ] Save photo URI to database
- [ ] Add gallery access to import from photos
- [ ] Show captured receipts history
- [ ] Add image preview before saving
- [ ] Implement crop functionality
- [ ] Add filters/adjustments for better clarity
