export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TaxEntry {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  userId: string;
}

export interface TaxCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
}