import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddAppoinmentComponent } from "../../../../shared/component/add-appoinment/add-appoinment.component";
import { UpdateAppointmentComponent } from "../../../../shared/component/update-appointment/update-appointment.component";
import { AppointmentService } from 'src/app/components/services/appointment.service';

interface Appointment {
  id: string;
  patientName: string;
  phoneNumber: string;
  appointmentDate: Date;
  notes: string;
  status: boolean;
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    AddAppoinmentComponent,
    UpdateAppointmentComponent
],
})
export class AppointmentComponent implements OnInit {
  showChild = false;
  showChildUpdate = false;
  selectedAppointmentId = "";
  displayedColumns: string[] = [ 'patientName', 'phoneNumber','appointmentdate','note','status','edit'];
  dataSource = new MatTableDataSource<Appointment>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private appointmentService: AppointmentService) {}
  ngOnInit(): void {
  
    this.reloadData();
  }

  reloadData(): void {
    this.appointmentService.getAppointments().subscribe(
      (response) => {
        if (response && response.data) {
          const appointments: Appointment[] = response.data.map((appointment: any) => ({
            id: appointment.id,
            patientName: appointment.patientName,
            phoneNumber: appointment.phoneNumber,
            appointmentDate: new Date(appointment.appointmentDate),
            notes: appointment.notes,
            status: appointment.status
          }));
          this.dataSource.data = appointments;
          this.dataSource.paginator = this.paginator;
        }
      },
      (error) => {
        console.error('Error fetching appointments:', error);
        alert('Error fetching appointments');
      }
    );
  }
  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
  }
  toggleChildUpdate() {
    this.showChildUpdate = !this.showChild;
  }

  showChildClickUpdate(value: boolean) {
    this.showChildUpdate = value;
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  onMedicineClick(id: string) {
    this.selectedAppointmentId = id;
    console.log("Medicine ID:", this.selectedAppointmentId);
  }
}
