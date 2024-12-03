import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MedicineService } from "src/app/components/services/medicine.service";

import { MedicineCategoryPipe } from "src/app/shared/pipe/medicine.pipe";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { AddMedicineComponent } from "src/app/shared/component/add-medicine/add-medicine.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UpdateMedicineComponent } from "src/app/shared/component/update-medicine/update-medicine.component";

export interface Medicine {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: number;
}
@Component({
  selector: "app-medicine",
  templateUrl: "./medicine.component.html",
  styleUrls: ["./medicine.component.scss"],
  standalone: true,
  imports: [
    AddMedicineComponent,
    MedicineCategoryPipe,
    MatPaginatorModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    UpdateMedicineComponent,
  ],
})
export class MedicineComponent implements OnInit, AfterViewInit {
  showChild = false;
  showChildUpdate = false;
  selectedMedicineId = "";
  medicines: Medicine[] = [];

  dataSource = new MatTableDataSource<Medicine>(this.medicines);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private medicineService : MedicineService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.medicineService.getMedicines().subscribe({
      next: (data) => {
        this.medicines = data;
        this.dataSource.data = this.medicines;
      },
      error: (err) => {
        console.error("Error fetching medicines:", err);
      },
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onMedicineClick(id: string) {
    this.selectedMedicineId = id;
    console.log("Medicine ID:", this.selectedMedicineId);
  }
}
