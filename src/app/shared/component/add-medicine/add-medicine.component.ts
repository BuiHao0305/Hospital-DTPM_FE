import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MedicineService } from "src/app/components/services/medicine.service";
import { SnackbarService } from "../../snackbar/snackbar.service";

@Component({
  selector: "app-add-medicine",
  templateUrl: "./add-medicine.component.html",
  styleUrls: ["./add-medicine.component.scss"],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class AddMedicineComponent implements OnInit {
  showChild = false;

  @Output() previewVisible = new EventEmitter<boolean>();
  @Output() reloadData = new EventEmitter<void>();

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }
  loading = false;
  medicineForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.medicineForm = this.fb.group({
      name: ["", [Validators.required]],
      price: [0, [Validators.required, Validators.min(999)]],
      description: ["", [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      category: [0],
    });
  }
  onSubmit() {
    if (this.medicineForm.valid) {
      this.loading = true;
      const newMedicine = this.medicineForm.value;

      this.medicineService.addMedicine(newMedicine).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackbar.show(response.message); 
            this.loading = false;
            this.reloadData.emit();
            this.changeVisible();
            this.previewVisible.emit(false);
          } else {
            this.snackbar.show(response.message); 
            this.loading = false;
          }
        },
        error: (err) => {
          this.snackbar.show(err.message);
          this.loading = false;
        },
      });
    } else {
      console.error("Form is invalid");
    }
  }
  changeVisible() {
    this.previewVisible.emit(false);
  }
}
