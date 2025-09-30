import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TaxEntry {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface TaxState {
  entries: TaxEntry[];
  totalIncome: number;
  totalExpenses: number;
  selectedYear: number;
}

const initialState: TaxState = {
  entries: [],
  totalIncome: 0,
  totalExpenses: 0,
  selectedYear: new Date().getFullYear(),
};

const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {
    addTaxEntry: (state, action: PayloadAction<TaxEntry>) => {
      state.entries.push(action.payload);
      if (action.payload.type === 'income') {
        state.totalIncome += action.payload.amount;
      } else {
        state.totalExpenses += action.payload.amount;
      }
    },
    removeTaxEntry: (state, action: PayloadAction<string>) => {
      const entry = state.entries.find(e => e.id === action.payload);
      if (entry) {
        if (entry.type === 'income') {
          state.totalIncome -= entry.amount;
        } else {
          state.totalExpenses -= entry.amount;
        }
        state.entries = state.entries.filter(e => e.id !== action.payload);
      }
    },
    updateTaxEntry: (state, action: PayloadAction<TaxEntry>) => {
      const index = state.entries.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        const oldEntry = state.entries[index];
        // Update totals
        if (oldEntry.type === 'income') {
          state.totalIncome -= oldEntry.amount;
        } else {
          state.totalExpenses -= oldEntry.amount;
        }
        
        if (action.payload.type === 'income') {
          state.totalIncome += action.payload.amount;
        } else {
          state.totalExpenses += action.payload.amount;
        }
        
        state.entries[index] = action.payload;
      }
    },
    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
    },
    clearAllEntries: (state) => {
      state.entries = [];
      state.totalIncome = 0;
      state.totalExpenses = 0;
    },
  },
});

export const { 
  addTaxEntry, 
  removeTaxEntry, 
  updateTaxEntry, 
  setSelectedYear, 
  clearAllEntries 
} = taxSlice.actions;

export default taxSlice.reducer;