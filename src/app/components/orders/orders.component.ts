import { Component, OnInit } from '@angular/core';

import { BackendService } from "src/services/backend.service";
import { Orders } from "src/app/models/Orders";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderData: Orders = new Orders();
  patientId: number;
  orderNumber: number;

  constructor(
    private backendService: BackendService) { }

  ngOnInit(): void {
  }

  order(): void {
    const orderStored = JSON.parse(
      localStorage.getItem("order")
    );
    if (orderStored != null) {
      this.orderData = orderStored.order;
    } else {
      this.getOrder();
    }
  }

  getOrder(): void {
    const userInfoStored = JSON.parse(localStorage.getItem("userinfo"));
    if (userInfoStored != null) {
      this.patientId = userInfoStored.userinfo.user_id;
      this.backendService.getOrder(this.patientId, this.orderNumber).subscribe((response) => {
        if (response.status === "Success") {
          this.orderData = {
            name: userInfoStored.userinfo.user_name,
            phone: response.data.user_info.pharma_phone,
            address: response.data.user_info.pharma_address,
            medication: response.data.user_info.pharma_medication,
            dosage: response.data.user_info.balance,
            time: response.data.user_info.time,
            orderNumber: response.data.user_info.orderNumber,
            pickUpDate: response.data.user_info.pickUpDate,
            pickUpContact: response.data.user_info.pickUpContact,
            pickUpLocation: response.data.user_info.pickUpLocation,
            additionalMessage: response.data.user_info.additionalMessage,            
          };
          localStorage.setItem(
            "orderprofile",
            JSON.stringify({ order: this.orderData })
          );
        }
      });
    }
  }

}
