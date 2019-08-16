import { TransactionItem } from '../core/transaction-item';
import { InvoiceItemData } from './invoice-item-data';

export class InvoiceItem extends TransactionItem<InvoiceItemData> {
    constructor(data: InvoiceItemData) {
        super(data);
    }

    get cashDiscountPercentage(): number {
        return this.data.cashDiscountAllowed ? this._data.cashDiscountPercentage || 0 : 0;
    }
    set cashDiscountPercentage(value: number) {
        if (this._data.cashDiscountAllowed) {
            this._data.cashDiscountPercentage = value;
        } else {
            this._data.cashDiscountPercentage = 0;
        }
    }

    get contractItemId(): number | undefined {
        return this._data.contractItemId;
    }
    set contractItemId(value: number | undefined) {
        this._data.contractItemId = value;
    }

    get description(): string {
        return this._data.description || '';
    }
    set description(value: string) {
        this._data.description = value;
    }

    get quantity(): number {
        return this._data.quantity || 0;
    }
    set quantity(value: number) {
        this._data.quantity = value;
    }

    get quantityUnit(): string {
        return this._data.quantityUnit || '';
    }
    set quantityUnit(value: string) {
        this._data.quantityUnit = value;
    }

    get pricePerUnit(): number {
        return this._data.pricePerUnit || 0;
    }
    set pricePerUnit(value: number) {
        this._data.pricePerUnit = value;
    }

    get cashDiscountAllowed(): boolean {
        return this._data.cashDiscountAllowed || false;
    }
    set cashDiscountAllowed(value: boolean) {
        this._data.cashDiscountAllowed = value;
    }

    get vatPercentage(): number {
        return this._data.vatPercentage || 0;
    }
    set vatPercentage(value: number) {
        this._data.vatPercentage = value;
    }

    get discountableValue(): number {
        return this.cashDiscountAllowed ? this.grossValue : 0;
    }

    get grossValue(): number {
        return this.netValue + this.vatValue;
    }

    get netValue(): number {
        return this.quantity && this.pricePerUnit ? this.quantity * this.pricePerUnit : 0;
    }

    get vatValue(): number {
        return this.vatPercentage ? this.netValue * this.vatPercentage / 100 : 0;
    }

    get cashDiscountValue(): number {
        return this.cashDiscountAllowed ? this.grossValue * this.cashDiscountPercentage / 100 : 0;
    }

    get discountedNetValue(): number {
        if (this.cashDiscountAllowed && this.cashDiscountPercentage > 0) {
            return this.discountedValue * 100 / ( 100 + this.vatPercentage);
        }
        return this.netValue;
    }

    get discountedValue(): number {
        return this.grossValue - this.cashDiscountValue;
    }
}