import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private dataService: DataService,
              private router: Router) { }

  email: string;
  password: string;
  state: boolean = false;
  accepted: boolean = false;
  disableButton = true;
  textButton:string = "Login";
  allow:any = false;

  loginEmail(email: string):void {
    this.email = (<HTMLInputElement>event.target).value;
    this.loginEnable();
  }

  loginPass(password: string):void {
    this.password = (<HTMLInputElement>event.target).value;
    this.loginEnable();
  }

  showData() {
    this.loginEmail;
    this.loginPass;
    // console.log(this.password + ' ' + this.email);
    this.dataService.getUsername(this.email, this.password).subscribe(data => {
      this.allow = data;
      console.log(this.allow);
    })

    // return this.allow;

    return this.dataService.getUsername(this.email, this.password);
  }

  checkAccept(event):void {
    this.accepted = !this.accepted;
    this.disableButton = !this.disableButton;
  }

  loginEnable(){
    if(this.email !== undefined && this.password !== undefined)
      this.disableButton = false;
  }
}
