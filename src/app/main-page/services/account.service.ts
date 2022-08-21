import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AccountModel } from '../interfaces/AccountModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl: string = environment.base;

  constructor(
    private http: HttpClient
  ) { }

  public getAccounts(): Observable<AccountModel[]> {
    return this.http.get<AccountModel[]>(`${this.baseUrl}/accounts`);
  }

  public updateAccount(account: AccountModel): Observable<AccountModel> {
    return this.http.put<AccountModel>(`${this.baseUrl}/accounts`, account);
  }

  public addAccount(account: AccountModel): Observable<AccountModel> {
    return this.http.post<AccountModel>(`${this.baseUrl}/accounts`, account);
  }

}
