export interface TaxBreakdown {
  name: string;
  amount: number;
}

export interface Invoice {
  id: string;
  imageUri: string;
  companyName: string;
  date: string;
  totalAmount: number;
  totalTax: number;
  taxBreakdown: TaxBreakdown[];
  totalRefundable: number;
  category: string;
  createdAt: string;
  isProcessed: boolean;
}

export interface InvoiceState {
  currentInvoice: Invoice | null;
  invoices: Invoice[];
  isLoading: boolean;
  error: string | null;
}
