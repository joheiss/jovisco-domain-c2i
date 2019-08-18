import { SimpleTextData, SimpleTexts, SimpleText } from "../texts";
import { TransactionPartnerData } from './transaction-partner-data';
import { TransactionPartners } from "./transaction-partners";
import { Factory } from "../factory";
import { TransactionPartner } from "./transaction-partner";

export class TransactionFactory {

    public static partnersFromData(partners: TransactionPartnerData[]): TransactionPartners {
        const newPartners = Factory.fromDataArray<TransactionPartner, TransactionPartnerData>(TransactionPartner, partners);
        return new TransactionPartners(newPartners);
    }
    
    public static textsFromData(texts: SimpleTextData[]): SimpleTexts {
        const newTexts = Factory.fromDataArray<SimpleText, SimpleTextData>(SimpleText, texts);
        return new SimpleTexts(newTexts);
    }
}