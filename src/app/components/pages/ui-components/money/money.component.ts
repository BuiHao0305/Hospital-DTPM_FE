import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MoneyService } from "src/app/components/services/money.service";

@Component({
  selector: "app-money",
  templateUrl: "./money.component.html",
  styleUrls: ["./money.component.scss"],
  standalone: true,
  imports: [MatPaginatorModule, FormsModule, CommonModule, MatTableModule],
})
export class MoneyComponent implements OnInit {
  totalIncome: number = 0; // Example total income (VND)
  totalExpenses: number = 0; // Example total expenses (VND)
  balance: number = this.totalIncome - this.totalExpenses;

  totalCost: number; 

  displayedColumns: string[] = ['description', 'amount', 'date'];
  transactions = [
  ];

  constructor(private moneyService: MoneyService) {}

  ngOnInit(): void {
    this.moneyService.getTotalCost().subscribe(
      (data) => {
        this.totalIncome = data.totalcost;
        console.log('Total cost:', this.totalIncome);
        this.updateBalance()
      },
      (error) => {
        console.error('Error fetching total cost:', error);
      }
    );
  }
  updateBalance(): void {
    this.balance = this.totalIncome - this.totalExpenses;
  }
}
