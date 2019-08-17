import { TransactionHeader } from '../core/transactions';
import { InvoiceHeaderData } from './invoice-header-data';
import { InvoiceStatus } from './invoice-status';
import { DateUtility } from '../utils/date-utility';
import { BillingMethod } from './billing-method';
import { PaymentMethod } from './payment-method';
export class InvoiceHeader extends TransactionHeader<InvoiceHeaderData> {

    constructor(data: InvoiceHeaderData) {
        super(data);
    }

    get billingMethod(): BillingMethod {
        return this._data.billingMethod || 0;
    }
    set billingMethod(value: BillingMethod) {
        this._data.billingMethod = value;
    }

    get billingPeriod(): string {
        return this._data.billingPeriod || '';
    }
    set billingPeriod(value: string) {
        this._data.billingPeriod = value;
    }

    get cashDiscountDate(): Date {
        return DateUtility.addDaysToDate(this.issuedAt, this.cashDiscountDays);
    }

    get cashDiscountDays(): number {
        return this._data.cashDiscountDays || 0;
    }
    set cashDiscountDays(value: number) {
        this._data.cashDiscountDays = value;
    }

    get cashDiscountPercentage(): number {
        return this._data.cashDiscountPercentage || 0;
    }
    set cashDiscountPercentage(value: number) {
        this._data.cashDiscountPercentage = value;
    }

    get contractId(): string | undefined {
        return this._data.contractId;
    }
    set contractId(value: string | undefined) {
        this._data.contractId = value;
    }
    
    get currency(): string | undefined {
        return this._data.currency;
    }
    set currency(value: string | undefined) {
        this._data.currency = value;
    }

    get dueDate(): Date {
        return DateUtility.addDaysToDate(this.issuedAt, this.dueDays);
    }

    get dueDays(): number {
        return this._data.dueDays || 0;
    }
    set dueDays(value: number) {
        this._data.dueDays = value;
    }

    get isBilled(): boolean {
        return this._data.status === InvoiceStatus.Billed;
    }

    get isOpen(): boolean {
        return this._data.status !== InvoiceStatus.Paid;
    }

    get isPaid(): boolean {
        return this._data.status === InvoiceStatus.Paid;
    }

    get paymentTerms(): string | undefined {
        return this._data.paymentTerms;
    }
    set paymentTerms(value: string | undefined) {
        this._data.paymentTerms = value;
    }

    get paymentMethod(): PaymentMethod {
        return this._data.paymentMethod || 0;
    }
    set paymentMethod(value: PaymentMethod) {
        this._data.paymentMethod = value;
    }

    get receiverId(): string | undefined {
        return this._data.receiverId;
    }
    set receiverId(value: string | undefined) {
        this._data.receiverId = value;
    }

    get revenuePeriod(): { year: number, month: number } {
        if (this.issuedAt.getDate() > 15) {
            return {year: this.issuedAt.getFullYear(), month: this.issuedAt.getMonth() + 1};
        }
        const previousMonth = DateUtility.subtractMonthsFromDate(this.issuedAt, 1);
        return {year: previousMonth.getFullYear(), month: previousMonth.getMonth() + 1};
    }

    get status(): InvoiceStatus {
        return this._data.status || 0;
    }
    set status(value: InvoiceStatus) {
        this._data.status = value;
    }

    get vatPercentage(): number {
        return this.data.vatPercentage || 0;
    }
    set vatPercentage(percentage: number) {
        this.data.vatPercentage = percentage;
    }
}