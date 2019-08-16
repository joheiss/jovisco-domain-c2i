import { BoHeaderData } from './bo-header-data';
import { BoType } from './bo-type';

export abstract class BoHeader<V extends BoHeaderData> {
    constructor(protected _data: V) {}

    get id(): string | undefined {
        return this._data.id;
    }
    set id(value: string | undefined) {
        this._data.id = value;
    }

    get isDeletable(): boolean {
        return this._data.isDeletable || false;
    }
    set isDeletable(value: boolean) {
        this._data.isDeletable = value;
    }
    
    get objectType(): BoType {
        return this._data.objectType || BoType.Invoice;
    }
    set objectType(value: BoType) {
        this._data.objectType = value;
    }

    get organization(): string | undefined {
        return this._data.organization;
    }
    set organization(value: string | undefined) {
        this._data.organization = value;
    }

    get ownerKey() {
        return `${this._data.objectType}/${this._data.id}`;
    }
}
