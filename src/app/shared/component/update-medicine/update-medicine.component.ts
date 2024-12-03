import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule]
})
export class UpdateMedicineComponent implements OnInit {

  showChildUpdate = false;

  @Output() previewVisible = new EventEmitter<boolean>(); 
  @Input() medicineId = ''; 
  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }
  loading = false;
  medicineForm!: FormGroup;
  constructor( private fb:FormBuilder) { }

  ngOnInit() {
    this.medicineForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(999)]],  
      description: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      category: [0]
    });
  }
  onSubmit(){
    if (this.medicineId) {
      console.log('Updating medicine with ID:', this.medicineId);
    }
    if (this.medicineForm.valid) {
      const newMedicine = this.medicineForm.value;
      console.log('New Medicine:', newMedicine);
     
    } else {
      console.error('Form is invalid');
    }
  }
  changeVisible() {
    this.previewVisible.emit(false);
  }

}
