# Categories Module

## Overview
The Categories module provides a visual breakdown of tax expenses by category. It displays a donut chart representation and a detailed list of all categories with their respective tax amounts and percentages.

## Features

### Empty State
- Displays when no invoices have been scanned
- Shows a centered category icon
- Provides a "Start Scanning" button to navigate to the scanner

### Populated State
- **Donut Chart Visualization**
  - Central display showing total tax paid
  - Visual representation of category distribution
  - Color-coded legend chips showing category percentages

- **Category List**
  - Sortable list of all categories (sorted by amount descending)
  - Each category shows:
    - Category icon with color-coded background
    - Category name
    - Percentage of total tax
    - Total tax amount for that category

## Categories Supported
1. **Utilities** - Purple (#A855F7)
2. **Grocery/Food** - Orange (#F97316)
3. **Fuel** - Red (#EF4444)
4. **Services** - Pink (#EC4899)
5. **Shopping** - Lime (#84CC16)
6. **Other** - Cyan (#06B6D4)

## Components

### CategoriesScreen
Main screen component that displays the categories overview and list.

**Features:**
- Dynamic category calculation from invoices
- Responsive donut chart representation
- Interactive category cards
- Empty state handling

## Data Flow
- Reads invoices from Redux store using `selectInvoices` and `selectHasInvoices`
- Calculates category totals and percentages dynamically
- Renders appropriate view based on data availability

## Styling
- Uses NativeWind (Tailwind CSS) for styling
- Responsive design with proper spacing
- Shadow effects for cards
- Color-coded category icons

## Navigation
- Integrated with app navigation system
- Can navigate to scanner from empty state

## Text Localization
All text strings are imported from `constants/Texts.ts` for easy localization:
- `texts.categories.title`
- `texts.categories.emptyTitle`
- `texts.categories.scanButton`
- `texts.categories.taxPaidLabel`
- `texts.categories.yourCategories`
