import { TransactionPartnerData } from './transaction-partner-data';
import { TransactionPartner } from './transaction-partner';

export class TransactionPartnerFactory {
    static fromData(data: TransactionPartnerData): TransactionPartner {
        return new TransactionPartner(data);
    }

    static fromDataArray(partners: TransactionPartnerData[]): TransactionPartner[] {
        if (!partners.length) return [];

        return partners
            .filter(partner => !!partner)
            .map(partner => TransactionPartnerFactory.fromData(partner));
    }
}
