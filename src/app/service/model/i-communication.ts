export const CALL_TYPE = 'call';
export const SMS_TYPE = 'sms';

export interface ICommunication {
    id: number;
    incoming: boolean;
    date: string;
    type: string;
}
