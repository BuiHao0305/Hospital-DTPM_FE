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
    "consultationFee",
    "totalCost",
    "status",
    "edit",
  ];
  dataSource = new MatTableDataSource<Prescription>();
  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number = 8;

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
        medicinePurchases: [{ name: "Medicine A", quantity: 2, price: 10 }],
        consultationFee: 50,
        status: true,
        totalCost: 70,
      },
      {
        id: "2",
        patientName: "Jane Smith",
        medicinePurchases: [{ name: "Medicine B", quantity: 1, price: 15 }],
        consultationFee: 45,
        status: false,
        totalCost: 60,
      },
      {
        id: "3",
        patientName: "David Brown",
        medicinePurchases: [{ name: "Medicine C", quantity: 3, price: 5 }],
        consultationFee: 40,
        status: true,
        totalCost: 55,
      },
      {
        id: "4",
        patientName: "Emily White",
        medicinePurchases: [{ name: "Medicine D", quantity: 4, price: 8 }],
        consultationFee: 60,
        status: false,
        totalCost: 92,
      },
      {
        id: "5",
        patientName: "Michael Johnson",
        medicinePurchases: [{ name: "Medicine E", quantity: 2, price: 12 }],
        consultationFee: 50,
        status: true,
        totalCost: 74,
      },
      {
        id: "6",
        patientName: "Sarah Lee",
        medicinePurchases: [{ name: "Medicine F", quantity: 1, price: 18 }],
        consultationFee: 55,
        status: false,
        totalCost: 73,
      },
      {
        id: "7",
        patientName: "Robert Harris",
        medicinePurchases: [{ name: "Medicine G", quantity: 5, price: 6 }],
        consultationFee: 60,
        status: true,
        totalCost: 90,
      },
      {
        id: "8",
        patientName: "Sophia Clark",
        medicinePurchases: [{ name: "Medicine H", quantity: 2, price: 9 }],
        consultationFee: 52,
        status: false,
        totalCost: 70,
      },
      {
        id: "9",
        patientName: "William Lewis",
        medicinePurchases: [{ name: "Medicine I", quantity: 3, price: 7 }],
        consultationFee: 50,
        status: true,
        totalCost: 71,
      },
      {
        id: "10",
        patientName: "Olivia Walker",
        medicinePurchases: [
          { name: "Medicine J", quantity: 2, price: 11 },
          { name: "Medicine J", quantity: 2, price: 11 },
          { name: "Medicine J", quantity: 2, price: 11 },
        ],
        consultationFee: 58,
        status: true,
        totalCost: 80,
      },
      {
        id: "11",
        patientName: "William Lewis",
        medicinePurchases: [{ name: "Medicine I", quantity: 3, price: 7 }],
        consultationFee: 50,
        status: true,
        totalCost: 71,
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
}
