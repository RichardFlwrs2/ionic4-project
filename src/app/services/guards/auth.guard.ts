import { Injectable, NgZone } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BootController } from "src/boot.controller";
import { StorageService } from "../auth/storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  loggedIn = new Subject<any>();
  constructor(private router: Router, private _sts: StorageService, private ngZone: NgZone) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._sts.session && this._sts.token) {
      this.loggedIn.next(true);
      return true;
    } else {
      console.log("bad, go back...");

      if (this.router.url !== "/login") {
        if (this.router.url !== "/") this.ngZone.runOutsideAngular(() => BootController.getbootControl().restart());
        this.router.navigate(["/login"]);
      }
    }
    return false;
  }
}
