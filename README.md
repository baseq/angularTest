# SAM

Demo application that demonstrates the integration of [ChurnZero](https://churnzero.net/) help platform.

## Running the application

For running the application, navigate to application root folder and run:

```
npm install
```

wait for completion and run:

```
npm start
```

## Running Unit tests

To run unit tests, run

```
npm test
```

## Login page

Credentials for logging in are:

```
user name: admin
password: admin
```

Users can be CRUDed via JSON file ./api/users.json:

``` json
[
    {
        "uuid": "0",
        "userName": "admin",
        "password": "admin",
        "displayName": "Administrator",
        "email": "admin@spr.ro",
        "role": "administrator" 
    },
    //...
]
```

Logout action is active after logging in through user menu icon on the top right corner.

## ChurnZero integration

Credentials reside in `./login/login.service.ts`. Modify the following constants to change credentials:

``` javascript
const CHURNZERO_APPKEY = '1!Mn1wt4KqUiRkrxwJiysF6UWBJKcqHAahJ9RE-Ps11Ast912';
const CHURNZERO_ACCOUNTEXTERNALID = '001300000009OgnAAE';
const CHURNZERO_CONTACTEXTERNALID = 'dprey@marcom.com';
```

## Product list page

Has a product listing which demonstrates the toggle of Show/Hide image button. The product meta can be modified via JSON file ./api/products.json:

``` json
[
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
  //...
]
```

## Product details page

Shows details about a specific product.