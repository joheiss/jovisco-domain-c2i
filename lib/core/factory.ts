
export class Factory {

    static fromData<T, V>(type: { new(arg: V): T }, data: V): T {
        return new type(data);
    }

    static fromDataArray<T, V>(type: { new(arg: V): T }, items: V[]): T[] {
        if (!items.length) return [];

        return items
            .filter(item => !!item)
            .map(item => Factory.fromData(type, item));
    } 
}