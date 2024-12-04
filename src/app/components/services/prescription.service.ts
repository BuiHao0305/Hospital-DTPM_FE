import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '../pages/ui-components/prescription/prescription.component';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:8080/api/prescriptions';
  private apiUrlAppointment = 'http://localhost:8080/api/appointments/getstatus';

  constructor(private http: HttpClient) {}

  getPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.apiUrl);
  }
  getAppointments() {
    return this.http.get(this.apiUrlAppointment);
  }
  createPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.apiUrl, prescription);
  }
  getPrescriptionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  addMedicinesToPrescription(id: string, prescriptionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/addMedicines`, prescriptionData);
  }
}
