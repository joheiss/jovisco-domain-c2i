import { Invoice } from '../lib/invoice/invoice';
import { DateUtility } from '../lib/utils/date-utility';
import { Info } from 'luxon';
import { InvoiceFactory } from '../lib/invoice/invoice-factory';
import { InvoiceHeaderData } from '../lib/invoice/invoice-header-data';
import { InvoiceItemData } from '../lib/invoice/invoice-item-data';
import { InvoiceItem } from '../lib/invoice';
import { SimpleTextData, TextType } from '../lib/core/texts';
import { PartnerFunctionType } from '../lib/core/transactions/partner-function-type';
import { TransactionPartnerData } from '../lib/core/transactions';
import { Factory } from '../lib/core/factory';

export const mockInvoice = (): Invoice => {
    const issuedAt = DateUtility.getCurrentDate();
    const periodName = `${Info.months()[issuedAt.getMonth() - 1]}`;
    const billingPeriod = `${periodName} ${issuedAt.getFullYear()}`;

    const data: { header: InvoiceHeaderData, partners: TransactionPartnerData[], items: InvoiceItemData[], texts: SimpleTextData[] } = {
        header: {
            id: '5901',
            organization: 'GHQ',
            billingPeriod: billingPeriod,
            cashDiscountDays: 30,
            cashDiscountPercentage: 3,
            contractId: '4901',
            currency: 'EUR',
            dueDays: 60,
            // internalText: 'Das ist eine Testrechnung.',
            // invoiceText: 'nach Aufwand',
            issuedAt: issuedAt,
            paymentTerms: '30 Tage: 3% Skonto; 60 Tage: netto',
            // receiverId: '1901',
            vatPercentage: 19.0,
        },
        partners: [
            {
                function: PartnerFunctionType.Customer,
                id: '1901',
                primary: true
            },
            {
                function: PartnerFunctionType.InvoiceReceiver,
                id: '3901',
                primary: true
            },
        ],
        items: [
            {
                id: 1,
                contractItemId: 1,
                cashDiscountAllowed: true,
                description: 'Arbeitszeit',
                quantity: 10,
                pricePerUnit: 100.00,
                quantityUnit: 'Std.',
                vatPercentage: 19.0
            },
            {
                id: 2,
                contractItemId: 2,
                cashDiscountAllowed: true,
                description: 'Reisezeit',
                quantity: 2,
                pricePerUnit: 50.00,
                quantityUnit: 'Std.',
                vatPercentage: 19.0
            }
        ],
        texts: [
            {
                type: TextType.InternalText,
                text: 'Das ist ein interner Text.',
            },
            {
                type: TextType.InvoiceText,
                text: 'Dieser Text wird auf der Rechnung gedruckt.',
            },
        ]
    };
    return InvoiceFactory.fromData(data);
};

export const mockInvoiceItem = (): InvoiceItem => {
    const data = {
        id: 3,
        contractItemId: 3,
        cashDiscountAllowed: false,
        description: 'km-Pauschale',
        quantity: 200,
        pricePerUnit: 0.50,
        quantityUnit: 'km',
        vatPercentage: 19.0
    };
    return Factory.fromData<InvoiceItem, InvoiceItemData>(InvoiceItem, data);
    // return InvoiceItemFactory.fromData(data);
}