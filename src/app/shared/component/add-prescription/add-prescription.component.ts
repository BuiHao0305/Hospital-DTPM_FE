import { Prescription } from "./../../../components/pages/ui-components/prescription/prescription.component";
import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AppointmentService } from "src/app/components/services/appointment.service";
import { PrescriptionService } from "src/app/components/services/prescription.service";
import { SnackbarService } from "../../snackbar/snackbar.service";

@Component({
  selector: "app-add-prescription",
  templateUrl: "./add-prescription.component.html",
  styleUrls: ["./add-prescription.component.scss"],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class AddPrescriptionComponent implements OnInit {
  showChild = false;
  appointments: any[] = [];
  selectedAppointment: any;
  @Output() previewVisible = new EventEmitter<boolean>();
  @Output() reloadData = new EventEmitter<void>();
  prescriptionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private prescriptionService: PrescriptionService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      patientName: ["", Validators.required],
      medicinePurchases: this.fb.array([]),
      consultationFee: [0, [Validators.required, Validators.min(1000)]],
      phoneNumber: ["", [Validators.required, Validators.minLength(9)]],
      appointmentDate: ["", Validators.required],
    });

    this.prescriptionService.getAppointments().subscribe((response: any) => {
      if (response.success) {
        this.appointments = response.data; // Gán dữ liệu vào appointments
      }
    });
  }
  onSelectAppointment(event: Event) {
    const target = event.target as HTMLSelectElement; // Ép kiểu target là HTMLSelectElement
    const value = target.value; // Lấy giá trị của select

    if (value) {
      const appointment = this.appointments.find((a) => a.id === value);
      if (appointment) {
        this.selectedAppointment = appointment;
        this.prescriptionForm.patchValue({
          patientName: appointment.patientName,
          phoneNumber: appointment.phoneNumber,
          appointmentDate: appointment.appointmentDate,
        });
      }
    }
  }

  addMedicinePurchase() {}

  submit() {
    if (this.prescriptionForm.valid) {
      const newPrescription = this.prescriptionForm.value;
      console.log("New Prescription:", newPrescription);

      this.prescriptionService.createPrescription(newPrescription).subscribe(
        (response) => {
          this.snackbar.show("Tạo hóa đơn thành công");
          this.reloadData.emit();
          this.changeVisible();
          this.previewVisible.emit(false);
        },
        (error) => {
          this.snackbar.show("lỗi khi tạo hóa đơn");
        }
      );
    } else {
      console.error("Form is invalid");
    }
  }
  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }
  changeVisible() {
    this.previewVisible.emit(false);
  }
}
