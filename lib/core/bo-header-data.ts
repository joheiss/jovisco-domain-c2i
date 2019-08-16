import { BoType } from './bo-type';

export interface BoHeaderData {
    id?: string;
    objectType?: BoType;
    organization?: string;
    isDeletable?: boolean;
}