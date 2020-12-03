import { Component, OnInit } from '@angular/core';

import { LogoutService } from "src/services/logout.service";

@Component({
  selector: 'app-doc-profile',
  templateUrl: './doc-profile.component.html',
  styleUrls: ['./doc-profile.component.css']
})
export class DocProfileComponent implements OnInit {
  isSidebarActive = false;

  constructor(private logoutService: LogoutService) {}

  ngOnInit(): void {}

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
