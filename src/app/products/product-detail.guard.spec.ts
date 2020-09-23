import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductDetailGuard } from './product-detail.guard';
import { LoginService } from '../login/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductDetailGuard', () => {
  let guard: ProductDetailGuard;
  let mockLoginService;

  beforeEach(() => {
    mockLoginService = jasmine.createSpyObj(['isAdmin']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: LoginService, useValue: mockLoginService }
      ]
    });
    guard = TestBed.inject(ProductDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
