# Invoice Capture and Details Implementation

## Overview
Complete flow for capturing invoice photos, storing them in Redux, and displaying extracted details with OCR placeholder.

## Features Implemented

### 1. **Redux State Management**
- Created `invoiceSlice` with actions:
  - `setCapturedImage`: Stores the captured image URI
  - `setInvoiceDetails`: Updates invoice with extracted data
  - `saveInvoice`: Saves invoice to list
  - `clearCurrentInvoice`: Clears current invoice
  - `setLoading`: Manages loading state
  - `setError`: Handles errors

### 2. **Type Definitions** (`src/types/invoice.ts`)
```typescript
- Invoice interface with all invoice fields
- TaxBreakdown interface for tax details
- InvoiceState for Redux state
```

### 3. **Invoice Details Screen** (`src/home/screens/InvoiceDetailsScreen.tsx`)
Features:
- ✅ Back button navigation
- ✅ Invoice image display
- ✅ Company name and date
- ✅ Category tag with icon
- ✅ Total Amount and Total Tax display
- ✅ Tax Breakdown list
- ✅ Total Refundable amount
- ✅ NativeWind styling
- ✅ Text from centralized Texts.ts

### 4. **Camera Scanner Integration**
- Captures photo
- Dispatches to Redux
- Shows success alert
- Navigates to invoice details (removes scanner from stack)

### 5. **Navigation Updates**
Added to `navigation.ts`:
- `navigateToInvoiceDetails()` method
- `INVOICE_DETAILS` route constant

### 6. **Mock OCR Data**
Simulated extraction based on the LESCO invoice image:
```typescript
{
  companyName: 'LAHORE ELECTRIC SUPPLY COMPANY (LESCO)',
  date: '19 July, 2025',
  totalAmount: 3305.00,
  totalTax: 535.95,
  taxBreakdown: [
    { name: 'GST', amount: 358.00 },
    { name: 'GST on FPA', amount: 141.00 },
    { name: 'Electricity Duty', amount: 25.35 },
    { name: 'ED on FPA', amount: 11.60 },
  ],
  totalRefundable: 0.00,
  category: 'UTILITIES',
}
```

## File Structure

```
app/
  invoice-details.tsx                 # Invoice details route
  _layout.tsx                         # Added invoice-details config
src/
  types/
    invoice.ts                        # Invoice type definitions
  home/
    store/
      invoiceSlice.ts                 # Redux slice for invoices
    screens/
      InvoiceDetailsScreen.tsx        # Main invoice details screen
  scanner/
    screens/
      CameraScannerScreen.tsx         # Updated with Redux integration
  store/
    store.ts                          # Added invoice reducer
  utils/
    navigation.ts                     # Added invoice details navigation
constants/
  Texts.ts                           # Added invoice details texts
assets/
  svg/
    tags_icon.svg                    # Category tag icon
```

## User Flow

1. **Capture Photo**
   - User taps "Start Scanning" on home screen
   - Camera opens
   - User positions receipt and taps capture button

2. **Photo Captured**
   - Image saved to Redux store
   - Success alert shown with two buttons:
     - "Take Another": Retake photo
     - "Done": Continue to details

3. **Navigate to Details**
   - App navigates to Invoice Details screen
   - Scanner screen removed from stack (can't go back)

4. **Display Details**
   - Image displayed at top
   - Company name and date
   - Category tag (UTILITIES)
   - Total amount and total tax
   - Tax breakdown in cards
   - Total refundable amount

5. **OCR Processing** (Currently Mock)
   - `useEffect` triggers when invoice loaded
   - Simulates OCR extraction
   - Updates Redux with extracted data
   - Screen re-renders with real data

## Styling with NativeWind

All components use NativeWind classes:
- **Layout**: `flex-1`, `flex-row`, `items-center`, `justify-between`
- **Spacing**: `px-6`, `py-4`, `mb-6`, `mt-8`
- **Colors**: `bg-white`, `bg-surface`, `bg-error`, `text-secondary`
- **Typography**: `font-inter-bold`, `font-inter-regular`, `text-xl`, `text-base`
- **Borders**: `rounded-2xl`, `rounded-xl`, `rounded-full`, `border-t`
- **Shadows**: Handled via Tailwind opacity utilities

## Next Steps (TODO)

### 1. **Implement Real OCR**
- [ ] Integrate OCR API (Google Vision, AWS Textract, or custom)
- [ ] Extract company name, date, amounts
- [ ] Parse tax breakdown
- [ ] Calculate refundable amount
- [ ] Handle OCR errors gracefully

### 2. **Add Edit Functionality**
- [ ] Allow manual editing of extracted data
- [ ] Validation for amounts and dates
- [ ] Save edited data

### 3. **Save to Database**
- [ ] Implement local storage (AsyncStorage/SQLite)
- [ ] Save invoice with all details
- [ ] Add to invoices list

### 4. **Enhance UI**
- [ ] Add loading state during OCR
- [ ] Add retry mechanism for failed extraction
- [ ] Add image zoom/pan functionality
- [ ] Add share/export options

### 5. **Categories**
- [ ] Auto-detect category from company name
- [ ] Allow manual category selection
- [ ] Add more category options

## Text Constants

All text is centralized in `constants/Texts.ts`:
```typescript
invoiceDetails: {
  title: "Invoice Details",
  totalAmount: "Total Amount",
  totalTax: "Total Tax",
  taxBreakdown: "Tax Breakdown",
  totalRefundable: "TOTAL REFUNDABLE",
  processing: "Processing invoice...",
  extractionError: "Failed to extract invoice details."
}
```

## Redux State Structure

```typescript
invoice: {
  currentInvoice: {
    id: string,
    imageUri: string,
    companyName: string,
    date: string,
    totalAmount: number,
    totalTax: number,
    taxBreakdown: TaxBreakdown[],
    totalRefundable: number,
    category: string,
    createdAt: string,
    isProcessed: boolean
  },
  invoices: Invoice[],
  isLoading: boolean,
  error: string | null
}
```

## Dependencies Used

- `@reduxjs/toolkit`: State management
- `react-redux`: Redux React bindings
- `expo-router`: Navigation
- `@expo/vector-icons`: Icons
- `react-native-svg`: SVG support for icons
- NativeWind: Styling

## Notes

- The mock OCR data matches the LESCO invoice from the screenshot
- Category icon (tags_icon.svg) is displayed next to category name
- Navigation uses `replace` to prevent going back to scanner
- All amounts formatted to 2 decimal places
- Total refundable currently set to 0.00 (needs calculation logic)
