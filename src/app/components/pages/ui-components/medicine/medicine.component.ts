import { Component, OnInit } from "@angular/core";
import { AddMedicineComponent } from "src/app/shared/enviroment/component/add-medicine/add-medicine.component";


export interface Medicine {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
  // Có thể thêm các thuộc tính khác nếu cần
}
@Component({
  selector: "app-medicine",
  templateUrl: "./medicine.component.html",
  styleUrls: ["./medicine.component.scss"],
  standalone: true,
  imports: [AddMedicineComponent],
})
export class MedicineComponent implements OnInit {
  showChild = false;
  medicines: Medicine[] = [];
  constructor() {
    this.medicines = [
      {
        id: "1",
        name: "Paracetamol",
        price: 10.5,
        description: "Pain reliever",
        quantity: 50,
      },
      {
        id: "2",
        name: "Ibuprofen",
        price: 15.0,
        description: "Anti-inflammatory",
        quantity: 30,
      },
      {
        id: "3",
        name: "Aspirin",
        price: 12.0,
        description: "Used to reduce fever",
        quantity: 100,
      },
      {
        id: "1",
        name: "Paracetamol",
        price: 10.5,
        description: "Pain reliever",
        quantity: 60,
      },
      {
        id: "2",
        name: "Ibuprofen",
        price: 15.0,
        description: "Anti-inflammatory",
        quantity: 70,
      },
      {
        id: "3",
        name: "Aspirin",
        price: 12.0,
        description: "Used to reduce fever",
        quantity: 99,
      },
      {
        id: "1",
        name: "Paracetamol",
        price: 10.5,
        description: "Pain reliever",
        quantity: 12,
      },
      {
        id: "2",
        name: "Ibuprofen",
        price: 15.0,
        description: "Anti-inflammatory",
        quantity: 45,
      },
      {
        id: "3",
        name: "Aspirin",
        price: 12.0,
        description: "Used to reduce fever",
        quantity: 100,
      },
      {
        id: "1",
        name: "Paracetamol",
        price: 10.5,
        description: "Pain reliever",
        quantity: 50,
      },
      {
        id: "2",
        name: "Ibuprofen",
        price: 15.0,
        description: "Anti-infla",
        quantity: 30,
      },
      {
        id: "3",
        name: "Aspirin",
        price: 12.0,
        description: "Used to reduce fever",
        quantity: 100,
      },
    ];
  }

  ngOnInit() {}
  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
  }
}
