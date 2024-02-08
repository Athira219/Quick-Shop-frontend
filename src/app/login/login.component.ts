import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceapiService } from '../service/serviceapi.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  quickShopImage:string="./assets/Images/newone.png"
  
  loginForm=this.formdata.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private formdata:FormBuilder,private service:ServiceapiService, private router:Router,private toastr: ToastrService){}

  
  login(){
    if(this.loginForm.valid){
      let email= this.loginForm.value.email
      let password = this.loginForm.value.password

      let user={email,password}
      this.service.loginApi(user).subscribe({
        next:(res:any)=>{
          console.log(res);
          
          sessionStorage.setItem('username',res.existingUser.username)
          console.log('username=',res.existingUser.username);
          
          sessionStorage.setItem('token',res.token)
          
          
          this.toastr.success('login Sucessfull');
         

          this.router.navigateByUrl("/")


        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
      
    }else{
      
      this.toastr.info('Invalid Form');
    }
  }
}
