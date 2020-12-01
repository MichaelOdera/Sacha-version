import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class BackendService {
  constructor(private http: HttpClient) {}

  register(data: object): Observable<any> {
    return this.http.post("http://localhost:5000/users/register",
    data,
    httpOptions);
  }

  login(loginData: object): Observable<any> {
    return this.http.post<object>(
      "http://localhost:5000/users/login",
      loginData,
      httpOptions
    );
  }

  userInfo(userId: number): Observable<any> {
    return this.http.get<object>(`http://localhost:5000/users/${userId}`);
  }


  patientProfile(patientId: number): Observable<any>{
    return this.http.get<object>(`http://localhost:5000/patient/${patientId}`);
  }

  updatePatientProfile(
    patientId: number,
    updatePatientProfileData: object
  ): Observable<any> {
    return this.http.put<object>(
      `http://localhost:5000/patient/${patientId}/edit`,
      updatePatientProfileData,
      httpOptions
    );
  }

  doctorProfile(doctorId: number): Observable<any> {
    return this.http.get<object>(`http://localhost:5000/patient/${doctorId}`);
  }

  updateDoctorProfile(
    doctorId: number,
    updateDoctorProfileData: object
  ): Observable<any> {
    return this.http.put<object>(
      `http://localhost:5000/doctor/${doctorId}/edit`,
      updateDoctorProfileData,
      httpOptions
    );
  }

  updatePharmacyProfile(
    pharmacyId: number,
    updatePharmacyProfileData: object
  ): Observable<any> {
    return this.http.put<object>(
      `http://localhost:5000/pharmacy/${pharmacyId}/edit`,
      updatePharmacyProfileData,
      httpOptions
    );
  }

  getPharmacy(pharmacyId: number): Observable<any> {
    return this.http.get<object>(
      `http://localhost:5000/pharmacy/${pharmacyId}`
    );
  }

  getOrder(
    patientId: number,
    orderNumber: number): Observable<any> {
    return this.http.get<object>(
      `http://localhost:5000/patient/${patientId}/orders/${orderNumber}`
    );
  }
}
