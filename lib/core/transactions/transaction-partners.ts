import { TransactionPartner } from "./transaction-partner";
import { PartnerFunctionType } from "./partner-function-type";
import { TransactionPartnerData } from "./transaction-partner-data";
import { Factory } from "../factory";
import { Collection } from "../collection";

export class TransactionPartners extends Collection<TransactionPartner, TransactionPartnerData> {

    constructor(items: TransactionPartner[]) {
        super(items);
    }

    
    get(id?: string, func?: PartnerFunctionType): TransactionPartner[] | undefined {
        return this._items.filter(p => id ? p.id === id : true && func ? p.function === func : true);
    }

    remove(id?: string, func?: PartnerFunctionType): void {
        this._items = [
            ...this._items.filter(p => id ? p.id !== id : true && func ? p.function !== func : true)
        ]
    }

    set(partner: TransactionPartner) {
        const found = this._items.find(p => p.function === partner.function);
        if (!found) {
            this.add(partner)
        } else {
            found.id = partner.id;
        }
    }

    get customerId(): string | undefined {
        const partner =  this._items.find(p => p.function === PartnerFunctionType.Customer);
        return partner ? partner.id : undefined;
    }
    set customerId(value: string | undefined) {
        const partner =  this._items.find(p => p.function === PartnerFunctionType.Customer);
        if (partner) {
            partner.id = value || '';
        } else if (value) {
            this.add(Factory.fromData<TransactionPartner, TransactionPartnerData>(TransactionPartner, { 
                function: PartnerFunctionType.Customer, 
                id: value, 
                primary: false}));
        }
    }

    get contactPersonId(): string | undefined {
        const partner = this.findOneByFunc(PartnerFunctionType.ContactPerson);
        return partner ? partner.id : undefined;
    }

    get contactPersonIds(): string[] | undefined {
        return this.findManyByFunc(PartnerFunctionType.ContactPerson).map(p => p.id);
    }

    get invoiceReceiverId(): string | undefined {
        const partner = this.findOneByFunc(PartnerFunctionType.InvoiceReceiver);
        return partner ? partner.id : undefined;
    }

    get invoiceReceiverIds(): string[] | undefined {
        return this.findManyByFunc(PartnerFunctionType.InvoiceReceiver).map(p => p.id);
    }

    private findOneByFunc(func: PartnerFunctionType): TransactionPartner | undefined {
        const partners =  this._items.filter(p => p.function === func);
        if (!partners.length) {
            return undefined;
        } else if (partners.length === 1) {
            return partners[0];
        }
        const partner = partners.find(p => p.primary === true);
        if (partner) {
            return partner;
        }
        return partners[0];
    }

    private findManyByFunc(func: PartnerFunctionType): TransactionPartner[] {
        return this._items.filter(p => p.function === func) || [];
    }
}