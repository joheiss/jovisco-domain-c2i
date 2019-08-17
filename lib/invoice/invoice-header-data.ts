import { TransactionHeaderData } from '../core/transactions';
import { InvoiceStatus } from './invoice-status';
import { BillingMethod } from './billing-method';
import { PaymentMethod } from './payment-method';

export interface InvoiceHeaderData extends TransactionHeaderData {
    status?: InvoiceStatus;
    receiverId?: string;
    contractId?: string;
    billingMethod?: BillingMethod;
    billingPeriod?: string;
    currency?: string;
    cashDiscountDays?: number;
    cashDiscountPercentage: number;
    dueDays?: number;
    paymentTerms?: string;
    paymentMethod?: PaymentMethod;
    vatPercentage?: number;
}