import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../pages/ui-components/medicine/medicine.component';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrl = 'http://localhost:8080/api/medicines';

  constructor(private http: HttpClient) {}

  getMedicines(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  addMedicine(medicine: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, medicine);
  }
  getMedicineById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateMedicine(id: string, medicine: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, medicine);
  }
}
