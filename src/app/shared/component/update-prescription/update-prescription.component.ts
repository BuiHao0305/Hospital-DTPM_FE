import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MedicineService } from "src/app/components/services/medicine.service";
import { PrescriptionService } from "src/app/components/services/prescription.service";
import { SnackbarService } from "../../snackbar/snackbar.service";

@Component({
  selector: "app-update-prescription",
  templateUrl: "./update-prescription.component.html",
  styleUrls: ["./update-prescription.component.scss"],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class UpdatePrescriptionComponent implements OnInit {
  showChild = false;
  @Output() reloadData = new EventEmitter<void>();
  @Input() presciptionId = "";
  @Output() previewVisible = new EventEmitter<boolean>();

  prescriptionForm: FormGroup;

  medicinesList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private medicineService: MedicineService,
    private snackbar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      patientName: ["", Validators.required],
      medicinePurchases: this.fb.array([]), // Dùng chính prescriptionForm
      consultationFee: [0, [Validators.required, Validators.min(1000)]],
      phoneNumber: ["", [Validators.required, Validators.minLength(9)]],
      appointmentDate: ["", Validators.required],
    });
    this.loadMedicine();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["presciptionId"] && this.presciptionId) {
      console.log("presciptionId", this.presciptionId);
      this.loadPrescriptionData(this.presciptionId);
    }
  }
  loadMedicine(){
    this.medicineService.getMedicines().subscribe(
      (data: any) => {
        this.medicinesList = data; // Cập nhật danh sách thuốc
        console.log(this.medicinesList)
      },
      (error) => {
        console.error('Error fetching medicines', error);
      }
    );
  }
  loadPrescriptionData(id: string): void {
    this.prescriptionService.getPrescriptionById(id).subscribe(
      (data: any) => {
        console.log("Prescription data", data);
        this.updateForm(data);
      },
      (error) => {
        console.error("Error fetching prescription data", error);
      }
    );
  }

  updateForm(data: any): void {
    this.prescriptionForm.patchValue({
      patientName: data.patientName,
      phoneNumber: data.phoneNumber,
      appointmentDate: data.appointmentDate,
      consultationFee: data.consultationFee,
    });

    const medicinePurchases = this.prescriptionForm.get(
      "medicinePurchases"
    ) as FormArray;

    while (medicinePurchases.length) {
      medicinePurchases.removeAt(0);
    }

    data.medicinePurchases?.forEach((medicine: any) => {
      medicinePurchases.push(
        this.fb.group({
          medicineId: [medicine.id, Validators.required],
          name: [medicine.name, Validators.required],
          quantity: [
            medicine.quantity,
            [Validators.required, Validators.min(1)],
          ],
        })
      );
    });
  }
  addMedicinePurchase() {}

  submit(): void {
    if (this.prescriptionForm.valid) {
      const prescriptionId = this.presciptionId; 
      const prescriptionData = this.prescriptionForm.value; 
  
      console.log('Sending Prescription Data:', prescriptionData);
  
      this.prescriptionService.addMedicinesToPrescription(prescriptionId, prescriptionData).subscribe(
        (response) => {
          this.snackbar.show('Prescription updated successfully!');
          this.reloadData.emit();
          this.changeVisible();
          this.previewVisible.emit(false);
        },
        (error) => {
          console.error('Error updating prescription:', error);
          alert('Failed to update prescription.');
        }
      );
    } else {
      console.error('Form is invalid');
      alert('Please fill in the form correctly.');
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
    return this.prescriptionForm.get("medicinePurchases") as FormArray;
  }

  addMedicine(): void {
    this.medicinePurchases.push(
      this.fb.group({
        medicineId: [null, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeMedicine(index: number): void {
    this.medicinePurchases.removeAt(index);
  }

  getMedicineDetails(medicineId: number) {
    return this.medicinesList.find((medicine) => medicine.medicineId === medicineId);
  }
  
}
