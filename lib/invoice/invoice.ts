import { Transaction } from '../core/transaction';
import { InvoiceHeaderData, InvoiceHeader, InvoiceItemData, InvoiceItems, InvoiceItem } from './';

export class Invoice extends Transaction<InvoiceHeader, InvoiceHeaderData, InvoiceItems, InvoiceItem, InvoiceItemData> {

    constructor(header: InvoiceHeader, items: InvoiceItems) {
        super(header, items);
    }

}