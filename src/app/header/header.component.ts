import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceapiService } from '../service/serviceapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginUser: string = ""
  wishlistCounts: number = 0
  ecartCount: number = 0

  constructor(private router: Router, private serviceApi: ServiceapiService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('username')) {
      this.loginUser = sessionStorage.getItem('username') || ""
      console.log('loginUser=', this.loginUser);
      this.serviceApi.wishlistCount.subscribe((res: any) => {
        this.wishlistCounts = res
      })
      this.serviceApi.ecartCount.subscribe((res: any) => {
        this.ecartCount = res
      })

    } else {
      this.loginUser = ""
    }


  }
  logout() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    this.router.navigateByUrl('')
    window.location.reload()
  }

}
