import { TransactionItemData } from './transaction-item-data';
import { TransactionItem } from './transaction-item';

export abstract class TransactionItems<
    T extends TransactionItem<V>,
    V extends TransactionItemData
> {
    constructor(protected items: T[]) {}

    get data(): V[] {
        return this.items.map(item => item.data);
    }

    add(item: T): T {
        this.items = [...this.items, item];
        return item;
    }

    get(id: number): T {
        const item = this.items.find(item => item.data.id === id);
        if (!item) {
            throw new Error(`item_not_found:${id} `);
        }
        return item;
    }

    nextId(): number {
        if (this.items.length === 0) {
            return 1;
        }
        let ids: number[] = [];
        let gaps: number[] = [];
        ids = this.items.map(item => item.data.id || 0).sort();
        gaps = ids.filter((id, index) => id !== index + 1);
        // free id number is either gap or max + 1
        return gaps.length > 0 ? gaps[0] - 1 : ids[ids.length - 1] + 1;
    }

    remove(id: number): void {
        this.items = [...this.items.filter(item => item.data.id !== id)];
    }
}
