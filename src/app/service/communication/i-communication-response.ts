import {ICommunication} from '../model/i-communication';

export interface ICommunicationResponse {
    page: number;
    total: string;
    totalRecords: number;
    hasNext: boolean;
    communications: ICommunication[];
}
