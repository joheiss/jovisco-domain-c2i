import { TransactionHeader } from './transaction-header';
import { TransactionItems } from './transaction-items';
import { TransactionHeaderData } from './transaction-header-data';
import { TransactionItem } from './transaction-item';
import { TransactionItemData } from './transaction-item-data';

export abstract class Transaction<
    H extends TransactionHeader<V>,
    V extends TransactionHeaderData,
    S extends TransactionItems<I, U>,
    I extends TransactionItem<U>,
    U extends TransactionItemData
> {
    constructor(protected _header: H, protected _items: S) {}

    get data(): { header: V; items: U[] } {
        return {
            header: this._header.data,
            items: this._items.data,
        };
    }

    get header(): H {
        return this._header;
    }

    get items(): S {
        return this._items;
    }
}
