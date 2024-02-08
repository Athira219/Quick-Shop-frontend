
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceapiService {

  constructor(private http: HttpClient) {
    /* to avoid removal of the value while refresh  */
    if (sessionStorage.getItem('token')) {
      this.getWishlistCount()
      this.getEcartCount()
    }
  }

  baseUrl = 'https://quick-shop-backend.onrender.com'

  wishlistCount = new BehaviorSubject(0)
  ecartCount = new BehaviorSubject(0)

  registerApi(user: any) {
    return this.http.post(`${this.baseUrl}/users/register`, user)
  }
  loginApi(users: any) {
    return this.http.post(`${this.baseUrl}/users/login`, users)
  }
  getAllProductApi() {
    return this.http.get(`${this.baseUrl}/ecomerce/projects`)
  }
  getAProductApi(id: any) {
    return this.http.get(`${this.baseUrl}/project/view/${id}`)
  }


  addTokentoHeader() {
    /* Create an object for the class HttpHeaders */
    let headers = new HttpHeaders()
    /* getting token from the sessiion storage */
    const token = sessionStorage.getItem('token')
    if (token) {
      /* appending token to the headers of the request */
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  addWishlistApi(product: any) {
    return this.http.post(`${this.baseUrl}/addWishlist`, product, this.addTokentoHeader())
  }

  allWishlistProductApi() {
    return this.http.get(`${this.baseUrl}/wishlist/allproducts`, this.addTokentoHeader())
  }

  removeWishlistItemApi(id: any) {
    return this.http.delete(`${this.baseUrl}/wishlist/deleteWishlist/${id}`, this.addTokentoHeader())
  }

  getWishlistCount() {
    this.allWishlistProductApi().subscribe((res: any) => {
      this.wishlistCount.next(res.length)

    })
  }
  addToCartApi(products: any) {
    return this.http.post(`${this.baseUrl}/addCart`, products, this.addTokentoHeader())
  }
  allCartsProductsApi() {
    return this.http.get(`${this.baseUrl}/carts/allProduct`, this.addTokentoHeader())
  }

  getEcartCount() {
    this.allCartsProductsApi().subscribe((res: any) => {
      this.ecartCount.next(res.length)
    })
  }
  removeCartsItemApi(id: any) {
    return this.http.delete(`${this.baseUrl}/carts/deleteCartItem/${id}`, this.addTokentoHeader())
  }
  incrementItemApi(id: any) {
    return this.http.get(`${this.baseUrl}/carts/incrementItem/${id}`, this.addTokentoHeader())
  }
  decrementItemApi(id: any) {
   return this.http.get(`${this.baseUrl}/carts/decrementItem/${id}`, this.addTokentoHeader())
  }
  emptyCartApi(){
   return this.http.delete(`${this.baseUrl}/carts/emptyCart`,this.addTokentoHeader())
  }
  isLogged(){
  return  !!sessionStorage.getItem('username')
  }




}
