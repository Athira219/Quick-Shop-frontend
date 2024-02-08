import { Component, OnInit } from '@angular/core';
import { ServiceapiService } from '../service/serviceapi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  
  products:any=[]

  constructor(private service:ServiceapiService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.getAllWishlistProduct()
    
  }

//-----------getAllWishlistProduct----------//
  getAllWishlistProduct(){
    this.service.allWishlistProductApi().subscribe({
      next:(res:any)=>{
        console.log(res);

        this.products=res
        console.log(this.products);
        },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

//---------remove wishlist item----------//
  removeItem(id:any){
    this.service.removeWishlistItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllWishlistProduct()
        this.service.getWishlistCount()
        

      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  //-------addToCart--------//
  addToCart(products: any) {

    if (sessionStorage.getItem('token')) {

      // Object.assign(products, { quantity: 1 })
      products.quantity=1
      this.service.addToCartApi(products).subscribe({
        next: (res: any) => {
          console.log(res);
          this.removeItem(products._id)
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
