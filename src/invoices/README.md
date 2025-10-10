# Invoices Module

## Overview
The Invoices module handles displaying and managing invoice records in the Tax Tracker app.

## Structure
```
src/invoices/
├── screens/
│   └── InvoicesScreen.tsx       # Main invoices list screen with empty/populated states
├── components/                   # Invoice-specific components (for future use)
└── index.ts                     # Module exports
```

## Features

### Empty State
- Displayed when no invoices exist in Redux store
- Shows receipt icon illustration
- "Take a photo of your invoice to extract tax information" message
- "Start Scanning" button to navigate to camera

### Populated State
- Search bar for filtering invoices by company name
- Filter chips for:
  - Date
  - Category  
  - Refundable
- Invoice list with thumbnails showing:
  - Company name
  - Total amount
  - Date
  - Category icon (Utilities/Fuel/Food)
  - Tax amount
  - Arrow for navigation

## Dependencies
- Redux store (uses home/store/selectors for invoice data)
- Shared components (Button)
- AppNavigator utility for navigation
- SVG icons (receipt_img, search_icon, category icons)

## Usage
The InvoicesScreen is used in the `/app/(tabs)/invoices.tsx` route.

State is shared with HomeScreen via Redux - both screens check `selectHasInvoices()` to determine which view to show.
