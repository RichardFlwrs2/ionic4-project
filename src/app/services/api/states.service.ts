import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { ErrorsService } from "../messages/errors.service";
import { IonToastService } from "../messages/ion-toast.service";
import { StorageService } from "../auth/storage.service";

@Injectable({ providedIn: "root" })
export class StatesService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private _err: ErrorsService, private _msge: IonToastService, private _sts: StorageService) {
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + this._sts.token);
  }
  private basePath = environment.api;

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| getStatusByIdOwner
  // ---------------------------------------------------------------------------------------------------------------- //
  getStatusByIdOwner(idUsuario: string) {
    //

    return this.http
      .get(this.basePath + "entidad/estatus/getStatusByIdOwner", {
        headers: this.headers,
        params: {
          id: idUsuario
        }
      })
      .pipe(
        map(res => res),
        catchError(err => {
          this._err.manageError(err);
          throw new Error("Error al hacer la consulta http");
        })
      );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| fixEstatus
  // ---------------------------------------------------------------------------------------------------------------- //
  fixEstatus(idContacto: string, idEstatus: string) {
    //

    return this.http
      .put(this.basePath + "entidad/contacto/fixEstatus", idContacto, {
        headers: this.headers,
        params: {
          idContacto: idContacto.toString(),
          idEstatus: idEstatus.toString()
        }
      })
      .pipe(
        map(res => res),
        catchError(err => {
          this._err.manageError(err);
          throw new Error("Error al hacer la consulta http");
        })
      );

    //
  }
}
