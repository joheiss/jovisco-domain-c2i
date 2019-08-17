import { SimpleTextData } from './simple-text-data';
import { SimpleText } from './simple-text';

export class SimpleTextFactory {
    static fromData(data: SimpleTextData): SimpleText {
        return new SimpleText(data);
    }

    static fromDataArray(texts: SimpleTextData[]):SimpleText[] {
        if (!texts.length) return [];

        return texts
            .filter(text => !!text)
            .map(text => SimpleTextFactory.fromData(text));
    }
}
