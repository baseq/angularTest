import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { ProductService } from "./product.service";
import { IProduct } from './product';


describe('ProductService', () => {
  let httpTestingController: HttpTestingController;
  let service: ProductService;

  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductService);
  });

  describe('getProduct', () => {

    it('sholud call get with the correct URL', () => {
      let resultProduct: IProduct;
      service.getProduct(2).subscribe({
        next: product => resultProduct = product,
      });
      
      const req = httpTestingController.expectOne('api/products/products.json');

      req.flush([
        {
          "productId": 1,
          "productName": "Laptop Dell Inspiron",
          "productCode": "LAP-5593",
          "releaseDate": "September 15, 2020",
          "description": "Laptop Dell Inspiron with Intel Core 10th generation i5.",
          "price": 782.15,
          "starRating": 4.5,
          "imageUrl": "assets/images/laptop_dell_inspiron.jpg"
        },
        {
          "productId": 2,
          "productName": "Laptop Hp",
          "productCode": "LAP-1520",
          "releaseDate": "September 10, 2020",
          "description": "Laptop Hp with Intel Core 10th generation i7.",
          "price": 979.39,
          "starRating": 4.2,
          "imageUrl": "assets/images/laptop_hp_intel.jpg"
        },
        {
          "productId": 5,
          "productName": "Laptop Lenovo",
          "productCode": "LAP-5515",
          "releaseDate": "August 30, 2020",
          "description": "Laptop Lenovo Thinkpad with Intel Core 10th generation i5.",
          "price": 710.05,
          "starRating": 4.6,
          "imageUrl": "assets/images/laptop_lenovo_thinkpad.jpeg"
        },
        {
          "productId": 8,
          "productName": "Ultrabook Dell",
          "productCode": "ULB-7390",
          "releaseDate": "August 18, 2020",
          "description": "Ultrabook 2in1 Dell with Intel Core 8th generation i5.",
          "price": 1465.55,
          "starRating": 3.7,
          "imageUrl": "assets/images/ultrabook_dell.jpg"
        },
        {
          "productId": 10,
          "productName": "Ultrabook Hp",
          "productCode": "ULB-0360",
          "releaseDate": "July 20, 2020",
          "description": "Ultrabook 2in1 Hp Spectre with Intel Core 10th generation i5.",
          "price": 1445.59,
          "starRating": 4.8,
          "imageUrl": "assets/images/ultrabook_hp_spectre.jpg"
        }
      ]);

      httpTestingController.verify();

      expect(resultProduct.productName).toContain("Laptop Hp");
    })
  })


})
