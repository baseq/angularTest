import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IUser } from './user';

describe('LoginService', () => {
  let httpTestingController: HttpTestingController;
  let loginService: LoginService;
  let USERS = [
    { "userId": "0", "userName": "user1", "password": "user1", "displayName": "User1", "email": "", "role": "administrator" },
    { "userId": "1", "userName": "user2", "password": "user2", "displayName": "User2", "email": "", "role": "" },
    { "userId": "2", "userName": "user2", "password": "passw2", "displayName": "User3", "email": "", "role": "" },
    { "userId": "3", "userName": "user4", "password": "user4", "displayName": "User4", "email": "", "role": "contributor" }
  ];
  let EXISTING_USER = { "userId": "", "userName": "user2", "password": "passw2", "displayName": "", "email": "", "role": "viewer" };
  let FAKE_USER = { "userId": "", "userName": "aaaa", "password": "aaaa", "displayName": "", "email": "", "role": "" };
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    loginService = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(loginService).toBeTruthy();
  });

  describe('getUsers', () => {

    it('sholud call getUsers with the correct URL and return all the users', () => {
      let resultUsers: IUser[];
      loginService.getUsers().subscribe({
        next: users => resultUsers = users,
      });

      const req = httpTestingController.expectOne('api/users/users.json');

      req.flush(USERS);

      httpTestingController.verify();

      expect(resultUsers.length).toBe(4);
    })
  });


  it('sholud call getUser with the correct URL and return the correct user', () => {
    let resultUser: IUser;

    loginService.getUser(EXISTING_USER).subscribe({
        next: r_user => resultUser = r_user,
    });

    const req = httpTestingController.expectOne('api/users/users.json');

    req.flush(USERS);

    httpTestingController.verify();

    expect(resultUser.displayName).toBe("User3");
  });

  it('sholud correctly authenticate an existing user', () => {
    let result: boolean;

    loginService.authenticate(EXISTING_USER).subscribe({
      next: res => result = res,
    });

    const req = httpTestingController.expectOne('api/users/users.json');

    req.flush(USERS);

    httpTestingController.verify();

    expect(result).toBeTrue();
    expect(loginService.isLoggedIn).toBeTrue();
  });

  it('sholud NOT authenticate an user that does not exist', () => {
    let result: boolean;

    loginService.authenticate(FAKE_USER).subscribe({
      next: res => result = res,
    });

    const req = httpTestingController.expectOne('api/users/users.json');

    req.flush(USERS);

    httpTestingController.verify();

    expect(result).toBeFalse();
    expect(loginService.isLoggedIn).toBeFalse();
  });

  it('sholud correctly logout an existing user', () => {

    loginService.currentUser = EXISTING_USER;
    loginService.logout();

    expect(loginService.currentUser).toBeNull();
    expect(loginService.isLoggedIn).toBeFalse();
  });

  it('sholud correctly recognize an administrator user', () => {
    let result: boolean;

    loginService.authenticate(USERS[0]).subscribe({
      next: res => result = res,
    });

    const req = httpTestingController.expectOne('api/users/users.json');
    req.flush(USERS);

    httpTestingController.verify();

    expect(loginService.isLoggedIn).toBeTruthy();
    expect(loginService.isAdmin()).toBeTrue();
  });

  it('sholud correctly recognize an contributor user', () => {
    loginService.currentUser = USERS[3];

    expect(loginService.isAdmin()).toBeTrue();
  });

  it('sholud correctly identify any other user', () => {
    loginService.currentUser = EXISTING_USER;

    expect(loginService.isAdmin()).toBeFalse();
  });
});
