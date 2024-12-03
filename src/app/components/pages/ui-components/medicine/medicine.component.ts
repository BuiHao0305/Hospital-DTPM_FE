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
  selectedMedicineId ='';
  medicines: Medicine[] = [
    {
      id: "1",
      name: "Paracetamol",
      price: 10,
      description: "Pain reliever and fever reducer",
      quantity: 100,
      category: 1,
    },
    {
      id: "2",
      name: "Ibuprofen",
      price: 15,
      description: "Non-steroidal anti-inflammatory drug",
      quantity: 50,
      category: 2,
    },
    {
      id: "3",
      name: "Amoxicillin",
      price: 20,
      description: "Antibiotic used for bacterial infections",
      quantity: 75,
      category: 1,
    },
    {
      id: "4",
      name: "Cetirizine",
      price: 8,
      description: "Antihistamine for allergies",
      quantity: 120,
      category: 3,
    },
    {
      id: "5",
      name: "Metformin",
      price: 12,
      description: "Used to treat type 2 diabetes",
      quantity: 60,
      category: 2,
    },
    {
      id: "6",
      name: "Omeprazole",
      price: 18,
      description: "Reduces stomach acid",
      quantity: 80,
      category: 1,
    },
    {
      id: "7",
      name: "Aspirin",
      price: 5,
      description: "Pain reliever and blood thinner",
      quantity: 200,
      category: 2,
    },
    {
      id: "8",
      name: "Ciprofloxacin",
      price: 25,
      description: "Antibiotic for bacterial infections",
      quantity: 40,
      category: 1,
    },
    {
      id: "9",
      name: "Loratadine",
      price: 10,
      description: "Antihistamine for allergies",
      quantity: 110,
      category: 3,
    },
    {
      id: "10",
      name: "Simvastatin",
      price: 15,
      description: "Used to lower cholesterol",
      quantity: 90,
      category: 2,
    },
  ];

  dataSource = new MatTableDataSource<Medicine>(this.medicines);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.getMedicines();
  }

  getMedicines() {
    this.dataSource.data = this.medicines;
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
