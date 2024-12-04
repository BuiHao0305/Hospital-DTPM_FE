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
import { SnackbarService } from "../../snackbar/snackbar.service";

@Component({
  selector: "app-add-appoinment",
  templateUrl: "./add-appoinment.component.html",
  styleUrls: ["./add-appoinment.component.scss"],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class AddAppoinmentComponent implements OnInit {
  showChild = false;

  @Output() previewVisible = new EventEmitter<boolean>();
  @Output() reloadData = new EventEmitter<void>();
  addAppointment: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.addAppointment = this.fb.group({
      patientName: ["", Validators.required],
      phoneNumber: ["", [Validators.required, Validators.minLength(9)]],
      appointmentDate: ["", Validators.required],
      notes: ["", Validators.required],
    });
  }

  addMedicinePurchase() {}

  submit() {
    if (this.addAppointment.valid) {
      const newAppointment = this.addAppointment.value;
      this.appointmentService.addAppointment(newAppointment).subscribe(
        (response) => {
          if (response && response.message) {
            this.snackbar.show(response.message);
            this.reloadData.emit();
            this.changeVisible();
            this.previewVisible.emit(false);
          } else {
            this.snackbar.show("Appointment created successfully!");
          }
        },
        (error) => {
          console.error("Error creating appointment:", error);

          if (error && error.error && error.error.message) {
            this.snackbar.show(error.error.message);
          } else {
            this.snackbar.show("Error creating appointment");
          }
        }
      );
    }
  }
  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }
  changeVisible() {
    this.previewVisible.emit(false);
  }
}
