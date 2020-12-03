import { Component, OnInit } from "@angular/core";

import { BackendService } from "src/services/backend.service";
import { RedirectService } from "src/services/redirect.service";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.css"],
})
export class UpdateProfileComponent implements OnInit {
  userType: string;
  isPatient: boolean;
  isDoctor: boolean;
  isPharmacy: boolean;
  userId: number;
  patientDob: Date;
  patientAge: number;
  patientLocation: string;
  patientWeight: number;
  patientHeartRate: number;
  patientTemperature: number;
  patientPincode: string;
  doctorExpi: number;
  doctorDep: string;
  doctorAos: string;
  doctorQual: string;
  doctorAddress: string;
  doctorPincode: string;
  pharmacyAddress: string;
  pharmacyPincode: string;
  pharmacyBalance: number;
  pharmacyOrders: number;

  constructor(
    private backendService: BackendService,
    private redirectService: RedirectService
  ) {}

  ngOnInit(): void {
    this.renderUpdateProfile();
  }

  renderUpdateProfile(): void {
    const updateProfileStored = JSON.parse(
      localStorage.getItem("updateprofile")
    );
    if (updateProfileStored != null && updateProfileStored.updateprofile.edit) {
      this.userType = updateProfileStored.updateprofile.userType;
      this.isPatient = this.userType === "patient";
      this.isDoctor = this.userType === "doctor";
      this.isPharmacy = this.userType === "pharmacy";
      if (this.isPatient) {
        let patientProfileStored = JSON.parse(
          localStorage.getItem("patientprofile")
        );
        if (patientProfileStored != null) {
          patientProfileStored = patientProfileStored.patientprofile;
          this.patientLocation = patientProfileStored.address;
          this.patientHeartRate = patientProfileStored.heartRate;
          this.patientAge = patientProfileStored.age;
          this.patientWeight = patientProfileStored.weight;
          this.patientTemperature = patientProfileStored.temperature;
          this.patientPincode = patientProfileStored.pincode;
        }
      }
      if (this.isDoctor) {
        let doctorProfileStored = JSON.parse(
          localStorage.getItem("doctorprofile")
        );
        if (doctorProfileStored != null) {
          doctorProfileStored = doctorProfileStored.doctorprofile;
          this.doctorExpi = doctorProfileStored.expi;
          this.doctorDep = doctorProfileStored.dep;
          this.doctorAos = doctorProfileStored.aos;
          this.doctorQual = doctorProfileStored.qual;
          this.doctorAddress = doctorProfileStored.address;
          this.doctorPincode = doctorProfileStored.pincode;
        }
      }
      if (this.isPharmacy) {
        let pharmacyProfileStored = JSON.parse(
          localStorage.getItem("pharmacyprofile")
        );
        if (pharmacyProfileStored != null) {
          pharmacyProfileStored = pharmacyProfileStored.pharmacyprofile;
          this.pharmacyAddress = pharmacyProfileStored.address;
          this.pharmacyPincode = pharmacyProfileStored.pincode;
          this.pharmacyBalance = pharmacyProfileStored.balance;
          this.pharmacyOrders = pharmacyProfileStored.orders;
        }
      }
    } else {
      const userTypeStored = JSON.parse(localStorage.getItem("usertype"));
      if (userTypeStored != null) {
        this.userType = userTypeStored.usertype;
        this.isPatient = this.userType === "patient";
        this.isDoctor = this.userType === "doctor";
        this.isPharmacy = this.userType === "pharmacy";
      }
    }
  }

  getUserId(): number {
    // From registration
    const userIdStored = JSON.parse(localStorage.getItem("userid"));
    if (userIdStored != null) {
      return userIdStored.userid;
      // From login
    } else {
      const userInfoStored = JSON.parse(localStorage.getItem("userinfo"));
      if (userInfoStored != null) {
        return userInfoStored.userinfo.user_id;
      }
    }
  }

  updatePatientProfile(): void {
    this.userId = this.getUserId();
    const updatePatientProfileData = {
      patientLocation: this.patientLocation,
      patientDob: this.patientDob,
      patientAge: this.patientAge,
      patientWeight: this.patientWeight,
      patientHeartRate: this.patientHeartRate,
      patientTemperature: this.patientTemperature,
      patientPincode: this.patientPincode,
    };

    this.backendService
      .updatePatientProfile(this.userId, updatePatientProfileData)
      .subscribe((updateProfileResponse) => {
        if (updateProfileResponse.status === "Edit successfull") {
          this.backendService
            .userInfo(this.userId)
            .subscribe((userInfoResponse) => {
              const patientProfileData = {
                name: userInfoResponse.data.user_info.user_name,
                address: updateProfileResponse.data.user_info.patient_location,
                heartRate: updateProfileResponse.data.user_info.patient_heart_rate,
                weight: updateProfileResponse.data.user_info.patient_weight,
                temperature:
                  updateProfileResponse.data.user_info.patient_temperature,
              };
              localStorage.setItem(
                "patientprofile",
                JSON.stringify({ patientprofile: patientProfileData })
              );
              localStorage.removeItem("updateprofile");
              this.redirectService.redirect("../profile");
            });
        }
      });
  }

  updateDoctorProfile(): void {
    this.userId = this.getUserId();
    const updateDoctorProfileData = {
      doctorExpi: this.doctorExpi,
      doctorDep: this.doctorDep,
      doctorAos: this.doctorAos,
      doctorQual: this.doctorQual,
      doctorAddress: this.doctorAddress,
      doctorPincode: this.doctorPincode,
    };

    this.backendService
      .updateDoctorProfile(this.userId, updateDoctorProfileData)
      .subscribe((updateProfileResponse) => {
        if (updateProfileResponse.status === "Edit successfull") {
          this.backendService
            .userInfo(this.userId)
            .subscribe((userInfoResponse) => {
              const doctorProfileData = {
                name: userInfoResponse.data.user_info.user_name,
                expi: updateProfileResponse.data.user_info.doctor_expi,
                dep: updateProfileResponse.data.user_info.doctor_dep,
                aos: updateProfileResponse.data.user_info.doctor_aos,
                qual: updateProfileResponse.data.user_info.doctor_qual,
                address: updateProfileResponse.data.user_info.doctor_address,
                pincode: updateProfileResponse.data.user_info.doctor_pincode,
              };
              localStorage.setItem(
                "doctorprofile",
                JSON.stringify({ doctorprofile: doctorProfileData })
              );
              localStorage.removeItem("updateprofile");
              this.redirectService.redirect("../docprofile");
            });
        }
      });
  }

  updatePharmacyProfile(): void {
    this.userId = this.getUserId();
    const updatePharmacyProfileData = {
      pharmacyType: "pharmacy",
      pharmacyAddress: this.pharmacyAddress,
      pharmacyPincode: this.pharmacyPincode,
      pharmacyBalance: this.pharmacyBalance,
      pharmacyOrders: this.pharmacyOrders,
    };

    this.backendService
      .updatePharmacyProfile(this.userId, updatePharmacyProfileData)
      .subscribe((updateProfileResponse) => {
        if (updateProfileResponse.status === "Edit successfull") {
          this.backendService
            .userInfo(this.userId)
            .subscribe((userInfoResponse) => {
              const pharmacyProfileData = {
                name: userInfoResponse.data.user_info.user_name,
                address: updateProfileResponse.data.user_info.pharma_address,
                pincode: updateProfileResponse.data.user_info.pharma_pincode,
                balance: updateProfileResponse.data.user_info.balance,
                orders: updateProfileResponse.data.user_info.orders,
              };
              localStorage.setItem(
                "pharmacyprofile",
                JSON.stringify({ pharmacyprofile: pharmacyProfileData })
              );
              localStorage.removeItem("updateprofile");
              this.redirectService.redirect("../pharmacy");
            });
        }
      });
  }
}
