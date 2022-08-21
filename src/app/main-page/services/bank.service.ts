import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankModel } from '../interfaces/BankModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private baseUrl: string = environment.base;

  constructor(
    private http: HttpClient
  ) { }

  public getBanks(): Observable<BankModel[]> {
    return this.http.get<BankModel[]>(`${this.baseUrl}/banks`);
  }

}
