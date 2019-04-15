import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorsService } from "../messages/errors.service";
import { map, catchError } from "rxjs/operators";
import { SessionService } from "../auth/session.service";

@Injectable({
  providedIn: "root"
})
export class LogginService {
  private basePath = environment.api;
  private headers;

  constructor(private http: HttpClient, private _err: ErrorsService, private _session: SessionService) {
    this.headers = new HttpHeaders();
  }

  checkUserConnection(logginFrom: LogginForm) {
    return this.http
      .post(this.basePath + "auth/checkUserConnection", logginFrom, {
        headers: this.headers
      })
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          throw new Error("Error al hacer la consulta http");
        })
      );
  }

  validateToLoggin(logginForm: LogginForm) {
    // Verifcar los datos con Backend
    return this.http
      .post(this.basePath + "auth/login", logginForm, {
        headers: this.headers
      })
      .pipe(
        map((res: Credential) => {
          // this._msgS.show("succses", "Bienvenido " + res.username);
          // this._auth.saveSession(res);
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          throw new Error("Error al hacer la consulta http");
        })
      );
  }

  logOut() {
    const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("authToken"));

    return this.http
      .post(this.basePath + "auth/logout", {
        headers: headers
      })
      .pipe(
        map(res => res),
        catchError(err => {
          this._err.manageError(err);
          throw new Error("Error al hacer la consulta http");
        })
      );
  }
  signup(usuarioForm: any) {
    // Verifcar los datos con Backend
    this.http
      .post(this.basePath + "auth/signup", usuarioForm, {
        headers: this.headers
      })
      .subscribe(
        (data: Credential) => {
          console.log(data);
          // this._msgS.show("succses", "Usuario registrado ");
        },
        (error: any) => {
          this._err.manageError(error);
        }
      );
  }
}

export interface LogginForm {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface Credential {
  idEntidad: number;
  idOwner: number;
  idUsuario: string;
  token: string;
  isLogged: boolean;
  rol: number;
  username: string;
  dir: string;
  email?: string;
  picture?: string;
  owner?: boolean;
  isOwner?: boolean;
}
