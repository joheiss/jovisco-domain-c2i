import { TransactionItems } from '../core/transaction-items';
import { InvoiceItem } from './invoice-item';
import { InvoiceItemData } from './invoice-item-data';

export class InvoiceItems extends TransactionItems<InvoiceItem, InvoiceItemData> {
    
    get totalCashDiscountAmount(): number {
        return this.items.reduce((sum, item) => sum + item.cashDiscountValue, 0);
    }

    get totalCashDiscountBaseAmount(): number {
        return this.items.reduce((sum, item) => sum + item.discountableValue, 0);
    }

    get totalDiscountedNetValue(): number {
        return this.items.reduce((sum, item) => sum + item.discountedNetValue, 0);
    }

    get totalGrossValue(): number {
        return this.totalNetValue + this.totalVatAmount;
    }

    get totalNetValue(): number {
        return this.items.reduce((sum, item) => sum + item.netValue, 0);
    }

    get totalPaymentAmount(): number {
        return this.items.reduce((sum, item) => sum + item.discountedValue, 0);
    }

    get totalVatAmount(): number {
        return this.items.reduce((sum, item) => sum + item.vatValue, 0);
    }
}