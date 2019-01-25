import { Router } from '@angular/router';
import { CrudService } from './../services/crud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: any[] = [];
  incorrectPwd: boolean = false;
  unknownUser: boolean = false;

  form = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private service: CrudService, private router: Router) { }

  ngOnInit() {
    this.service.getUserList()
      .subscribe(Response => {
        this.userData = Response.json()
      })
  }

  onSubmit(e) {
    console.log(this.userData)
    if(this.form.valid) {
      this.userData.forEach(user => {
        if(this.form.value.user == user.username || this.form.value.user == user.mobileNumber ||this.form.value.user == user.email) {
          if(this.form.value.password == user.password) {
            this.service.setUserDetailsForLanding(user);
            this.router.navigate(['/landing']);
          }
          else {
            this.incorrectPwd = true;
            this.unknownUser = false;
          }
        }
        else {
          this.unknownUser = true;
          this.incorrectPwd = false;
        }
      });
    }
  }

  get user() {
    return this.form.get('user');
  }

  get password() {
    return this.form.get('password');
  }
}
