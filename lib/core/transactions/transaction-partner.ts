import { TransactionPartnerData } from './transaction-partner-data';
import { PartnerFunctionType } from './partner-function-type';
export class TransactionPartner {

    constructor(protected _data: TransactionPartnerData) {}

    get function(): PartnerFunctionType {
        return this._data.function;
    }
    set function(value: PartnerFunctionType) {
        this._data.function = value;
    }

    get id(): string {
        return this._data.id;
    }
    set id(value: string) {
        this._data.id = value;
    }

    get primary(): boolean {
        return this._data.primary;
    }
    set primary(value: boolean) {
        this._data.primary = value;
    }
}