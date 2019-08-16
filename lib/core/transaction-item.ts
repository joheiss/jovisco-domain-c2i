import { TransactionItemData } from './transaction-item-data';

export abstract class TransactionItem<V extends TransactionItemData> {

    protected constructor(protected _data: V) {}

    get id(): number | undefined {
        return this._data.id;
    }

    set id(value: number | undefined) {
        this._data.id = value;
    }

    get data(): V {
        return this._data;
    }
}