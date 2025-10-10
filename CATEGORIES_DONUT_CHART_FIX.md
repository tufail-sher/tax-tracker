# Categories Screen - Donut Chart Implementation

## Changes Made

### 1. Added SVG Import
```typescript
import Svg, { Circle, G } from 'react-native-svg';
```

### 2. Implemented Real Donut Chart
- Replaced placeholder circles with proper SVG donut chart
- Uses `Circle` components with `strokeDasharray` and `strokeDashoffset` for segments
- Each category gets its own colored segment based on percentage
- Center text shows total tax paid with label

### 3. Updated Legend Chips
- Changed from colored dots to actual category icons
- Icons are colored to match their category color using `stroke` prop
- Shows percentage next to each category name

### 4. Fixed Category List Cards
- Icons now use the category color via `stroke` prop
- Each card shows:
  - Colored icon in circular background
  - Category name
  - Percentage of total tax
  - Actual tax amount (not 0)

### 5. Dynamic Icon Coloring
All icons (UtilitiesIcon, GroceryIcon, FuelIcon, ServicesIcon, ShoppingIcon, OtherIcon) now accept a `stroke` prop to change their color dynamically.

## Features
- ✅ Proper SVG donut chart with color-coded segments
- ✅ All category amounts display correctly (not 0)
- ✅ Category icons with matching colors in both legend and list
- ✅ Responsive design matching Figma
- ✅ Proper percentage calculations
- ✅ Sorted by amount (highest to lowest)

## Color Scheme
- **Utilities**: Purple (#A855F7)
- **Grocery/Food**: Orange (#F97316)
- **Fuel**: Red (#EF4444)
- **Services**: Pink (#EC4899)
- **Shopping**: Lime (#84CC16)
- **Other**: Cyan (#06B6D4)

## Technical Implementation
The donut chart uses SVG circles with:
- `strokeWidth={20}` for the ring thickness
- `strokeDasharray` to create segments based on percentage
- `strokeDashoffset` to position segments correctly
- `rotation="-90"` to start from top (12 o'clock position)
- Outer radius: 80, Inner radius: 60 (20px stroke width)
