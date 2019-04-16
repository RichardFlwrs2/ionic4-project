import { Injectable } from "@angular/core";
import { IonToastService } from "./ion-toast.service";
import { SessionService } from "../auth/session.service";

@Injectable({
  providedIn: "root"
})
export class ErrorsService {
  messageError: string;

  constructor(private _msg: IonToastService, private _session: SessionService) {}

  manageError(err) {
    console.error(err);

    if (err.error) this.messageError = err.error.length > 0 ? err.error[0] : err.message;
    else this.messageError = err.message;

    if (err.status === 401) {
      this._msg.toastWithOptions("Error en la sesión, vuelva a iniciar sesión");
      this._session.exit();
      return;
    }

    // if (err.status === 404) {
    //   this._msgS.show("error", "Petición HTTP no encontrado", "Error 404");
    //   return;
    // }

    if (err.status === 0) {
      this._msg.toastWithOptions("Error de conexion, verifica tu internet");
      return;
    }

    this._msg.toastWithOptions(this.messageError);
  }
}
