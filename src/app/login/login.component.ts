import { Component, OnInit } from '@angular/core';
import { IUser } from './user'
import { LoginService} from './login.service'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage='';
  user: IUser;
  subscription: Subscription;

  constructor(private loginService: LoginService,
              private router: Router ) { }

  ngOnInit(): void {
    this.user = {
      userId: '',
      displayName: '',
      userName: '',
      password: '',
      email: '',
      role: ''
    }
  }

  onSubmit() {
    this.subscription = this.loginService.authenticate(this.user).subscribe({
      next: isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/products']);
        } else {
          this.errorMessage = 'Wrong user or password';
        }
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
