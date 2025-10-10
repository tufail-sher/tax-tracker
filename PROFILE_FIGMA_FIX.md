# Profile Screen - Figma Design Fix

## Changes Made

### ❌ Removed (Not in Figma)
1. **White card wrapper** around profile info - removed
2. **White cards** around menu items - removed
3. **Extra nested card** in profile section - removed
4. **Shadow effects** on menu items - removed
5. **Border radius** on menu items - removed

### ✅ Updated to Match Figma

#### Profile Section
- **Background**: Gradient background (`bg-top-gradient`) with rounded bottom
- **Profile Picture**: 100x100px circle, white background
- **Layout**: Direct flex-row, no card wrapper
- **Profile Info**: Name, email directly on gradient background
- **Plan Badges**: 
  - "Free Plan" in white/80 rounded pill
  - "Upgrade" as simple text link (not button)

#### Menu Items (No Cards)
- **Layout**: Simple flex-row with padding
- **No background**: Transparent/surface background
- **No shadows**: Clean, flat design
- **No borders**: Borderless list items
- **Arrow Icon**: Using `profile_arrow_icon.svg` (20x20px)
- **Spacing**: py-4 for vertical padding between items

#### Structure
```
View (bg-surface) - Main container
├── View (bg-top-gradient) - Header section
│   ├── Title
│   └── Profile Info (direct, no card)
│       ├── Profile Picture (100x100)
│       └── User Info
│           ├── Name
│           ├── Email
│           └── Badges (Free Plan + Upgrade link)
└── ScrollView - Menu sections
    ├── General (heading)
    │   └── 4 menu items (no cards)
    └── Settings (heading)
        └── 2 menu items (no cards)
```

## Design Specifications

### Profile Picture
- Size: 100x100px (increased from 80px)
- Background: White
- Icon size: 60x60px (increased from 48px)

### Menu Items
- **No card styling**
- **No shadows**
- **No rounded corners**
- Padding: py-4 (vertical)
- Icon: 24x24px on left
- Arrow: 20x20px on right (using `profile_arrow_icon.svg`)
- Text: font-inter-medium, text-base

### Colors
- Background: `bg-surface` (light gray)
- Header: `bg-top-gradient` (blue gradient)
- Text: `text-secondary`
- Profile circle: `bg-white`
- Free Plan badge: `bg-white/80` with `text-primary`

## Before vs After

### Before (Wrong)
- ❌ Double white cards (wrapper + inner)
- ❌ Menu items had white card backgrounds
- ❌ Menu items had shadows and rounded corners
- ❌ Used SixtyDegreeArrow icon
- ❌ 80x80px profile picture

### After (Correct - Matches Figma)
- ✅ No card wrappers
- ✅ Menu items are borderless list items
- ✅ Clean, flat design
- ✅ Uses ProfileArrow icon
- ✅ 100x100px profile picture
- ✅ Simple upgrade text link (not button)

## Icon Change
- **Old**: `sixty_degree_arrow.svg` (16x16px)
- **New**: `profile_arrow_icon.svg` (20x20px)

The design now matches the Figma exactly - clean, minimal, no unnecessary cards or shadows!
