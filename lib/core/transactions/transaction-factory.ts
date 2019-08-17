import { SimpleTextData, SimpleTexts, SimpleTextFactory } from "../texts";
import { TransactionPartnerData } from './transaction-partner-data';
import { TransactionPartners } from "./transaction-partners";
import { TransactionPartnerFactory } from "./simple-text-factory";

export class TransactionFactory {

    public static partnersFromData(partners: TransactionPartnerData[]): TransactionPartners {
        const newPartners = TransactionPartnerFactory.fromDataArray(partners);
        return new TransactionPartners(newPartners);
    }
    
    public static textsFromData(texts: SimpleTextData[]): SimpleTexts {
        const newTexts = SimpleTextFactory.fromDataArray(texts);
        return new SimpleTexts(newTexts);
    }
}