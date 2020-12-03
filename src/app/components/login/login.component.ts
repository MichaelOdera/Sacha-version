import { Component, OnInit } from "@angular/core";

import { BackendService } from "src/services/backend.service";
import { RedirectService } from "src/services/redirect.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  phoneNumber: string;
  password: string;
  showError = false;

  constructor(
    private backendService: BackendService,
    private redirectService: RedirectService,
  ) {}

  ngOnInit(): void {}

  login(): void {
    const loginData = {
      phoneNumber: this.phoneNumber,
      password: this.password,
    };

    this.backendService.login(loginData).subscribe((loginResponse) => {
      this.showError = loginResponse.status === "Login failed";
      if (loginResponse.status === "Login sucessfull") {
        localStorage.setItem(
          "userinfo",
          JSON.stringify({ userinfo: loginResponse.data.user_info })
        );
        localStorage.setItem(
          "token",
          JSON.stringify({ token: loginResponse.data.token })
        );
        const userType = loginResponse.data.user_info.user_type;
        if (userType === "patient") {
          this.redirectService.redirect("../profile");
        } else if (userType === "doctor") {
          this.redirectService.redirect("../docprofile");
        } else if (userType === "pharmacy") {
          this.redirectService.redirect("../pharmacy");
        }
      }
    });
  }
}
