import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { ErrorsService } from "../messages/errors.service";
import { IonToastService } from '../messages/ion-toast.service';

@Injectable({providedIn: "root"})
export class StatesService {
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private _err: ErrorsService,
    private _msge: IonToastService
  ) {
    this.headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("authToken")
    );
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Access-Control-Allow-Headers", "Content-Type");
    this.headers.append("Access-Control-Allow-Methods", "POST");
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Authorization", localStorage.getItem("authToken"));
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
