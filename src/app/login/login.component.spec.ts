import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService, mockRouterService;
  
  beforeEach(async () => {
    mockLoginService = jasmine.createSpyObj(['authenticate']);
    mockRouterService = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: Router, useValue: mockRouterService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit() when form submit event is triggered', () => {
    spyOn(component, 'onSubmit');
    mockLoginService.authenticate.and.returnValue(of(true));
    fixture.detectChanges();

    const formDe = fixture.debugElement.queryAll(By.css('form'));
    formDe[0].triggerEventHandler('submit', {});

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should check inputs to be defined and have the correct models ', () => {
    mockLoginService.authenticate.and.returnValue(of(true));
    fixture.detectChanges();

    const formDe = fixture.debugElement.query(By.css('form'));
    const inputUserName = formDe.query(By.css('input[type="text"]'));
    const inputPassword = formDe.query(By.css('input[type="password"]'));

    expect(inputUserName).toBeDefined();
    expect(inputUserName.attributes["name"]).toBe("userName");

    expect(inputPassword).toBeDefined();
    expect(inputPassword.attributes["name"]).toBe("password");
    
  });

  it('should correctly read values from input fields', () => {
    mockLoginService.authenticate.and.returnValue(of(false));
    fixture.detectChanges();

    const inputNameElem = fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;
    const inputPasswElem = fixture.debugElement.query(By.css('input[type="password"]')).nativeElement;
    const formDe = fixture.debugElement.queryAll(By.css('form'));

    inputNameElem.value = "Test";
    inputPasswElem.value = "Test";
    formDe[0].triggerEventHandler('submit', {});
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Wrong user or password');
  })

  it('should correctly authenticate user', () => {
    mockLoginService.authenticate.and.returnValue(of(true));
    fixture.detectChanges();

    const formDe = fixture.debugElement.queryAll(By.css('form'));
    formDe[0].triggerEventHandler('submit', {});

    expect(component.errorMessage).toEqual('');
  });

  it('should display correct error message for wrong user', () => {
    mockLoginService.authenticate.and.returnValue(of(false));
    fixture.detectChanges();

    const formDe = fixture.debugElement.queryAll(By.css('form'));
    formDe[0].triggerEventHandler('submit', {});

    expect(component.errorMessage).toBe('Wrong user or password');
  });

});
