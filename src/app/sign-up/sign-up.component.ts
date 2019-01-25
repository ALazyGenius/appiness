import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators
} from "../../../node_modules/@angular/forms";
import { CrudService } from '../services/crud.service';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {

  pwdPattern: string = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  passwordDontMatchFlag: boolean = false;
  userData: any[] = [];

  form = new FormGroup({
    name: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.pwdPattern)
      // use pwd: x2z@dG1a
    ]),
    confirmPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.pwdPattern)
      // use pwd: x2z@dG1a
    ]),
    mobileNumber: new FormControl("", Validators.required),
    address: new FormControl("", [
      Validators.required,
      Validators.maxLength(30)
    ])
  });

  constructor(private service: CrudService, private router: Router) {}

  ngOnInit() {
    this.service.getUserList()
      .subscribe(Response => {
        this.userData = Response.json();
      })
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      if (this.form.value.password != this.form.value.confirmPassword) {
        this.passwordDontMatchFlag = true;
      }
      else {
        this.passwordDontMatchFlag = false;
        var id = this.userData[this.userData.length-1].id+1;
        var objToPost = this.form.value;
        objToPost['id'] = id;
        this.service.postNewUser(objToPost)
          .subscribe(Response => {
            var resp = Response.json();
            this.router.navigate(['/user-added/', {id: resp.id}])
          })
      }
    }
  }

  get name() {
    return this.form.get("name");
  }

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

  get confirmPassword() {
    return this.form.get("confirmPassword");
  }

  get email() {
    return this.form.get("email");
  }

  get mobileNumber() {
    return this.form.get("mobileNumber");
  }

  get address() {
    return this.form.get("address");
  }
}
