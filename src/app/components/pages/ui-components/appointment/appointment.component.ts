import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddAppoinmentComponent } from "../../../../shared/component/add-appoinment/add-appoinment.component";
import { UpdateAppointmentComponent } from "../../../../shared/component/update-appointment/update-appointment.component";

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

  ngOnInit(): void {
    // Fetch data
    this.loadAppointments();
  }

  loadAppointments(): void {
    const data: Appointment[] = [
      {
        id: '1',
        patientName: 'John Doe',
        phoneNumber: '123456789',
        appointmentDate: new Date('2024-12-01'),
        notes: 'Check-up',
        status: true
      },
      {
        id: '2',
        patientName: 'John Doe',
        phoneNumber: '123456789',
        appointmentDate: new Date('2024-12-01'),
        notes: 'Check-up',
        status: false
      },
      {
        id: '3',
        patientName: 'John Doe',
        phoneNumber: '123456789',
        appointmentDate: new Date('2024-12-01'),
        notes: 'Check-up',
        status: true
      },
      {
        id: '4',
        patientName: 'John Doe',
        phoneNumber: '123456789',
        appointmentDate: new Date('2024-12-01'),
        notes: 'Check-up',
        status: false
      },
      {
        id: '5',
        patientName: 'John Doe',
        phoneNumber: '123456789',
        appointmentDate: new Date('2024-12-01'),
        notes: 'Check-up',
        status: true
      },
      {
        id: '6',
        patientName: 'John Doe',
        phoneNumber: '123456789',
        appointmentDate: new Date('2024-12-01'),
        notes: 'Check-up',
        status: false
      },

      // Add more appointments here
    ];

    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
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
