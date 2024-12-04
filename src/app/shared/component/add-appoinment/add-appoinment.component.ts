import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-appoinment',
  templateUrl: './add-appoinment.component.html',
  styleUrls: ['./add-appoinment.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class AddAppoinmentComponent implements OnInit {

  showChild = false;

  @Output() previewVisible = new EventEmitter<boolean>();

  addAppointment: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addAppointment = this.fb.group({
      patientName: ["", Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      appointmentDate:['',Validators.required],
      notes: ['',Validators.required]
    });
  }

  addMedicinePurchase() {}

  submit() {
    console.log('Form Value:', this.addAppointment.value);
    console.log('Form Valid:', this.addAppointment.valid);
    if (this.addAppointment.valid) {
      const newPrescription = this.addAppointment.value;
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
