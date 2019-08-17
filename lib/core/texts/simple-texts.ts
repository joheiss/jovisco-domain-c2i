import { SimpleText } from "./simple-text";
import { TextType } from "./text-type";
import { SimpleTextData } from "./simple-text-data";

export class SimpleTexts {
    constructor(protected _data: SimpleText[]) {}

    get data(): SimpleTextData[] {
        return this._data.map(text => text.data);
    }

    get length(): number {
        return this._data.length;
    }
    
    add(text: SimpleText): void {
        const found = this._data.find(t => t.type === text.type);
        if (found) {
            throw new Error(`text_already_exists: ${text.type}`);
        }
        this._data = [...this._data, text];
    }

    get(type: TextType): SimpleText {
        const found = this._data.find(t => t.type === type);
        if (!found) {
            throw new Error(`text_not_found: ${type}`);
        }
        return found;
    }

    remove(type: TextType): void {
        this._data = [...this._data.filter(t => t.type !== type)];
    }

    set(text: SimpleText) {
        const found = this._data.find(t => t.type === text.type);
        if (!found) {
            this.add(text)
        } else {
            found.text = text.text;
        }
    }
}