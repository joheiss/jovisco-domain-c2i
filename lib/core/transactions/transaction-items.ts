import { TransactionItemData } from './transaction-item-data';
import { TransactionItem } from './transaction-item';
import { Collection } from '../collection';

export abstract class TransactionItems<T extends TransactionItem<V>, V extends TransactionItemData> extends Collection<T, V> {
    constructor(items: T[]) {
        super(items);
    }

    get(id: number): T {
        const item = this._items.find(item => item.data.id === id);
        if (!item) {
            throw new Error(`item_not_found: ${id}`);
        }
        return item;
    }

    get nextId(): number {
        if (this._items.length === 0) {
            return 1;
        }
        let ids: number[] = [];
        let gaps: number[] = [];
        ids = this._items.map(item => item.data.id || 0).sort();
        gaps = ids.filter((id, index) => id !== index + 1);
        // free id number is either gap or max + 1
        return gaps.length > 0 ? gaps[0] - 1 : ids[ids.length - 1] + 1;
    }

    remove(id: number): void {
        this._items = [...this._items.filter(item => item.data.id !== id)];
    }
}
