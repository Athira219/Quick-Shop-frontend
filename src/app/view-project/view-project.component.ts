import { Component, OnInit } from '@angular/core';
import { ServiceapiService } from '../service/serviceapi.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  product: any = {}
  constructor(private service: ServiceapiService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      let id = res.id
      console.log(id);
      this.getAProduct(id)
    })
  }


  //--------getAProduct-------//
  getAProduct(id: any) {
    this.service.getAProductApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.product = res[0]
        console.log('products=', this.product);

      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  //-----------addToWishlist-----------//
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
          this.toastr.error('This Product  already in your Wishlist ');
        
        }
      })
    } else {

      this.toastr.warning('please login');
    }

  }

  
  //-------addToCart--------//

  addToCart(products: any) {

    if (sessionStorage.getItem('token')) {

      // Object.assign(products, { quantity: 1 })
      products.quantity = 1
      this.service.addToCartApi(products).subscribe({
        next: (res: any) => {
          console.log(res);
          this.service.getEcartCount()
          this.toastr.success('Added to Cart');

        },
         error: (err: any) => {
          console.log(err);
        }

      })

    } else {
      this.toastr.warning('please login');

    }

  }
}
