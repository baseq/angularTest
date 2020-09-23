import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginService } from './login/login.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

let mockLoginService;
describe('AppComponent', () => {
  mockLoginService = jasmine.createSpyObj(['getAuthSubject']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Assets Management'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    expect(app.pageTitle).toEqual('Assets Management');
  });
});
