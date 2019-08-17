import { Transaction } from '../core/transactions';
import { InvoiceHeaderData, InvoiceHeader, InvoiceItemData, InvoiceItems, InvoiceItem } from './';
import { SimpleTexts, TextType, SimpleTextFactory } from '../core/texts';

export class Invoice extends Transaction<InvoiceHeader, InvoiceHeaderData, InvoiceItems, InvoiceItem, InvoiceItemData> {

    constructor(header: InvoiceHeader, items: InvoiceItems, texts?: SimpleTexts) {
        super(header, items, texts);
    }

    get invoiceText(): string | undefined {
        const found = this.texts ? this.texts.get(TextType.InvoiceText) : undefined;
        return found ? found.text : undefined;
    }
    set invoiceText(value: string | undefined) {
        const text = SimpleTextFactory.fromData({ type: TextType.InvoiceText, text: value });
        this.texts && this.texts.set(text);
    }

    get internalText(): string | undefined {
        const found = this.texts ? this.texts.get(TextType.InternalText) : undefined;
        return found ? found.text : undefined;
    }
    set internalText(value: string | undefined) {
        const text = SimpleTextFactory.fromData({ type: TextType.InternalText, text: value });
        this.texts && this.texts.set(text);
    }

}