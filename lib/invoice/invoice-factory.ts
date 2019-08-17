import {
    InvoiceHeaderData,
    InvoiceItemData,
    InvoiceHeader,
    InvoiceItems,
    InvoiceItemFactory,
    Invoice,
    InvoiceStatus,
    PaymentMethod,
    BillingMethod,
} from './';
import { BoType } from '../core/bo-type';
import { DateUtility } from '../utils/date-utility';
import { SimpleTextData } from '../core/texts';
import { TransactionFactory } from '../core/transactions';

export class InvoiceFactory {
    static defaultValues(): {
        header: InvoiceHeaderData;
        items: InvoiceItemData[];
        texts: SimpleTextData[];
    } {
        return {
            header: {
                objectType: BoType.Invoice,
                issuedAt: DateUtility.getCurrentDate(),
                status: InvoiceStatus.Created,
                paymentTerms: '30 Tage: netto',
                paymentMethod: PaymentMethod.BankTransfer,
                billingMethod: BillingMethod.Invoice,
                currency: 'EUR',
                cashDiscountDays: 0,
                cashDiscountPercentage: 0,
                dueDays: 30,
                vatPercentage: 19.0,
                isDeletable: true,
            },
            items: [],
            texts: [],
        };
    }

    static fromData(data: {
        header: InvoiceHeaderData;
        items: InvoiceItemData[];
        texts?: SimpleTextData[];
    }): Invoice {
        if (!data) {
            throw new Error('invalid_input');
        }
        const header = InvoiceFactory.headerFromData(data.header);
        const items = InvoiceFactory.itemsFromData(data.items);  
        const texts = TransactionFactory.textsFromData(data.texts || []);
        
        // copy cash discount percentage from header to items
        if (header.cashDiscountPercentage > 0) {
            items.data.map(item => {
                if (item.cashDiscountAllowed) {
                    item.cashDiscountPercentage = header.cashDiscountPercentage;
                }
            });
        }
        return new Invoice(header, items, texts);
    }

    private static headerFromData(input: InvoiceHeaderData): InvoiceHeader {
        if (!input) {
            throw new Error('invalid_header');
        }
        let { header, items } = InvoiceFactory.defaultValues();
        header = { ...header, ...input };
        return new InvoiceHeader(header);
    }

    private static itemsFromData(items: InvoiceItemData[]): InvoiceItems {
        const newItems = items ? InvoiceItemFactory.fromDataArray(items) : [];
        return new InvoiceItems(newItems);
    }
    
}
