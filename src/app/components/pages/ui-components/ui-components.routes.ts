import { Routes } from "@angular/router";
import { AppointmentComponent } from "./appointment/appointment.component";
import { DoctorComponent } from "./doctor/doctor.component";
import { MedicineComponent } from "./medicine/medicine.component";
import { PrescriptionComponent } from "./prescription/prescription.component";
import { AddMedicineComponent } from "src/app/shared/component/add-medicine/add-medicine.component";
import { MoneyComponent } from "./money/money.component";
import { AddPrescriptionComponent } from "src/app/shared/component/add-prescription/add-prescription.component";
import { AddAppoinmentComponent } from "src/app/shared/component/add-appoinment/add-appoinment.component";
import { UpdateAppointmentComponent } from "src/app/shared/component/update-appointment/update-appointment.component";
import { UpdatePrescriptionComponent } from "src/app/shared/component/update-prescription/update-prescription.component";

export const UiComponentsRoutes: Routes = [
  {
    path: "",
    children: [
      { path: "appointment", component: AppointmentComponent },
      { path: "doctor", component: DoctorComponent },
      { path: "medicine", component: MedicineComponent },
      { path: "prescription", component: PrescriptionComponent },
      { path: "add-medicine", component: AddMedicineComponent },
      { path: "statistics", component: MoneyComponent },
      { path: "add", component: UpdatePrescriptionComponent },
    ],
  },
];
