import { Component, OnInit } from "@angular/core";

import { LogoutService } from "src/services/logout.service";
import { BackendService } from "src/services/backend.service";
import { RedirectService } from "src/services/redirect.service";
import { PharmacyProfile } from "src/app/models/PharmacyProfile";

@Component({
  selector: "app-pharmacy",
  templateUrl: "./pharmacy.component.html",
  styleUrls: ["./pharmacy.component.css"],
})
export class PharmacyComponent implements OnInit {
  pharmacyData: PharmacyProfile = new PharmacyProfile();
  pharmacyId: number;
  name: string;
  pharmaPhone: string;
  pharmaType: string;
  pharmaAddress: string;
  pharmaPincode: number;
  balance: number;
  orders: number;
  isSidebarActive = false;

  constructor(
    private logoutService: LogoutService,
    private backendService: BackendService,
    private redirectService: RedirectService
  ) {}

  ngOnInit(): void {
    this.pharmacyProfile();
  }

  pharmacyProfile(): void {
    const pharmacyProfileStored = JSON.parse(
      localStorage.getItem("pharmacyprofile")
    );
    if (pharmacyProfileStored != null) {
      this.pharmacyData = pharmacyProfileStored.pharmacyprofile;
    } else {
      this.getPharmacyProfile();
    }
  }

  getPharmacyProfile(): void {
    const userInfoStored = JSON.parse(localStorage.getItem("userinfo"));
    if (userInfoStored != null) {
      this.pharmacyId = userInfoStored.userinfo.user_id;
      this.backendService.getPharmacy(this.pharmacyId).subscribe((response) => {
        if (response.status === "Success") {
          this.pharmacyData = {
            name: userInfoStored.userinfo.user_name,
            phone: response.data.user_info.pharma_phone,
            type: response.data.user_info.pharma_type,
            address: response.data.user_info.pharma_address,
            pincode: response.data.user_info.pharma_pincode,
            balance: response.data.user_info.balance,
            orders: response.data.user_info.orders,
          };
          localStorage.setItem(
            "pharmacyprofile",
            JSON.stringify({ pharmacyprofile: this.pharmacyData })
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
          userType: "pharmacy",
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
