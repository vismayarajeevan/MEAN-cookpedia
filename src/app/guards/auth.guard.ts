import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);
  if(sessionStorage.getItem('token')){
    //authorised user
    return true;
  } else{
    //unauthorised user
    alert("Please login first");
    router.navigateByUrl('/login')
    return false
  }
};
