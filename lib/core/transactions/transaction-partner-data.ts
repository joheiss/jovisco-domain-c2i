import { PartnerFunctionType } from "./partner-function-type";

export interface TransactionPartnerData {
    function: PartnerFunctionType;
    id: string;
    primary: boolean;
}