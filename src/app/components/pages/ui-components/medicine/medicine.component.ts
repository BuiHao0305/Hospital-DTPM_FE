import { Component, OnInit, ViewChild } from "@angular/core";
import { MedicineService } from "src/app/components/services/medicine.service";
import { AddMedicineComponent } from "src/app/shared/enviroment/component/add-medicine/add-medicine.component";
import { MedicineCategoryPipe } from "src/app/shared/pipe/medicine.pipe";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  imports: [AddMedicineComponent,MedicineCategoryPipe],
})
export class MedicineComponent implements OnInit {
  showChild = false;
  medicines: Medicine[] = [];
  displayedColumns: string[] = ['name', 'price', 'description', 'quantity', 'category'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private medicineService: MedicineService) {
    
  }
  ngOnInit() {
    this.getMedicines();
  }
  getMedicines() {
    this.medicineService.getMedicines().subscribe(
      (data) => {
        this.medicines = data;
        console.log('Medicines:', this.medicines);  
      },
      (error) => {
        console.error('Error fetching medicines:', error);
      }
    );
  }
 

  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
  }
}
