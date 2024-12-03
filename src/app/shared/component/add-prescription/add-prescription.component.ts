import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-add-prescription",
  templateUrl: "./add-prescription.component.html",
  styleUrls: ["./add-prescription.component.scss"],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class AddPrescriptionComponent implements OnInit {
  showChild = false;

  @Output() previewVisible = new EventEmitter<boolean>();

  prescriptionForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      patientName: ["", Validators.required],
      medicinePurchases: this.fb.array([]),
      consultationFee: [0, [Validators.required, Validators.min(1000)]],
    });
  }

  addMedicinePurchase() {}

  submit() {
    console.log('Form Value:', this.prescriptionForm.value);
    console.log('Form Valid:', this.prescriptionForm.valid);
  
    if (this.prescriptionForm.valid) {
      const newPrescription = this.prescriptionForm.value;
      console.log('New Prescription:', newPrescription);
    } else {
      console.error('Form is invalid');
    }
  }
  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }
  changeVisible() {
    this.previewVisible.emit(false);
  }
}
