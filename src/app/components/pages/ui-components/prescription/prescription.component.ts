import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
export interface MedicinePurchase {
  name: string;
  quantity: number;
  price: number;
}

export interface Prescription {
  patientName: string;
  medicinePurchases: MedicinePurchase[];
  consultationFee: number;
  totalCost: number;
}

@Component({
  selector: "app-prescription",
  templateUrl: "./prescription.component.html",
  styleUrls: ["./prescription.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatPaginatorModule, // Import MatPaginatorModule here
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
  ];
  dataSource = new MatTableDataSource<Prescription>();
  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor() {}
  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
  }
  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    const mockData: Prescription[] = [
      {
        patientName: "John Doe",
        medicinePurchases: [{ name: "Medicine A", quantity: 2, price: 10 }],
        consultationFee: 50,
        totalCost: 70,
      },
      {
        patientName: "Jane Smith",
        medicinePurchases: [{ name: "Medicine B", quantity: 1, price: 15 }],
        consultationFee: 45,
        totalCost: 60,
      },
      {
        patientName: "David Brown",
        medicinePurchases: [{ name: "Medicine C", quantity: 3, price: 5 }],
        consultationFee: 40,
        totalCost: 55,
      },
      {
        patientName: "Emily White",
        medicinePurchases: [{ name: "Medicine D", quantity: 4, price: 8 }],
        consultationFee: 60,
        totalCost: 92,
      },
      {
        patientName: "Michael Johnson",
        medicinePurchases: [{ name: "Medicine E", quantity: 2, price: 12 }],
        consultationFee: 50,
        totalCost: 74,
      },
      {
        patientName: "Sarah Lee",
        medicinePurchases: [{ name: "Medicine F", quantity: 1, price: 18 }],
        consultationFee: 55,
        totalCost: 73,
      },
      {
        patientName: "Robert Harris",
        medicinePurchases: [{ name: "Medicine G", quantity: 5, price: 6 }],
        consultationFee: 60,
        totalCost: 90,
      },
      {
        patientName: "Sophia Clark",
        medicinePurchases: [{ name: "Medicine H", quantity: 2, price: 9 }],
        consultationFee: 52,
        totalCost: 70,
      },
      {
        patientName: "William Lewis",
        medicinePurchases: [{ name: "Medicine I", quantity: 3, price: 7 }],
        consultationFee: 50,
        totalCost: 71,
      },
      {
        patientName: "Olivia Walker",
        medicinePurchases: [
          { name: "Medicine J", quantity: 2, price: 11 },
          { name: "Medicine J", quantity: 2, price: 11 },
          { name: "Medicine J", quantity: 2, price: 11 },
        ],
        consultationFee: 58,
        totalCost: 80,
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
}
