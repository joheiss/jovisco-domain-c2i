import { BoHeader } from '../bo-header';
import { TransactionHeaderData } from './transaction-header-data';
import { DateUtility } from '../../utils/date-utility';

export abstract class TransactionHeader<V extends TransactionHeaderData> extends BoHeader<V> {
   
    constructor(_data: V) {
        super(_data);
    }

    get data(): V {
        return this._data;
    }

    get issuedAt(): Date {
        return this._data.issuedAt || DateUtility.getCurrentDate();
    }
    set issuedAt(value: Date) {
        this._data.issuedAt = value;
    }

}