import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice, InvoiceState } from '../../types/invoice';

const initialState: InvoiceState = {
  currentInvoice: null,
  invoices: [],
  isLoading: false,
  error: null,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setCapturedImage: (state, action: PayloadAction<{ imageUri: string }>) => {
      // Create a temporary invoice with the captured image
      state.currentInvoice = {
        id: Date.now().toString(),
        imageUri: action.payload.imageUri,
        companyName: '',
        date: new Date().toISOString(),
        totalAmount: 0,
        totalTax: 0,
        taxBreakdown: [],
        totalRefundable: 0,
        category: 'UTILITIES',
        createdAt: new Date().toISOString(),
        isProcessed: false,
      };
    },
    setInvoiceDetails: (state, action: PayloadAction<Invoice>) => {
      state.currentInvoice = action.payload;
    },
    saveInvoice: (state) => {
      if (state.currentInvoice) {
        state.invoices.push(state.currentInvoice);
        state.currentInvoice = null;
      }
    },
    clearCurrentInvoice: (state) => {
      state.currentInvoice = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCapturedImage,
  setInvoiceDetails,
  saveInvoice,
  clearCurrentInvoice,
  setLoading,
  setError,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
