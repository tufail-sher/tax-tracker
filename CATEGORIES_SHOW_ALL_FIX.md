# Categories Screen - Show All Categories Fix

## Problem
The screen was only showing categories that had invoices. Categories with no invoices (0 amount) were not displayed.

## Solution
Updated the `calculateCategories()` function to:
1. Define all possible categories upfront: `['UTILITIES', 'GROCERY', 'FUEL', 'SERVICES', 'SHOPPING', 'OTHER']`
2. Initialize all categories with 0 amount
3. Then calculate actual amounts from invoices
4. All categories are now displayed in both the legend and the list

## Changes Made

### 1. Initialize All Categories
```typescript
// Define all possible categories
const allCategories = ['UTILITIES', 'GROCERY', 'FUEL', 'SERVICES', 'SHOPPING', 'OTHER'];

// Initialize all categories with 0
allCategories.forEach(cat => {
  categoryMap.set(cat, 0);
});
```

### 2. Updated Donut Chart Rendering
- Filter to only draw segments for categories with percentage > 0
- This prevents drawing invisible segments for 0% categories
- Keeps the chart clean and visually accurate

```typescript
categories
  .filter(cat => cat.percentage > 0) // Only draw segments for non-zero categories
  .map((category, index, filteredCategories) => {
    // ... draw segment
  })
```

### 3. Legend and List Still Show All
- Legend chips show all 6 categories with their icons and percentages
- Category list shows all 6 categories sorted by amount
- Categories with 0 amount will show "Rs. 0" and "0%"

## Result
Now the screen displays:
- **Donut Chart**: Only shows colored segments for categories with invoices (e.g., only Utilities if that's the only one with data)
- **Legend**: Shows all 6 categories with their icons and percentages (Utilities 100%, Grocery 0%, Fuel 0%, etc.)
- **Category List**: Shows all 6 category cards sorted by amount, including those with Rs. 0

This matches the expected behavior where users can see all available categories, not just the ones they've used.
