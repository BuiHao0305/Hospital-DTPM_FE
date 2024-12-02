import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.scss'],
  standalone: true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule]
})
export class AddPrescriptionComponent implements OnInit {

  prescriptionForm: FormGroup;

  constructor(private fb: FormBuilder, ) {}

  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      patientName: ['', Validators.required],
      medicinePurchases: this.fb.array([]), 
      consultationFee: [0, [Validators.required, Validators.min(1000)]],
     
    });
  }

  addMedicinePurchase() {
   
  }

  submit() {
    
  }


}
