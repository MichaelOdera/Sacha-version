import { Component, OnInit } from "@angular/core";

import { PatientProfile } from "src/app/models/PatientProfile";
import { BackendService } from "src/services/backend.service";
import { LogoutService } from "src/services/logout.service";
import { RedirectService } from "src/services/redirect.service";

@Component({
  selector: "app-pat-profile",
  templateUrl: "./pat-profile.component.html",
  styleUrls: ["./pat-profile.component.css"],
})
export class PatProfileComponent implements OnInit {
  patientProfileData: PatientProfile = new PatientProfile();
  patientId: number;
  location: number;
  age: number;
  weight: number;
  heartRate: number;
  temperature: number;
  dob: string;
  isSidebarActive = false;

  constructor(
    private backendService: BackendService,
    private logoutService: LogoutService,
    private redirectService: RedirectService
  ) {}

  ngOnInit(): void {
    this.patientProfile();
  }

  patientProfile(): void {
    const patientProfileStored = JSON.parse(
      localStorage.getItem("patientprofile")
    );
    if (patientProfileStored != null) {
      this.patientProfileData = patientProfileStored.patientprofile;
    } else {
      this.getPatientProfile();
    }
  }

  getPatientProfile(): void {
    const userInfoStored = JSON.parse(localStorage.getItem("userinfo"));
    if (userInfoStored != null) {
      this.patientId = userInfoStored.userinfo.user_id;
      this.backendService
        .patientProfile(this.patientId)
        .subscribe((response) => {
          if (response.status === "Success") {
            this.patientProfileData = {
              name: userInfoStored.userinfo.user_name,
              address: response.data.user_info.patient_location,
              heartRate: response.data.user_info.patient_heart_rate,
              weight: response.data.user_info.patient_weight,
              temperature: response.data.user_info.patient_temperature,
              pincode: response.data.user_info.patient_pincode,
              age: response.data.user_info.patient_age,
            };
            localStorage.setItem(
              "patientprofile",
              JSON.stringify({ patientprofile: this.patientProfileData })
            );
          }
        });
    }
  }

  updateProfile(): void {
    localStorage.setItem(
      "updateprofile",
      JSON.stringify({
        updateprofile: {
          userType: "patient",
          edit: true,
        },
      })
    );
    this.redirectService.redirect("../updateprofile");
  }

  logout(): void {
    this.logoutService.logout();
  }

  toggleSidebar(): void {
    if (this.isSidebarActive) {
      document.getElementById("sidebar").classList.remove("active");
      document.getElementById("sidebarCollapse").classList.remove("active");
      this.isSidebarActive = false;
    } else {
      document.getElementById("sidebarCollapse").classList.add("active");
      document.getElementById("sidebar").classList.add("active");
      this.isSidebarActive = true;
    }
  }
}
