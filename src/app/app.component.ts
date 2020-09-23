import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { IUser } from './login/user';


@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  pageTitle = 'Assets Management';
  currentUser: IUser;

  constructor(private loginService: LoginService) { };

  ngOnInit(): void {
    this.loginService.getAuthSubject().subscribe((value) => {
      this.currentUser = value;
    });
  }

}
