import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-medicine',
  templateUrl:'./add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule]
})
export class AddMedicineComponent implements OnInit {

  showChild = false;

  @Output() previewVisible = new EventEmitter<boolean>(); 

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }
  loading = false;
  medicineForm!: FormGroup;
  constructor( private fb:FormBuilder) { }

  ngOnInit() {
    this.medicineForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['',[Validators.required]],
      description: ['',[Validators.required]],
      quantity: ['',[Validators.required]]
    })
  }
  onSubmit(){

  }
  changeVisible() {
    this.previewVisible.emit(false);
  }

}
