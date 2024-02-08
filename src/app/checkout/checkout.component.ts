import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {IPayPalConfig,ICreateOrderRequest } from 'ngx-paypal';
import { ServiceapiService } from '../service/serviceapi.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  chekOutImage:string='./assets/Images/checkout.png'
  proceedToPayStatus:boolean=false
  grandTotal:any=''
  makePaymentStatus:boolean=false
  public payPalConfig ? : IPayPalConfig;


  checkOutForm = this.formData.group({
    username:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    flat:["",[Validators.required,Validators.pattern('[A-Za-z0-9: ]*')]],
    place:["",[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    pincode:["",[Validators.required,Validators.pattern('[0-9]+')]]

  })
  constructor(private formData:FormBuilder,private service:ServiceapiService , private router:Router ,private toastr: ToastrService){}

  cancel(){
    this.checkOutForm.reset()
  }
  proceedToPay(){
    console.log('clicked');
    
    if(this.checkOutForm.valid){
      this.proceedToPayStatus=true
      console.log(this.proceedToPayStatus);
      this.grandTotal=sessionStorage.getItem('total')
      console.log(this.grandTotal);
      
      
    }else{
      this.toastr.warning('Fill the Form ');
    }

  }
  back(){
    this.proceedToPayStatus=false
  }
  payment(){
    this.makePaymentStatus=true
    console.log('payment=',this.makePaymentStatus);
    this.initConfig()
    
  }
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.grandTotal,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.grandTotal
                        }
                    }
                },
                
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        /* invoke when the payment is successfull */
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.service.emptyCartApi().subscribe((res:any)=>{
            this.service.getEcartCount()
            this.toastr.success('Payment Successful! Thank you for your purchase');
            this.proceedToPayStatus=false
            this.makePaymentStatus=false
            this.router.navigateByUrl('/')
            })
            

        },
        /* Payment cancel */
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.toastr.error('Payment Cancelled. ');
            this.proceedToPayStatus=true
        },
        /* gateway error */
        onError: err => {
            console.log('OnError', err);
            this.toastr.error('Transaction Error. Please try again later  ');
            this.proceedToPayStatus=true
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            
        }
    };
}


}
