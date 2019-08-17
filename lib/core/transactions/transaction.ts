import { TransactionHeader } from './transaction-header';
import { TransactionItems } from './transaction-items';
import { TransactionHeaderData } from './transaction-header-data';
import { TransactionItem } from './transaction-item';
import { TransactionItemData } from './transaction-item-data';
import { SimpleTexts, SimpleTextData } from '../texts';
import { TransactionPartnerData } from './transaction-partner-data';
import { TransactionPartners } from './transaction-partners';

export abstract class Transaction<
    H extends TransactionHeader<V>,
    V extends TransactionHeaderData,
    S extends TransactionItems<I, U>,
    I extends TransactionItem<U>,
    U extends TransactionItemData
> {
    constructor(
        protected _header: H, 
        protected _partners: TransactionPartners, 
        protected _items: S, 
        protected _texts: SimpleTexts, ) {}

    get data(): { header: V, partners: TransactionPartnerData[], texts: SimpleTextData[], items: U[] } {
        return {
            header: this._header.data,
            partners: this._partners.data,
            texts: this._texts.data,
            items: this._items.data,
        };
    }

    get header(): H {
        return this._header;
    }

    get partners(): TransactionPartners {
        return this._partners;
    }
    
    get items(): S {
        return this._items;
    }

    get texts(): SimpleTexts {
        return this._texts;
    }
}
