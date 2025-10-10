import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Invoice, InvoiceState } from '../../types/invoice';

const initialState: InvoiceState = {
  currentInvoice: null,
  invoices: [
    {
      id: '1',
      imageUri: '',
      companyName: 'LAHORE ELECTRIC SUPPLY COMPANY (LESCO)',
      date: '2025-07-19T00:00:00.000Z',
      totalAmount: 5600,
      totalTax: 952,
      taxBreakdown: [
        { name: 'GST', amount: 560 },
        { name: 'FED', amount: 280 },
        { name: 'WHT', amount: 112 }
      ],
      totalRefundable: 392,
      category: 'UTILITIES',
      createdAt: '2025-07-19T00:00:00.000Z',
      isProcessed: true,
    },
    {
      id: '2',
      imageUri: '',
      companyName: 'PSO PETROL PUMP',
      date: '2025-07-19T00:00:00.000Z',
      totalAmount: 2600,
      totalTax: 452,
      taxBreakdown: [
        { name: 'GST', amount: 260 },
        { name: 'PDL', amount: 192 }
      ],
      totalRefundable: 260,
      category: 'FUEL',
      createdAt: '2025-07-19T00:00:00.000Z',
      isProcessed: true,
    },
    {
      id: '3',
      imageUri: '',
      companyName: 'DOMINOS',
      date: '2025-07-19T00:00:00.000Z',
      totalAmount: 8600,
      totalTax: 400,
      taxBreakdown: [
        { name: 'GST', amount: 400 }
      ],
      totalRefundable: 0,
      category: 'FOOD',
      createdAt: '2025-07-19T00:00:00.000Z',
      isProcessed: true,
    },
    {
      id: '4',
      imageUri: '',
      companyName: 'BERQHOTEL GROSS',
      date: '2025-07-19T00:00:00.000Z',
      totalAmount: 54.50,
      totalTax: 3.85,
      taxBreakdown: [
        { name: 'GST', amount: 3.85 }
      ],
      totalRefundable: 0,
      category: 'FOOD',
      createdAt: '2025-07-19T00:00:00.000Z',
      isProcessed: true,
    },
  ],
  isLoading: false,
  error: null,
};

// Async thunk for fetching invoices from API (placeholder for future implementation)
export const fetchInvoices = createAsyncThunk(
  'invoice/fetchInvoices',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get('/api/invoices');
      // return response.data;
      
      // Placeholder: Return empty array for now
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch invoices');
    }
  }
);

// Async thunk for processing invoice image with AI (placeholder for future implementation)
export const processInvoiceImage = createAsyncThunk(
  'invoice/processImage',
  async (imageUri: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call to AI service
      // const formData = new FormData();
      // formData.append('image', { uri: imageUri, type: 'image/jpeg', name: 'invoice.jpg' });
      // const response = await axios.post('/api/process-invoice', formData);
      // return response.data;
      
      // Placeholder: Return mock data for now
      return {
        companyName: 'LAHORE ELECTRIC SUPPLY COMPANY (LESCO)',
        totalAmount: 5600,
        totalTax: 952,
        taxBreakdown: [
          { name: 'GST', amount: 560 },
          { name: 'FED', amount: 280 },
          { name: 'WHT', amount: 112 }
        ],
        totalRefundable: 392,
        category: 'UTILITIES'
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to process invoice');
    }
  }
);

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setCapturedImage: (state, action: PayloadAction<{ imageUri: string }>) => {
      // Create a temporary invoice with the captured image
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        imageUri: action.payload.imageUri,
        companyName: 'LAHORE ELECTRIC SUPPLY COMPANY (LESCO)',
        date: new Date().toISOString(),
        totalAmount: 5600,
        totalTax: 952,
        taxBreakdown: [
          { name: 'GST', amount: 560 },
          { name: 'FED', amount: 280 },
          { name: 'WHT', amount: 112 }
        ],
        totalRefundable: 392,
        category: 'UTILITIES',
        createdAt: new Date().toISOString(),
        isProcessed: false,
      };
      
      state.currentInvoice = newInvoice;
      // Also add to invoices list to show in home screen
      state.invoices.unshift(newInvoice);
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
  extraReducers: (builder) => {
    // Fetch invoices
    builder.addCase(fetchInvoices.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.invoices = action.payload;
    });
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Process invoice image
    builder.addCase(processInvoiceImage.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(processInvoiceImage.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.currentInvoice) {
        state.currentInvoice = {
          ...state.currentInvoice,
          ...action.payload,
          isProcessed: true,
        };
      }
    });
    builder.addCase(processInvoiceImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
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
