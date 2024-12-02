import { Routes } from "@angular/router";
import { AppointmentComponent } from "./appointment/appointment.component";
import { DoctorComponent } from "./doctor/doctor.component";
import { MedicineComponent } from "./medicine/medicine.component";
import { PrescriptionComponent } from "./prescription/prescription.component";
import { AddMedicineComponent } from "src/app/shared/enviroment/component/add-medicine/add-medicine.component";


export const UiComponentsRoutes: Routes = [
  {
    path: "",
    children: [
      { path: "appointment", component: AppointmentComponent },
      { path: "doctor", component: DoctorComponent },
      { path: "medicine", component: MedicineComponent },
      { path: "prescription", component: PrescriptionComponent },
      { path:"add-medicine",component:AddMedicineComponent}
    ],
  },
];
