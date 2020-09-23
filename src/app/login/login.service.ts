import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from './user';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

declare let ChurnZero: any;
const CHURNZERO_APPKEY = '123456789101112131'
const CHURNZERO_ACCOUNTEXTERNALID = '123456789101112131';
const CHURNZERO_CONTACTEXTERNALID = 'test@test.com';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usersUrl = 'api/users/users.json';
  public currentUser: IUser;
  public isLoggedIn: boolean = false;
  public errorMessage: string = '';

  private users: IUser[] = [];
  private authSubject: BehaviorSubject<IUser>;
  
  
  constructor(private http: HttpClient) {
    this.authSubject = new BehaviorSubject(this.currentUser);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getUser(user: IUser): Observable<IUser | undefined> {
    return this.getUsers()
      .pipe(
        map((users: IUser[]) => users.find(u => u.userName === user.userName && u.password === user.password))
      );
  }

  getUserRole(): string {
    return this.currentUser.role;
  }

  getCurrentUser(): IUser {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return (this.getUserRole() == 'administrator' || 
    this.getUserRole() ==  'contributor' )
  }


  authenticate(user: IUser): Observable<boolean> {
    return this.getUser(user)
      .pipe(
        map((usr: IUser) => {
          this.currentUser = usr;
          this.isLoggedIn = !!usr;

          if (this.isLoggedIn) {
            this.initializeChurnZero();
          }
          
          this.authSubject.next(this.currentUser);
          return this.isLoggedIn;
        })
      );
  }

  getAuthSubject(): BehaviorSubject<IUser> {
    return this.authSubject;
  }

  initializeChurnZero(): void {
    
    let contactExternalId = "";
    if (['administrator', 'contributor'].indexOf(this.currentUser.role) !== -1) {
        contactExternalId = CHURNZERO_CONTACTEXTERNALID;
    }
    else {
      contactExternalId = this.currentUser.email;
    }
    ChurnZero.push(['setAppKey', CHURNZERO_APPKEY]);
    ChurnZero.push(['setContact', CHURNZERO_ACCOUNTEXTERNALID, contactExternalId]);
    ChurnZero.push(['trackEvent', 'Login']);

    setTimeout(() => {
        ChurnZero.verify();
    }, 3000);
  }


  logout() {
    this.authSubject.next(null);
    this.currentUser = null;
    this.isLoggedIn = false;

    ChurnZero.push(['trackEvent', 'Logout']);
    ChurnZero.push(['stop']);
    setTimeout(() => {
      ChurnZero.verify();
    }, 2000);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
