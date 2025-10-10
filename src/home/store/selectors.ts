import { RootState } from '../../store/store';

export const selectCurrentInvoice = (state: RootState) => state.invoice.currentInvoice;
export const selectInvoices = (state: RootState) => state.invoice.invoices;
export const selectIsLoading = (state: RootState) => state.invoice.isLoading;
export const selectError = (state: RootState) => state.invoice.error;
export const selectHasInvoices = (state: RootState) => state.invoice.invoices.length > 0;
