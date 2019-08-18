import { SimpleText } from "./simple-text";
import { TextType } from "./text-type";
import { SimpleTextData } from "./simple-text-data";
import { Collection } from "../collection";
import { Factory } from '../factory';

export class SimpleTexts extends Collection<SimpleText, SimpleTextData> {
    constructor(data: SimpleText[]) {
        super(data);
    }
    
    get invoiceText(): string | undefined {
        try {
            return this.get(TextType.InvoiceText).text;
        } catch (e) {
            return undefined;
        }
        
    }
    set invoiceText(value: string | undefined) {
        const text = Factory.fromData<SimpleText, SimpleTextData>(SimpleText, { 
            type: TextType.InvoiceText, 
            text: value });
        this.set(text);
    }

    get internalText(): string | undefined {
        try {
            return this.get(TextType.InternalText).text;
        } catch (e) {
            return undefined;
        }
    }
    set internalText(value: string | undefined) {
        const text = Factory.fromData<SimpleText, SimpleTextData>(SimpleText, { 
            type: TextType.InternalText, 
            text: value });
        this.set(text);
    }
    
    add(text: SimpleText): void {
        const found = this._items.find(t => t.type === text.type);
        if (found) {
            throw new Error(`text_already_exists: ${text.type}`);
        }
        this._items = [...this._items, text];
    }

    get(type: TextType): SimpleText {
        const found = this._items.find(t => t.type === type);
        if (!found) {
            throw new Error(`text_not_found: ${type}`);
        }
        return found;
    }

    remove(type: TextType): void {
        this._items = [...this._items.filter(t => t.type !== type)];
    }

    set(text: SimpleText) {
        const found = this._items.find(t => t.type === text.type);
        if (!found) {
            this.add(text)
        } else {
            found.text = text.text;
        }
    }
}