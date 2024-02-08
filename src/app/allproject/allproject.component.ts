import { Component, OnInit } from '@angular/core';
import { ServiceapiService } from '../service/serviceapi.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allproject',
  templateUrl: './allproject.component.html',
  styleUrls: ['./allproject.component.css']
})
export class AllprojectComponent implements OnInit {
  products: any = []


  constructor(private service: ServiceapiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  /* all Product */
  getAllProduct() {
    this.service.getAllProductApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  //----------addToWishlist--------//

  addToWishlist(product: any) {
    if (sessionStorage.getItem('token')) {
      this.service.addWishlistApi(product).subscribe({
        next: (res: any) => {
          console.log(res);
          this.service.getWishlistCount()
          this.toastr.success('Added to Wishlist ');

        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error(`${err.error}`);

        }
      })
    } else {
      this.toastr.warning('Please Login');
    }

  }

  //---------addToCart-----------//

  addToCart(products: any) {

    if (sessionStorage.getItem('token')) {

      // Object.assign(products, { quantity: 1 })
      products.quantity = 1
      this.service.addToCartApi(products).subscribe({
        next: (res: any) => {
          console.log(res);
          this.service.getEcartCount()
          this.toastr.success('Added to Cart ');
        },

        error: (err: any) => {
          console.log(err);
        }

      })

    } else {

      this.toastr.warning('Please Login');
    }

  }





}
