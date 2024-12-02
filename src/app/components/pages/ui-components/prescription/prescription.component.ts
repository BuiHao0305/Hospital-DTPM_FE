import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
export interface Prescription {
  patientName: string;
  medicinePurchases: any[]; 
  consultationFee: number;
  totalCost: number;
}
@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
  standalone: true,
  imports:[FormsModule,ReactiveFormsModule]
})
export class PrescriptionComponent implements OnInit {

  prescriptionForm: FormGroup;

  constructor(private fb: FormBuilder, ) {}

  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      patientName: ['', Validators.required],
      medicinePurchases: this.fb.array([]), 
      consultationFee: [0, [Validators.required, Validators.min(0)]],
      totalCost: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addMedicinePurchase() {
   
  }

  submit() {
    
  }

}
