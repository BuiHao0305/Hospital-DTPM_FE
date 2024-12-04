import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { AddPrescriptionComponent } from "src/app/shared/component/add-prescription/add-prescription.component";
import { DonePrescriptionComponent } from "src/app/shared/dialog/done-prescription/done-prescription.component";
export interface MedicinePurchase {
  name: string;
  quantity: number;
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
  ],
})
export class PrescriptionComponent implements OnInit {
  showChild = false;
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

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    const mockData: Prescription[] = [
      {
        id: "1",
        patientName: "John Doe",
        phoneNumber: "0123456789",
        appointmentDate: "2024-12-01",
        medicinePurchases: [
          { name: "Paracetamol", quantity: 2, price: 10 },
          { name: "Paracetamol", quantity: 2, price: 10 },
          { name: "Paracetamol", quantity: 2, price: 10 },
        ],
        consultationFee: 50,
        status: true,
        totalCost: 110,
      },
      {
        id: "2",
        patientName: "Jane Smith",
        phoneNumber: "0987654321",
        appointmentDate: "2024-12-02",
        medicinePurchases: [{ name: "Ibuprofen", quantity: 1, price: 15 }],
        consultationFee: 45,
        status: false,
        totalCost: 60,
      },
      {
        id: "3",
        patientName: "David Brown",
        phoneNumber: "0112233445",
        appointmentDate: "2024-12-03",
        medicinePurchases: [{ name: "Amoxicillin", quantity: 3, price: 5 }],
        consultationFee: 40,
        status: true,
        totalCost: 55,
      },
    ];

    // Assign the mock data to the dataSource
    this.dataSource.data = mockData;
  }

  // Khi trang thay đổi, gọi lại loadPrescriptions để cập nhật dữ liệu
  onPageChanged(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPrescriptions();
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  onEditClick(id: string) {
    console.log("Edit prescription with ID:", id);
  }
  changeStatus() {
    const dialogRef = this.dialog.open(DonePrescriptionComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Prescription done:", result);
      } else {
        console.log("Prescription not done:", result);
      }
    });
  }
  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
  }
  formatDate(date: Date): string {
    return date.toISOString().split("T")[0]; // Trả về "YYYY-MM-DD"
  }
}
