import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
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
  selector: "app-update-appointment",
  templateUrl: "./update-appointment.component.html",
  styleUrls: ["./update-appointment.component.scss"],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class UpdateAppointmentComponent implements OnInit, OnChanges {
  @Output() previewVisible = new EventEmitter<boolean>();
  @Input() appointmentId: string = ""; 
  @Output() reloadData = new EventEmitter<void>();
  addAppointment: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private snackbar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.addAppointment = this.fb.group({
      patientName: ["", Validators.required],
      phoneNumber: ["", [Validators.required, Validators.minLength(9)]],
      appointmentDate: ["", Validators.required],
      notes: ["", Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["appointmentId"] && this.appointmentId) {
      this.appointmentService
        .getAppointmentById(this.appointmentId)
        .subscribe((response) => {
          if (response.success) {
            this.addAppointment.patchValue({
              patientName: response.data.patientName,
              phoneNumber: response.data.phoneNumber,
              appointmentDate: response.data.appointmentDate,
              notes: response.data.notes,
            });
            console.log(this.addAppointment.value);
          } else {
            console.error("Appointment not found");
          }
        });
    }
  }

  submit() {
    console.log("Form Value:", this.addAppointment.value);
    console.log("Form Valid:", this.addAppointment.valid);
  
    if (this.addAppointment.valid) {
      const updatedAppointment = this.addAppointment.value;
      console.log("Updated Appointment:", updatedAppointment);
      this.appointmentService.updateAppointment(this.appointmentId, updatedAppointment).subscribe(
        (response) => {
          if (response.success) {
            this.snackbar.show( response.message);
            this.reloadData.emit();
            this.changeVisible();
            this.previewVisible.emit(false);
          } else {
            this.snackbar.show( response.message);
          }
        },
        (error) => {
          console.error("Error updating appointment:", error);
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
