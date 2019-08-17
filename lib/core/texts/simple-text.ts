import { SimpleTextData } from "./simple-text-data";
import { TextType } from "./text-type";

export class SimpleText {
    constructor(private _data: SimpleTextData) {}

    get data(): SimpleTextData {
        return this._data;
    }

    get text(): string | undefined {
        return this._data.text;
    }
    set text(value: string | undefined) {
        this._data.text = value;
    }

    get type(): TextType {
        return this._data.type || TextType.InternalText;
    }
    set type(value: TextType) {
        this._data.type = value;
    }

}