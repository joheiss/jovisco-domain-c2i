import { BoHeaderData } from './bo-header-data';

export interface TransactionHeaderData extends BoHeaderData {
    issuedAt: Date;
}