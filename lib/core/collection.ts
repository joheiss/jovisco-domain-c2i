import { HasData } from "./has-data";

export abstract class Collection<T extends HasData<V>, V> {
    constructor(protected _items: T[]) {}

    get data(): V[] {
        return this._items.map(item => item.data);
    }
    
    get length(): number {
        return this._items.length;
    }

    add(item: T): void {
        this._items = [...this._items, item];
    }

}