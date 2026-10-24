import { z } from 'zod';

export const transactionValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),

  amount: z.number({
    required_error: 'Amount is required'
  }),

  type: z.enum(['income', 'expense'], {
    required_error: 'Transaction type is required'
  }),

  category: z.string().min(1, 'Category is required'),

  date: z.string().min(1, 'Date is required')
});