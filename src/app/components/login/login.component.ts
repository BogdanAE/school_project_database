import { Component, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
    private route: Router) {

  }

  ngOnInit() {

  }

  announce;

  fnc() {
    let allow;
    this.loginService.showData().subscribe(data => {
      allow = data;
      if (allow)
        this.route.navigate(['/home']);
      else
        this.announce = "INCORRECT USENAME OR PASSWORD"
    });

  }

}
