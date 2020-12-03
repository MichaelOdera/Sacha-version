import { Component, OnInit } from "@angular/core";

import { BackendService } from "src/services/backend.service";
import { RedirectService } from "src/services/redirect.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userType: string;
  nameInput: string;
  phone: string;
  password: string;

  constructor(
    private backendService: BackendService,
    private redirectService: RedirectService
  ) {}

  ngOnInit(): void {}

  register(): void {
    const data = {
      userType: this.userType,
      nameInput: this.nameInput,
      phone: this.phone,
      password: this.password,
      verified: false
    };
    this.backendService.register(data).subscribe((registerResponse) => {
      if (registerResponse.status === "Registration successful") {
        localStorage.setItem(
          "userid",
          JSON.stringify({ userid: registerResponse.data.user_id })
        );
        localStorage.setItem(
          "usertype",
          JSON.stringify({ usertype: registerResponse.data.user_type })
        );
        localStorage.setItem(
          "token",
          JSON.stringify({ token: registerResponse.data.token })
        );
        this.redirectService.redirect("../updateprofile");
      }
    });
  }

}
