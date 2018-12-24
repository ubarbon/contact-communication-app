import {IContact} from '../model/i-contact';

export interface IContactsResponse {
    page: number;
    total: string;
    totalRecords: number;
    hasNext: boolean;
    contacts: IContact[];
}
