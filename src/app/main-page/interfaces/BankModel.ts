import { AccountModel } from "./AccountModel";

export interface BankModel {
    id?: number;
    name?: string;
    accounts?: AccountModel[];
}


