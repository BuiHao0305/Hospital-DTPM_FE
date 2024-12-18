import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { AddPrescriptionComponent } from "src/app/shared/component/add-prescription/add-prescription.component";
import { DonePrescriptionComponent } from "src/app/shared/dialog/done-prescription/done-prescription.component";
import { UpdatePrescriptionComponent } from "../../../../shared/component/update-prescription/update-prescription.component";
import { PrescriptionService } from "src/app/components/services/prescription.service";
import { AppointmentService } from "src/app/components/services/appointment.service";
import { SnackbarService } from "src/app/shared/snackbar/snackbar.service";
export interface MedicinePurchase {
  id: string;
  name: string;
  quantity: number;
  medicineName: string;
  price: number;
}

export interface Prescription {
  id: string;
  patientName: string;
  phoneNumber: string;
  appointmentDate: string;
  medicinePurchases: MedicinePurchase[];
  consultationFee: number;
  status: boolean;
  appointmentId: string;   
  totalCost: number;
}

@Component({
  selector: "app-prescription",
  templateUrl: "./prescription.component.html",
  styleUrls: ["./prescription.component.scss"],
  standalone: true,
  imports: [
    AddPrescriptionComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    UpdatePrescriptionComponent,
  ],
})
export class PrescriptionComponent implements OnInit {
  showChild = false;
  showChildUpdate = false;
  displayedColumns: string[] = [
    "patientName",
    "medicinePurchases",
    "phoneNumber",
    "appointmentDate",
    "consultationFee",
    "totalCost",
    "status",
    "edit",
  ];
  dataSource = new MatTableDataSource<Prescription>();
  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number = 6;
  selectedPrescriptionId = "";
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private dialog: MatDialog,
    private prescriptionService: PrescriptionService,
    private apointmentService: AppointmentService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.prescriptionService
      .getPrescriptions()
      .subscribe((data: Prescription[]) => {
        this.dataSource.data = data;
      });
  }

  onPageChanged(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.reloadData();
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  onEditClick(prescriptionId: string) {
    console.log("Edit prescription with ID:", prescriptionId);
  }
  onEditClick1(apointmentId: string) {
    console.log("Edit prescription with ID:", apointmentId);
  }
  changeStatus(prescriptionId: string, appointmentId: string): void {
    const dialogRef = this.dialog.open(DonePrescriptionComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Prescription done:", result);
        this.updateSatus
        this.prescriptionService.updatePrescriptionStatus(prescriptionId).subscribe({
          next: (res) => {
            console.log("Prescription status updated successfully:", res);
           
          },
          error: (err) => {
            console.error("Error updating prescription status:", err);
          }
        });
        
        this.apointmentService.updateAppointmentStatus(appointmentId).subscribe({
          next: (res) => {
            console.log("Appointment status updated successfully:", res);
          },
          error: (err) => {
            console.error("Error updating appointment status:", err);
          }
        });
        setTimeout(() => {
          this.updateSatus(prescriptionId);
        }, 800);
        setTimeout(() => {
          this.reloadData();
        }, 800);
        this.snackbar.show("Prescription status updated successfully");
        
      } else {
        console.log("Prescription not done:", result);
      }
     
    });
  }
  updateSatus(prescriptionId: string) :void{
    this.prescriptionService.updatePrescriptionStatus(prescriptionId).subscribe({
      next: (res) => {
        console.log("Prescription status updated successfully:", res);
       
      },
      error: (err) => {
        console.error("Error updating prescription status:", err);
      }
    });
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
  onMedicineClick(id: string) {
    this.selectedPrescriptionId = id;
    const selectedPrescription = this.dataSource.data.find((p) => p.id === id);

    if (selectedPrescription) {
      const prescriptionId = selectedPrescription.id; // prescriptionId

      console.log("Prescription ID:", prescriptionId);
    }
  }
}
