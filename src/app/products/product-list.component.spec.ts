import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { StarComponent } from '../shared/star.component';
import { Input, Directive, Pipe, PipeTransform } from '@angular/core';
import { ProductService } from './product.service';
import { IProduct } from './product';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Directive({
  selector: '[routerLink]',
  host: {'(click)' : 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}


@Pipe({
  name: 'convertToSpaces'
})
class MockPipe implements PipeTransform {

  transform(value: string, character: string): string {
    return value.replace(character, ' ');
  }
}


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService;
  let PRODUCTS: IProduct[] = [
    {"productId": 2,"productName": "Laptop Hp","productCode": "LAP-1520","releaseDate": "September 10, 2020","description": "Laptop Hp with Intel Core 10th generation i7.","price": 979.39,"starRating": 4.2,"imageUrl": "assets/images/laptop_hp_intel.jpg"},
    {"productId": 5,"productName": "Laptop Lenovo","productCode": "LAP-5515","releaseDate": "August 30, 2020","description": "Laptop Lenovo Thinkpad with Intel Core 10th generation i5.","price": 710.05,"starRating": 4.6,"imageUrl": "assets/images/laptop_lenovo_thinkpad.jpeg"},
    {"productId": 8,"productName": "Ultrabook Dell","productCode": "ULB-7390","releaseDate": "August 18, 2020","description": "Ultrabook 2in1 Dell with Intel Core 8th generation i5.","price": 1465.55,"starRating": 3.7,"imageUrl": "assets/images/ultrabook_dell.jpg"
    }]

  beforeEach(async(() => {
    mockProductService = jasmine.createSpyObj(['getProducts']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        ProductListComponent,
        StarComponent,
        RouterLinkDirectiveStub,
        MockPipe
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService }],
      //schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  }));

  it('should create ProductList component', () => {
    expect(component).toBeTruthy();
  });

  it('should set products correctly from the service', () => {
    mockProductService.getProducts.and.returnValue(of(PRODUCTS));
    fixture.detectChanges();

    expect(component.products.length).toBe(3);
  });

  it('should set filteredProducts correctly from the service', () => {
    mockProductService.getProducts.and.returnValue(of(PRODUCTS));
    fixture.detectChanges();

    expect(component.filteredProducts.length).toBe(3);
  });

  it('should create one tr element for each product', () => {
    mockProductService.getProducts.and.returnValue(of(PRODUCTS));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('tr')).length).toBe(4);
  });

  it('should render a StarComponent for each product', () => {
    mockProductService.getProducts.and.returnValue(of(PRODUCTS));
    fixture.detectChanges();

    const starComponentsDe = fixture.debugElement.queryAll(By.directive(StarComponent));
    expect(starComponentsDe.length).toBe(3);
  });

  it('each StarComponent should have the correct rating passed from the main component', () => {
    mockProductService.getProducts.and.returnValue(of(PRODUCTS));
    fixture.detectChanges();

    const starComponentsDe = fixture.debugElement.queryAll(By.directive(StarComponent));
   
    for (let i = 0; i < starComponentsDe.length; i++) {
      expect(starComponentsDe[i].componentInstance.rating).toEqual(PRODUCTS[i].starRating);
    }
  });

  it('should change page title when the Star Component is clicked', () => {
    spyOn(component, 'onRatingClicked');
    mockProductService.getProducts.and.returnValue(of(PRODUCTS));
    fixture.detectChanges();

    const starComponentsDe = fixture.debugElement.queryAll(By.directive(StarComponent));
    starComponentsDe[0].query(By.css('.crop')).triggerEventHandler('click', {});

    expect(component.onRatingClicked).toHaveBeenCalledWith('The rating 4.2 was clicked!');
   });

  it('should correctly receive events when the Star Component emits clickEvent', () => {
    spyOn(component, 'onRatingClicked');
    mockProductService.getProducts.and.returnValue(of(PRODUCTS));
    fixture.detectChanges();

    const starComponentsDe = fixture.debugElement.queryAll(By.directive(StarComponent));
    (<StarComponent>starComponentsDe[0].componentInstance).ratingClicked.emit("Rating 10 was clicked!")

    expect(component.onRatingClicked).toHaveBeenCalledWith("Rating 10 was clicked!");
  });

  it('should have the correct route for the first product', () => {
    mockProductService.getProducts.and.returnValue(of(PRODUCTS));
    fixture.detectChanges();

    const tdElements = fixture.debugElement.queryAll(By.css('td'));
    const anchorEl = tdElements[1].query(By.css('a'));

    const routerLinkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    let routerLink = routerLinkDes[0].injector.get(RouterLinkDirectiveStub);
    anchorEl.triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toEqual(['/products', 2]);
  })

});
