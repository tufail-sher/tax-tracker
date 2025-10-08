# Home Module Structure

## Directory Structure
```
src/home/
├── components/
│   └── CustomTabBar.tsx          # Custom bottom tab navigation with curved design
└── screens/
    └── HomeScreen.tsx             # Main home screen

app/(tabs)/
├── _layout.tsx                    # Tab navigation layout with custom tab bar
├── index.tsx                      # Home tab (uses HomeScreen)
├── invoices.tsx                   # Invoices tab
├── add.tsx                        # Add tab (center button)
├── categories.tsx                 # Categories tab
└── profile.tsx                    # Profile tab
```

## Features

### HomeScreen
- **Gradient Header**: Uses `bg-top-gradient` color (#C1D5FC)
- **User Greeting**: Displays "Hello, [Name]" with status
- **Profile Picture**: Circular profile image in header
- **Crown Icon**: Status indicator
- **QR Scanner Section**: 
  - Large circular QR icon button
  - Scan description text
  - "Start Scanning" button with arrow

### CustomTabBar
- **Curved Design**: Rounded top corners (24px radius)
- **Shadow Effect**: Elevation and shadow for depth
- **5 Tabs**:
  1. Home - `home_icon.svg` / `focused_home_icon.svg`
  2. Invoices - `invoice_icon.svg` / `focused_invoice_icon.svg`
  3. Add - `add_icon.svg` (center, elevated with primary bg)
  4. Categories - `categories_icon.svg` / `focused_categories_icon.svg`
  5. Profile - `profile_icon.svg` / `focused_profile_icon.svg`

### Color Scheme
- **Top Gradient**: `#C1D5FC` (`bg-top-gradient`)
- **Focused Tab**: `#2249E2` (`text-tab-focused`)
- **Unfocused Tab**: `#757575` (`text-tab-unfocused`)
- **Primary Button**: `#2249E2`

### Text Constants
All text is declared in `constants/Texts.ts` under `home` section:
- greeting: "Hello"
- status: "Awaiting Input"
- scanTitle: "Take a photo of your invoice to extract tax information"
- scanButton: "Start Scanning"
- tabs: { home, invoices, add, categories, profile }

### Components Used
- **Button**: Reused from `src/components/Button.tsx` with:
  - `variant="primary"`
  - `showArrow={true}`
  - Consistent styling across app

### SVG Assets
- `qr_scan_icon.svg` - Main scan icon
- `home_icon.svg` / `focused_home_icon.svg`
- `invoice_icon.svg` / `focused_invoice_icon.svg`
- `add_icon.svg` - Center elevated button
- `categories_icon.svg` / `focused_categories_icon.svg`
- `profile_icon.svg` / `focused_profile_icon.svg`

## Tailwind Custom Colors Added
```javascript
'top-gradient': '#C1D5FC',      // Header gradient background
'tab-focused': '#2249E2',        // Active tab text color
'tab-unfocused': '#757575',      // Inactive tab text color
```

## Navigation Integration
- Uses Expo Router's tab navigation
- Custom tab bar replaces default
- HomeScreen imported and used in `app/(tabs)/index.tsx`
- All tabs configured in `app/(tabs)/_layout.tsx`

## Design Matches Figma
✅ Top gradient background color
✅ Curved bottom tab bar
✅ Focused/unfocused tab states
✅ Center elevated Add button
✅ Proper icon states
✅ Text from constants file
✅ Reused Button component
✅ Consistent folder structure with other modules
