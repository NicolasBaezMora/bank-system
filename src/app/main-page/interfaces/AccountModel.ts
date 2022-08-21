import { BankModel } from './BankModel';
import { PersonModel } from './PersonModel';
import { CoinModel } from './CoinModel';


export interface AccountModel {
    id?: number;
    description: string;
    person: PersonModel;
    bank?: BankModel;
    coin: CoinModel;
}

