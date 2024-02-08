import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllprojectComponent } from './allproject/allproject.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { HeaderComponent } from './header/header.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { gurdsGuard } from './gurds.guard';

const routes: Routes = [
  { path: "", component: AllprojectComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: 'view/project/:id', component: ViewProjectComponent },
  { path: "header", component: HeaderComponent },
  { path: "wishlist", component: WishlistComponent, canActivate: [gurdsGuard] },
  { path: "cart", component: CartComponent, canActivate: [gurdsGuard] },
  { path: "checkout", component: CheckoutComponent, canActivate: [gurdsGuard] },
  { path: "**", component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
