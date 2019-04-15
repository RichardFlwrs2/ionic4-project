import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ErrorsService {
  messageError: string;

  constructor() {}

  manageError(err) {
    console.error(err);

    if (err.error) this.messageError = err.error.length > 0 ? err.error[0] : err.message;
    else this.messageError = err.message;

    // if (err.status === 401) {
    //   this._msgS.show("error", "Error en la sesión", "Vuelva a iniciar sesión");
    //   this.auth.exit();
    //   return;
    // }

    // if (err.status === 404) {
    //   this._msgS.show("error", "Petición HTTP no encontrado", "Error 404");
    //   return;
    // }

    // if (err.status === 0) {
    //   this._msgS.show("error", "Error de conexion, verifica tu internet");
    //   return;
    // }

    alert(this.messageError);
    // this._msgS.show("error", this.messageError, "Ha habido un error");
  }
}
