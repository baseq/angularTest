import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { Pipe, PipeTransform, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from './product';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

@Pipe({
  name: 'convertToSpaces'
})
class MockPipe implements PipeTransform {

  transform(value: string, character: string): string {
    return value.replace(character, ' ');
  }
}

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockProductService, mockActivatedRoute, mockRouter;
  let sample_product: IProduct = {
    "productId": 2,
    "productName": "Laptop Hp",
    "productCode": "LAP-1520",
    "releaseDate": "September 10, 2020",
    "description": "Laptop Hp with Intel Core 10th generation i7.",
    "price": 979.39,
    "starRating": 4.2,
    "imageUrl": "assets/images/laptop_hp_intel.jpg"
  }

  beforeEach(async(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: { get: () => { return '2';}}}
    }

    mockProductService = jasmine.createSpyObj(['getProduct']);
    mockRouter = jasmine.createSpyObj(['navigate']);


    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent,
                     MockPipe],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ProductService, useValue: mockProductService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
     
  }));

  it('should create ProductDetail component', () => {
    expect(component).toBeTruthy();
  });

  it('should render product name in page title', () => {
    mockProductService.getProduct.and.returnValue(of(sample_product));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.card-header')).nativeElement.textContent).toContain(sample_product.productName);

  });

  it('should have the same productId', () => {
    mockProductService.getProduct.and.returnValue(of(sample_product));
    fixture.detectChanges();

    expect(component.product.productId).toBe(sample_product.productId);

  });
});
