import { CrudService } from './../services/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  userData: Object = {};

  constructor(private service: CrudService) { }

  ngOnInit() {
    this.userData = this.service.getUserDetailsForLanding();
  }

}
