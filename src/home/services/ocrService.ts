/**
 * OCR Service - Placeholder for invoice text extraction
 * 
 * This service will be responsible for extracting text and data from invoice images.
 * Currently returns mock data. Replace with actual OCR implementation.
 */

import { Invoice, TaxBreakdown } from '../../types/invoice';

export interface OCRResult {
  companyName: string;
  date: string;
  totalAmount: number;
  totalTax: number;
  taxBreakdown: TaxBreakdown[];
  category: string;
}

/**
 * Extract invoice data from image URI
 * @param imageUri - URI of the captured invoice image
 * @returns Extracted invoice data
 */
export const extractInvoiceData = async (imageUri: string): Promise<OCRResult> => {
  // TODO: Implement actual OCR logic
  // Options:
  // 1. Google Cloud Vision API
  // 2. AWS Textract
  // 3. Azure Computer Vision
  // 4. Tesseract.js for local processing
  // 5. Custom ML model
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock data based on LESCO invoice
  return {
    companyName: 'LAHORE ELECTRIC SUPPLY COMPANY (LESCO)',
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    totalAmount: 3305.00,
    totalTax: 535.95,
    taxBreakdown: [
      { name: 'GST', amount: 358.00 },
      { name: 'GST on FPA', amount: 141.00 },
      { name: 'Electricity Duty', amount: 25.35 },
      { name: 'ED on FPA', amount: 11.60 },
    ],
    category: detectCategory('LAHORE ELECTRIC SUPPLY COMPANY'),
  };
};

/**
 * Detect invoice category based on company name
 * @param companyName - Name of the company
 * @returns Category string
 */
export const detectCategory = (companyName: string): string => {
  const normalizedName = companyName.toLowerCase();
  
  // Utilities
  if (
    normalizedName.includes('electric') ||
    normalizedName.includes('lesco') ||
    normalizedName.includes('gas') ||
    normalizedName.includes('water') ||
    normalizedName.includes('utility')
  ) {
    return 'UTILITIES';
  }
  
  // Telecom
  if (
    normalizedName.includes('telecom') ||
    normalizedName.includes('jazz') ||
    normalizedName.includes('telenor') ||
    normalizedName.includes('zong') ||
    normalizedName.includes('ufone')
  ) {
    return 'TELECOM';
  }
  
  // Fuel
  if (
    normalizedName.includes('pso') ||
    normalizedName.includes('shell') ||
    normalizedName.includes('total') ||
    normalizedName.includes('fuel') ||
    normalizedName.includes('petrol')
  ) {
    return 'FUEL';
  }
  
  // Groceries
  if (
    normalizedName.includes('mart') ||
    normalizedName.includes('store') ||
    normalizedName.includes('grocery')
  ) {
    return 'GROCERIES';
  }
  
  // Default
  return 'OTHER';
};

/**
 * Calculate total refundable amount based on tax breakdown
 * @param taxBreakdown - Array of tax breakdowns
 * @returns Total refundable amount
 */
export const calculateRefundable = (taxBreakdown: TaxBreakdown[]): number => {
  // TODO: Implement FBR refund calculation logic
  // Currently returns 0 as placeholder
  // Logic should check which taxes are refundable according to FBR rules
  return 0.00;
};

/**
 * Parse amount from text string
 * @param text - Text containing amount
 * @returns Parsed number or 0
 */
export const parseAmount = (text: string): number => {
  const cleaned = text.replace(/[^0-9.]/g, '');
  const amount = parseFloat(cleaned);
  return isNaN(amount) ? 0 : amount;
};

/**
 * Format date from various formats to ISO string
 * @param dateText - Date text in various formats
 * @returns ISO date string
 */
export const parseDate = (dateText: string): string => {
  try {
    const date = new Date(dateText);
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
};

// Export all functions
export default {
  extractInvoiceData,
  detectCategory,
  calculateRefundable,
  parseAmount,
  parseDate,
};
