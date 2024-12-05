import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) {}

  addAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment);
  }
  getAppointments(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getAppointmentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateAppointment(id: string, appointmentData: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, appointmentData);
  }
  updateAppointmentStatus(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/status`;
    return this.http.put<any>(url, {});
  }
}
