import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { PatProfileComponent } from "./components/pat-profile/pat-profile.component";
import { DocProfileComponent } from "./components/doc-profile/doc-profile.component";
import { QuizComponent } from "./components/quiz/quiz.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { CheckupComponent } from './components/checkup/checkup.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { SelectDoctorComponent } from './components/select-doctor/select-doctor.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: PatProfileComponent },
  { path: "docprofile", component: DocProfileComponent },
  { path: "quiz", component: QuizComponent },
  { path: "orders", component: OrdersComponent },
  { path: "pharmacy", component: PharmacyComponent },
  { path: "updateprofile", component: UpdateProfileComponent },
  { path: "checkup", component: CheckupComponent },
  { path: "appointment", component: AppointmentComponent },
  { path: "selectdoctor", component: SelectDoctorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
