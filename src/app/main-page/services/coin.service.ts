import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoinModel } from '../interfaces/CoinModel';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private baseUrl: string = environment.base;

  constructor(
    private http: HttpClient
  ) { }

  public getCoins(): Observable<CoinModel[]> {
    return this.http.get<CoinModel[]>(`${this.baseUrl}/coins`);
  }

}
