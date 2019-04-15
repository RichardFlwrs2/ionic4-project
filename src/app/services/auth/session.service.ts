import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { BootController } from "src/boot.controller";
import { Credential } from "../api/login.service";

@Injectable({
  providedIn: "root"
})
export class SessionService {
  constructor(private router: Router, private ngZone: NgZone, private _stS: StorageService) {}

  public saveSession(c: Credential | any) {
    const SESSION = {
      username: c.username,
      idOwner: c.idOwner,
      idUsuario: c.idUsuario,
      idEntidad: c.idEntidad,
      rol: c.rol,
      picture: c.picture,
      isLogged: true,
      isOwner: c.owner,
      token: c.token,
      dir: c.dir
    };


    this._stS.setCurrentSession(SESSION);
    this._stS.setAuthToken(c.token);
    this.router.navigate(["/tabs/tareas"]);
  }

  public exit() {
    this._stS.removeCurrentSession();
    this._stS.removeAuthToken();
    this.ngZone.runOutsideAngular(() => BootController.getbootControl().restart());
    this.router.navigate(["/login"]);
  }
}
