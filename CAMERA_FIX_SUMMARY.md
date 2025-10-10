# Camera Crash Fix Summary

## Problem
The app was crashing on startup in release APK with the following error:
```
java.lang.NoClassDefFoundError: Failed resolution of: Lexpo/modules/core/utilities/VRUtilities;
at expo.modules.camera.CameraViewModuleKt.<clinit>(CameraViewModule.kt:52)
```

## Root Cause
Version mismatch between Expo SDK packages. The app was using:
- **Expo SDK 53** (~53.0.6) - beta/unstable version
- **expo-camera 17.0.8** - SDK 52 compatible version

The `expo-camera` package for SDK 52 was trying to use classes from `expo-modules-core` that don't exist or have different APIs in SDK 53.

## Solution
Updated all Expo packages to match **Expo SDK 53** stable versions, matching your working project configuration:

### Package.json Changes

#### Dependencies Updated:
```json
"expo": "~53.0.6",
"expo-camera": "~16.1.11",        // Was 17.0.8
"expo-constants": "~17.1.7",       // Was 18.0.9
"expo-font": "~14.0.0",            // Was 14.0.8
"expo-image-picker": "~16.1.4",    // Was 17.0.8
"expo-linear-gradient": "~15.0.7", // Was 15.0.7 ✓
"expo-linking": "~7.1.7",          // Was 8.0.8
"expo-router": "~5.1.7",           // Was 6.0.10
"expo-splash-screen": "~0.30.6",   // Was 31.0.10
"expo-status-bar": "~2.2.3",       // Was 2.2.3 ✓
"react": "19.0.0",                 // Was 19.0.0 ✓
"react-native": "0.79.5",          // Was 0.79.5 ✓
"react-native-reanimated": "~3.17.4", // Was 3.17.4 ✓
"react-native-safe-area-context": "5.4.0", // Was ^5.4.0
"react-native-screens": "~4.11.1",  // Was ^4.16.0
```

#### Added Missing Dependencies:
```json
"@expo/vector-icons": "^14.1.0",   // Required for Ionicons
"expo-asset": "^11.0.6",           // Required by expo-font
```

### app.json Changes

#### Android Permissions Updated:
Changed from legacy permissions to Android 13+ format:
```json
"permissions": [
  "android.permission.CAMERA",           // Was "CAMERA"
  "android.permission.READ_MEDIA_IMAGES", // Was "READ_EXTERNAL_STORAGE"
  "android.permission.READ_MEDIA_VIDEO",  // Was "WRITE_EXTERNAL_STORAGE"
  "android.permission.RECORD_AUDIO"       // New
]
```

Added:
```json
"edgeToEdgeEnabled": true
```

## Build Steps Taken

1. **Clean Dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clean Android Build**:
   ```bash
   rm -rf android
   npx expo prebuild --clean --platform android
   ```

3. **Build Release APK**:
   ```bash
   cd android && ./gradlew assembleRelease
   ```

## Key Takeaways

1. **Always match Expo SDK versions** - All expo-* packages must be compatible with the same SDK version
2. **Check package compatibility** - Use `npx expo-doctor` to verify package versions
3. **SDK 53 is latest** - Expo SDK 53 with React Native 0.79.5 is the current stable
4. **expo-camera version** - For SDK 53, use `expo-camera: ~16.1.11` (not 17.x)
5. **Android 13+ permissions** - Use full permission names like `android.permission.CAMERA`

## Working Configuration Reference

Your Cervello project (working) uses the exact same configuration we applied:
- Expo SDK 53.0.6
- expo-camera 16.1.11
- React Native 0.79.5
- React 19.0.0
- Modern Android permissions

## Next Steps

Once the build completes successfully:
1. Install the APK: `adb install android/app/build/outputs/apk/release/app-release.apk`
2. Test camera functionality
3. Verify no crashes on startup
4. Test invoice scanning flow

## References

- Expo SDK 53 Docs: https://docs.expo.dev/versions/v53.0.0/
- expo-camera Docs: https://docs.expo.dev/versions/latest/sdk/camera/
- Android Permissions: https://developer.android.com/about/versions/13/behavior-changes-13#granular-media-permissions
