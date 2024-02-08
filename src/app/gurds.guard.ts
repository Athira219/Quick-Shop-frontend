import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceapiService } from './service/serviceapi.service';
import { ToastrService } from 'ngx-toastr';

export const gurdsGuard: CanActivateFn = (route, state) => {

  const service = inject(ServiceapiService)
  const toastr = inject(ToastrService)
  const router = inject(Router)



  if (service.isLogged()) {

    return true;
  } else {
    toastr.warning('Please Login');
    router.navigateByUrl("login")
    return false
  }
};
