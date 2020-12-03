import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { PatProfileComponent } from './components/pat-profile/pat-profile.component';
import { DocProfileComponent } from './components/doc-profile/doc-profile.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { OrdersComponent } from './components/orders/orders.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { PharmacyComponent } from './components/pharmacy/pharmacy.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { CheckupComponent } from './components/checkup/checkup.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { SelectDoctorComponent } from './components/select-doctor/select-doctor.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PatProfileComponent,
    DocProfileComponent,
    QuizComponent,
    NavbarComponent,
    OrdersComponent,
    PharmacyComponent,
    UpdateProfileComponent,
    CheckupComponent,
    AppointmentComponent,
    SelectDoctorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2TelInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
