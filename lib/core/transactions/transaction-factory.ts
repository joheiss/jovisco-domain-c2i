import { SimpleTextData, SimpleTexts, SimpleTextFactory } from "../texts";

export class TransactionFactory {

    public static textsFromData(texts: SimpleTextData[]): SimpleTexts {
        const newTexts = texts ? SimpleTextFactory.fromDataArray(texts) : [];
        return new SimpleTexts(newTexts);
    }
}