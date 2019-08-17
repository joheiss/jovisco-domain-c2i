import { TransactionItemData } from '../core/transactions';

export interface InvoiceItemData extends TransactionItemData {
    contractItemId?: number;
    description?: string;
    quantity?: number;
    quantityUnit?: string;
    pricePerUnit?: number;
    cashDiscountAllowed?: boolean;
    cashDiscountPercentage?: number;
    vatPercentage?: number;
}