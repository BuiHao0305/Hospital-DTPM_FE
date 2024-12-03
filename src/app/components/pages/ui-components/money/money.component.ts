import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "app-money",
  templateUrl: "./money.component.html",
  styleUrls: ["./money.component.scss"],
  standalone: true,
  imports: [MatPaginatorModule, FormsModule, CommonModule, MatTableModule],
})
export class MoneyComponent implements OnInit {
  totalIncome: number = 15000000; // Example total income (VND)
  totalExpenses: number = 8000000; // Example total expenses (VND)
  balance: number = this.totalIncome - this.totalExpenses;

  displayedColumns: string[] = ["description", "amount", "date"];
  transactions = [
    { description: "Consultation Fees", amount: 5000000, date: new Date() },
    { description: "Medicine Sales", amount: 3000000, date: new Date() },
    { description: "Staff Salaries", amount: -2000000, date: new Date() },
    { description: "Office Rent", amount: -3000000, date: new Date() },
  ];

  constructor() {}

  ngOnInit(): void {}
}
