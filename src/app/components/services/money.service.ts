import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  private apiUrl = 'http://localhost:8080/total-cost';

  constructor(private http: HttpClient) {}
  getTotalCost(): Observable<{ totalcost: number }> {
    return this.http.get<{ totalcost: number }>(this.apiUrl);
  }
}
