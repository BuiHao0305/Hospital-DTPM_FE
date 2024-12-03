import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
  selector: "app-update-medicine",
  templateUrl: "./update-medicine.component.html",
  styleUrls: ["./update-medicine.component.scss"],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class UpdateMedicineComponent implements OnInit {
  showChildUpdate = false;

  @Output() previewVisible = new EventEmitter<boolean>();
  @Input() medicineId = "";
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
      const updatedMedicine = this.medicineForm.value;
      this.loading = true;
      this.medicineService
        .updateMedicine(this.medicineId, updatedMedicine)
        .subscribe(
          (response) => {
            if (response.success) {
              this.snackbar.show(response.message);
              this.reloadData.emit();
              this.changeVisible();
              this.previewVisible.emit(false);
              this.loading = false;
            } else {
              console.error("Lỗi khi cập nhật thuốc:", response.message);
              this.loading = false;
              alert("Cập nhật thuốc thất bại: " + response.message);
            }
          },
          (error) => {
            console.error("Lỗi khi cập nhật thuốc:", error);
            this.loading = false;
            alert("Đã có lỗi xảy ra khi cập nhật thuốc. Vui lòng thử lại!");
          }
        );
    } else {
      console.error("Form is invalid");
      this.loading = false;
      alert("Form không hợp lệ. Vui lòng kiểm tra lại.");
    }
  }
  ngOnChanges() {
    if (this.medicineId) {
      this.medicineService.getMedicineById(this.medicineId).subscribe(
        (medicine) => {
          // Cập nhật giá trị vào form
          this.medicineForm.patchValue({
            name: medicine.name,
            price: medicine.price,
            description: medicine.description,
            quantity: medicine.quantity,
            category: medicine.category,
          });
        },
        (error) => {
          console.error("Lỗi khi lấy thông tin thuốc:", error);
        }
      );
    }
  }
  changeVisible() {
    this.previewVisible.emit(false);
  }
}
