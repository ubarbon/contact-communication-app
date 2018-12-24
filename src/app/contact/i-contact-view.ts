import {IContact} from '../service/model/i-contact';
import {ICommunication} from '../service/model/i-communication';

export interface IContactView {
    contact: IContact;
    isLoaded: boolean;
    communications: ICommunication[];
}
