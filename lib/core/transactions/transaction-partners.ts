import { TransactionPartner } from "./transaction-partner";
import { PartnerFunctionType } from "./partner-function-type";

export class TransactionPartners {

    constructor(protected partners: TransactionPartner[]) {}

    get length(): number {
        return this.partners.length;
    }

    add(partner: TransactionPartner): void {
        this.partners = [...this.partners, partner];
    }

    get(id?: string, func?: PartnerFunctionType): TransactionPartner[] | undefined {
        return this.partners.filter(p => id ? p.id === id : true && func ? p.function === func : true);
    }

    remove(id?: string, func?: PartnerFunctionType): void {
        this.partners = [
            ...this.partners.filter(p => id ? p.id !== id : true && func ? p.function !== func : true)
        ]
    }
}