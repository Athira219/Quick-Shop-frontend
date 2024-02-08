import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceapiService } from '../service/serviceapi.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  quickShopImage: string = "./assets/Images/newone.png"

  constructor(private formdata: FormBuilder, private service: ServiceapiService, private router: Router, private toastr: ToastrService) { }

  registerForm = this.formdata.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  /* REGISTER */
  register() {

    if (this.registerForm.valid) {
      let usernames = this.registerForm.value.username
      let email = this.registerForm.value.email
      let password = this.registerForm.value.password

      const user = { username: usernames, email, password }

      this.service.registerApi(user).subscribe({
        next: (res: any) => {
          console.log(res);

          this.toastr.success(`${res.username} is registered `);
          this.router.navigateByUrl('/login')
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error(`${err.error}`);

        }
      })


    } else {

      this.toastr.info('Fill the Form');
    }
  }

}
