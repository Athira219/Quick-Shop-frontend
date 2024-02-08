import { Component, OnInit } from '@angular/core';
import { ServiceapiService } from '../service/serviceapi.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any = []
  total: number = 0

  constructor(private service: ServiceapiService, private router: Router) { }

  ngOnInit(): void {
    this.allProducts()
  }

  allProducts() {
    this.service.allCartsProductsApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res
        console.log('products=', this.products);
        this.grandTotal()
      
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  //-----------DELETE--------------//
  removeItem(id: any) {
    this.service.removeCartsItemApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts()
        // alert('success')

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  //---------grand Total-----------//
  grandTotal() {
    this.total = Math.ceil(this.products.map((item: any) => item.grandTotal).reduce((num1: any, num2: any) => num1 + num2))
    console.log(this.total);

  }
  //-----------increment the Quantity---------------//
  incrementItem(id: any) {
    this.service.incrementItemApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts()

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  //-----------decrement the Quantity---------------//
  decrementItem(id: any) {
    this.service.decrementItemApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts()
        this.service.getEcartCount()

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  //----------empty Cart---------------//
  emptyCart() {
    this.service.emptyCartApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts()
        this.service.getEcartCount()

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }
  
  checkOut() {
    sessionStorage.setItem('total', JSON.stringify(this.total))
  }

}
