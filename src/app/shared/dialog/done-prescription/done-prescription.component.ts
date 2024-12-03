import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-done-prescription',
  templateUrl: './done-prescription.component.html',
  styleUrls: ['./done-prescription.component.scss'],
  standalone: true,
  imports: [MatDialogModule], 
})
export class DonePrescriptionComponent  {

   constructor(public dialogRef: MatDialogRef<DonePrescriptionComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
