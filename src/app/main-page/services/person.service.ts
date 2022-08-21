import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonModel } from '../interfaces/PersonModel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl: string = environment.base;

  constructor(
    private http: HttpClient
  ) { }

  public getPersons(): Observable<PersonModel[]> {
    return this.http.get<PersonModel[]>(`${this.baseUrl}/persons`);
  }

  public addPerson(person: PersonModel): Observable<PersonModel> {
    return this.http.post<PersonModel>(`${this.baseUrl}/persons`, person);
  }

  public updatePerson(person: PersonModel): Observable<PersonModel> {
    return this.http.put<PersonModel>(`${this.baseUrl}/persons`, person);
  }

}
