import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url: string = "http://localhost:3000/users";
  userDetailsForLandingData: string = "";

  constructor(private http: Http) {

  }

  getUserList() {
    return this.http.get(this.url);
  }

  postNewUser(objectToPass) {
    return this.http.post(this.url, objectToPass);
  }

  setUserDetailsForLanding(user) {
    this.userDetailsForLandingData = user;
  }

  getUserDetailsForLanding() {
    return this.userDetailsForLandingData;
  }
}
