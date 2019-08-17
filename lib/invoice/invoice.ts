import { Transaction } from '../core/transactions';
import { InvoiceHeaderData, InvoiceHeader, InvoiceItemData, InvoiceItems, InvoiceItem } from './';
import { SimpleTexts } from '../core/texts';
import { TransactionPartners } from '../core/transactions/transaction-partners';

export class Invoice extends Transaction<InvoiceHeader, InvoiceHeaderData, InvoiceItems, InvoiceItem, InvoiceItemData> {

    constructor(header: InvoiceHeader, partners: TransactionPartners, items: InvoiceItems, texts: SimpleTexts) {
        super(header, partners, items, texts);
    }
}