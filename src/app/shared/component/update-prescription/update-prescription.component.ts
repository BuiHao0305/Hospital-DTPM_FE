import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-update-prescription',
  templateUrl: './update-prescription.component.html',
  styleUrls: ['./update-prescription.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UpdatePrescriptionComponent implements OnInit {

  showChild = false;
  @Input() presciptionId = "";
  @Output() previewVisible = new EventEmitter<boolean>();

  prescriptionForm: FormGroup;

  medicinesList = [
    { id: 1, name: 'Paracetamol', description: 'Pain reliever', price: 10 },
    { id: 2, name: 'Ibuprofen', description: 'Anti-inflammatory', price: 15 },
    { id: 3, name: 'Amoxicillin', description: 'Antibiotic', price: 20 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      patientName: ["", Validators.required],
      medicinePurchases: this.fb.array([]), // Dùng chính prescriptionForm
      consultationFee: [0, [Validators.required, Validators.min(1000)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      appointmentDate: ['', Validators.required],
    });
  }
  ngOnChanges() {
    if (this.presciptionId) {
     
       console.log('appointmentId',this.presciptionId)
    }
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
  form: FormGroup;
  

  get medicinePurchases(): FormArray {
  return this.prescriptionForm.get('medicinePurchases') as FormArray;
}

  addMedicine(): void {
    this.medicinePurchases.push(
      this.fb.group({
        id: [null, Validators.required],
        name: [],
        quantity: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeMedicine(index: number): void {
    this.medicinePurchases.removeAt(index);
  }

  getMedicineDetails(id: number) {
    return this.medicinesList.find((medicine) => medicine.id === id);
  }

}
