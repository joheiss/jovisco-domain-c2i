import { InvoiceFactory } from '../lib/invoice/invoice-factory';
import { InvoiceHeaderData } from '../lib/invoice/invoice-header-data';
import { InvoiceItemData } from '../lib/invoice/invoice-item-data';
import { mockInvoice, mockInvoiceItem } from './mock-invoice';
import { Invoice } from '../lib/invoice/invoice';
import { DateUtility } from '../lib/utils/date-utility';
import { InvoiceStatus } from '../lib/invoice/invoice-status';
import { PaymentMethod } from '../lib/invoice/payment-method';
import { BillingMethod } from '../lib/invoice/billing-method';
import { BoType } from '../lib/core/bo-type';
import { InvoiceItem } from '../lib/invoice';
import { TextType } from '../lib/core/texts';
import { InvoiceHeader } from '../lib/invoice/invoice-header';
import { SimpleText } from '../lib/core/texts/simple-text';

describe('invoice tests', () => {
    it('should create an invoice from default values', () => {
        const invoice = InvoiceFactory.fromData(InvoiceFactory.defaultValues());
        expect(invoice).toBeTruthy();
    });

    it('should create an invoice containing default values, if an empty imput has been provided', () => {
        const data = {
            header: {} as InvoiceHeaderData,
            items: [] as InvoiceItemData[],
        };
        const invoice = InvoiceFactory.fromData(data);
        console.log('invoice: ', invoice.data);
        expect(invoice).toBeTruthy();
        expect(invoice.data).toEqual(InvoiceFactory.defaultValues());
    });

    it('should create an invoice from data input', () => {
        const invoice = InvoiceFactory.fromData(mockInvoice().data);
        console.log(invoice.data);
        expect(invoice).toBeTruthy();
        expect(invoice.data).toEqual(mockInvoice().data);
    });

    describe('test getters', () => {
        let invoice: Invoice;

        beforeEach(() => {
            invoice = InvoiceFactory.fromData(mockInvoice().data);
        });

        it('should return the correct id', () => {
            expect(invoice.header.id).toEqual('5901');
        });

        it('should return the correct business object type', () => {
            expect(invoice.header.objectType).toEqual(BoType.Invoice);
        });

        it('should return the correct organization', () => {
            expect(invoice.header.organization).toEqual('GHQ');
        });

        it('should return the correct billing method', () => {
            expect(invoice.header.billingMethod).toEqual(BillingMethod.Invoice);
        });

        it('should return the correct billing period', () => {
            expect(invoice.header.billingPeriod).toContain('2019');
        });

        it('should return the correct cash discount date', () => {
            const expected = DateUtility.addDaysToDate(
                DateUtility.getCurrentDate(),
                invoice.header.cashDiscountDays
            );
            expect(invoice.header.cashDiscountDate).toEqual(expected);
        });

        it('should return the correct value for cash discount days', () => {
            const expected = 30;
            expect(invoice.header.cashDiscountDays).toEqual(expected);
        });

        it('should return the correct value for cash discount percentage', () => {
            const expected = 3;
            expect(invoice.header.cashDiscountPercentage).toEqual(expected);
        });

        it('should return the correct contract id', () => {
            expect(invoice.header.contractId).toEqual('4901');
        });

        it('should return the correct currency', () => {
            expect(invoice.header.currency).toEqual('EUR');
        });

        it('should return the correct due date', () => {
            const expected = DateUtility.addDaysToDate(
                DateUtility.getCurrentDate(),
                invoice.header.dueDays
            );
            expect(invoice.header.dueDate).toEqual(expected);
        });

        it('should return the correct value for due days', () => {
            const expected = 60;
            expect(invoice.header.dueDays).toEqual(expected);
        });

        it('should return the correct value for internal text', () => {
            expect(invoice.internalText).toEqual('Das ist ein interner Text.');
        });

        it('should return the correct value for invoice text', () => {
            expect(invoice.invoiceText).toEqual('Dieser Text wird auf der Rechnung gedruckt.');
        });

        it('should return the correct value for invoice status', () => {
            expect(invoice.header.status).toEqual(InvoiceStatus.Created);
        });

        it('should return the correct value for isBilled', () => {
            expect(invoice.header.isBilled).toBeFalsy();
        });

        it('should return the correct value for isPaid', () => {
            expect(invoice.header.isPaid).toBeFalsy();
        });

        it('should return the correct value for isOpen', () => {
            expect(invoice.header.isOpen).toBeTruthy();
        });

        it('should return the correct issued date', () => {
            const expected = DateUtility.getCurrentDate();
            expect(invoice.header.issuedAt).toEqual(expected);
        });

        it('should return the correct payment terms', () => {
            expect(invoice.header.paymentTerms).toEqual(
                '30 Tage: 3% Skonto; 60 Tage: netto'
            );
        });

        it('should return the correct payment method', () => {
            expect(invoice.header.paymentMethod).toEqual(
                PaymentMethod.BankTransfer
            );
        });

        it('should return the correct receiver id', () => {
            expect(invoice.header.receiverId).toEqual('1901');
        });

        it('should return the correct revenue period', () => {
            const issuedAt = DateUtility.getCurrentDate();
            const previous = DateUtility.subtractMonthsFromDate(issuedAt, 1);
            const expected =
                issuedAt.getDate() > 15
                    ? {
                          year: issuedAt.getFullYear(),
                          month: issuedAt.getMonth() + 1,
                      }
                    : {
                          year: previous.getFullYear(),
                          month: previous.getMonth() + 1,
                      };
            expect(invoice.header.revenuePeriod).toEqual(expected);
        });

        it('should return the correct vat percentage', () => {
            expect(invoice.header.vatPercentage).toBe(19);
        });
    });

    describe('test setters', () => {
        let invoice: Invoice;

        beforeEach(() => {
            invoice = InvoiceFactory.fromData(mockInvoice().data);
        });

        it('should set the correct value for billing method', () => {
            invoice.header.billingMethod = BillingMethod.CreditNote;
            expect(invoice.header.billingMethod).toEqual(
                BillingMethod.CreditNote
            );
        });

        it('should set the correct value for billing period', () => {
            invoice.header.billingPeriod = 'August 2019';
            expect(invoice.header.billingPeriod).toEqual('August 2019');
        });

        it('should set the correct value for cash discount days', () => {
            invoice.header.cashDiscountDays = 40;
            expect(invoice.header.cashDiscountDays).toEqual(40);
        });

        it('should set the correct value for cash discount percentage', () => {
            invoice.header.cashDiscountPercentage = 1.5;
            expect(invoice.header.cashDiscountPercentage).toEqual(1.5);
        });

        it('should set the correct value for contract id', () => {
            invoice.header.contractId = '4902';
            expect(invoice.header.contractId).toEqual('4902');
        });

        it('should set the correct value for currency', () => {
            invoice.header.currency = 'USD';
            expect(invoice.header.currency).toEqual('USD');
        });

        it('should set the correct value for due days', () => {
            invoice.header.dueDays = 15;
            expect(invoice.header.dueDays).toEqual(15);
        });

        it('should set the correct value for internal text', () => {
            invoice.internalText = 'Interner Text geändert';
            expect(invoice.internalText).toEqual('Interner Text geändert');
        });

        it('should set the correct value for invoice text', () => {
            invoice.internalText = 'Neuer Rechnungstext';
            expect(invoice.internalText).toEqual('Neuer Rechnungstext');
        });

        it('should set the correct value for invoice status', () => {
            invoice.header.status = InvoiceStatus.Billed;
            expect(invoice.header.status).toEqual(InvoiceStatus.Billed);
        });

        it('should set the correct issued date', () => {
            const expected = DateUtility.addDaysToDate(
                DateUtility.getCurrentDate(),
                10
            );
            invoice.header.issuedAt = expected;
            expect(invoice.header.issuedAt).toEqual(expected);
        });

        it('should set the correct value for payment method', () => {
            invoice.header.paymentMethod = PaymentMethod.Cash;
            expect(invoice.header.paymentMethod).toEqual(PaymentMethod.Cash);
        });

        it('should set the correct value for payment terms', () => {
            invoice.header.paymentTerms = '7 Tage: netto';
            expect(invoice.header.paymentTerms).toEqual('7 Tage: netto');
        });

        it('should set the correct value for receiver id', () => {
            invoice.header.receiverId = '1902';
            expect(invoice.header.receiverId).toEqual('1902');
        });

        it('should set the correct vat percentage', () => {
            invoice.header.vatPercentage = 19.99;
            expect(invoice.header.vatPercentage).toBe(19.99);
        });
    });

    describe('invoice items', () => {
        let invoice: Invoice;
        beforeEach(() => {
            invoice = mockInvoice();
        });

        it('should return the correct total cash discount amount', () => {
            expect(invoice.items.totalCashDiscountAmount).toBe(39.27);
        });

        it('should return the correct total cash discount base amount', () => {
            expect(invoice.items.totalCashDiscountBaseAmount).toBe(1309.0);
        });

        it('should return the correct total discounted net value', () => {
            expect(invoice.items.totalDiscountedNetValue).toBe(1067.0);
        });

        it('should return the correct total gross value', () => {
            expect(invoice.items.totalGrossValue).toBe(1309.0);
        });

        it('should return the correct total net value', () => {
            expect(invoice.items.totalNetValue).toBe(1100.0);
        });

        it('should return the correct total payment amount', () => {
            expect(invoice.items.totalPaymentAmount).toBe(1269.73);
        });

        it('should return the correct total vat amount', () => {
            expect(invoice.items.totalVatAmount).toBe(209.0);
        });

        it('should add an item', () => {
            const item = mockInvoiceItem();
            invoice.items.add(item);
            expect(invoice.items.length).toBe(3);
            expect(invoice.items.totalNetValue).toBe(1200.0);
        });

        it('should retrieve a certain item', () => {
            const item = invoice.items.get(2);
            expect(item.id).toBe(2);
            expect(item.description).toEqual('Reisezeit');
        });

        it('should retrieve the correct number of items', () => {
            expect(invoice.items.length).toBe(2);
        });

        it('should return the correct next item number', () => {
            expect(invoice.items.nextId).toBe(3);
        });

        it('should remove a certain item', () => {
            invoice.items.remove(1);
            expect(invoice.items.length).toBe(1);
            expect(invoice.items.get(2).id).toBe(2);
        });
    });

    describe('invoice item', () => {
        let invoice: Invoice;
        let item: InvoiceItem;
        beforeEach(() => {
            invoice = mockInvoice();
            item = invoice.items.get(1);
        });

        it('should return the correct cash discount percentage for the item', () => {
            expect(item.cashDiscountPercentage).toBe(3.0);
        });

        it('should return the correct contract item id', () => {
            expect(item.contractItemId).toBe(1);
        });

        it('should return the correct description', () => {
            expect(item.description).toEqual('Arbeitszeit');
        });

        it('should return the correct quantity', () => {
            expect(item.quantity).toBe(10);
        });

        it('should return the correct quantity unit', () => {
            expect(item.quantityUnit).toEqual('Std.');
        });

        it('should return the correct price per unit', () => {
            expect(item.pricePerUnit).toBe(100.0);
        });

        it('should return the correct value for cash discount allowed', () => {
            expect(item.cashDiscountAllowed).toBeTruthy();
        });
        it('should return the correct vat percentage', () => {
            expect(item.vatPercentage).toBe(19);
        });

        it('should return the correct discountable value', () => {
            expect(item.discountableValue).toBe(1190.0);
        });

        it('should return the correct gross value', () => {
            expect(item.grossValue).toBe(1190.0);
        });

        it('should return the correct net value', () => {
            expect(item.netValue).toBe(1000.0);
        });

        it('should return the correct vat value', () => {
            expect(item.vatValue).toBe(190.0);
        });

        it('should return the correct cash discount value', () => {
            expect(item.cashDiscountValue).toBe(35.7);
        });

        it('should return the correct discounted net value', () => {
            expect(item.discountedNetValue).toBe(970.0);
        });

        it('should return the correct discounted value', () => {
            expect(item.discountedValue).toBe(1154.3);
        });
    });

});
