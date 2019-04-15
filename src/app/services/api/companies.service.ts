import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { ErrorsService } from "../messages/errors.service";
import { IonToastService } from '../messages/ion-toast.service';

@Injectable({providedIn: "root"})
export class CompaniesService {
  private headers: HttpHeaders;
  private basePath = environment.api;
  newcompany = new Subject<any>();

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

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| GET BY OWNER
  // ---------------------------------------------------------------------------------------------------------------- //
  getEmpresasByOwner(idUsuario: string) {
    //

    return this.http
      .get<any>(this.basePath + "entidad/empresa/getEmpresasByOwner", {
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
  // ? ---| GET BY ID
  // ---------------------------------------------------------------------------------------------------------------- //
  getEmpresaById(idEmpresa: string) {
    //

    return this.http
      .get(this.basePath + "entidad/empresa/getEmpresaById", {
        headers: this.headers,
        params: {
          id: idEmpresa
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
  // ? ---| GET DIRECCION
  // ---------------------------------------------------------------------------------------------------------------- //
  getDirection(empresa: any) {
    //

    let direccion = {
      nombre: "",
      calle: empresa.calle,
      colonia: empresa.colonia,
      codigopostal: empresa.codigopostal,
      ciudad: empresa.ciudad,
      estado: empresa.estado,
      pais: "México"
    };

    if (empresa.manualDir) {
      direccion.nombre =
        empresa.calle +
        ", " +
        empresa.colonia +
        ", " +
        empresa.codigopostal +
        ", " +
        empresa.ciudad +
        ", " +
        empresa.estado;
    } else {
      direccion = empresa.direccion;
    }

    return direccion;

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| BUILD
  // ---------------------------------------------------------------------------------------------------------------- //
  createEmpresa(empresa, sharedWith, idUsuario) {
    //

    const ENTIDAD = {
      nombre: empresa.nombre,
      direccion: this.getDirection(empresa),
      tipoEntidad: {
        idTipoEntidad: 2
      },
      idUsuarioOwner: idUsuario,
      active: true
    };

    const COMPANY = {
      entidad: ENTIDAD
    };

    const idUsers = sharedWith.usuarios.join(", ");
    const idGroups = sharedWith.grupos.join(", ");
    return this.saveEmpresa(COMPANY, idUsers, idGroups).pipe(
      map(res => res),
      catchError(err => {
        this._err.manageError(err);
        throw new Error("Error al hacer la consulta http");
      })
    );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| CREATE
  // ---------------------------------------------------------------------------------------------------------------- //
  saveEmpresa(company, idUsers, idGroups) {
    //

    console.log(company);

    return this.http
      .post(this.basePath + "entidad/empresa/saveEmpresa", company, {
        headers: this.headers,
        params: {
          "idUsers[]": idUsers,
          "idGroups[]": idGroups
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
  // ? ---| GET CONTACTOS BY EMPRESA
  // ---------------------------------------------------------------------------------------------------------------- //
  getContactosByEmpresa(idUsuario: string) {
    //

    return this.http
      .get(this.basePath + "entidad/empresa/getContactosByEmpresa", {
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
  // ? ---| UPDATE EMPRESA
  // ---------------------------------------------------------------------------------------------------------------- //
  updateCompanie(empresa) {
    //

    console.log(empresa);
    return this.http
      .put(this.basePath + "entidad/empresa/updateEmpresa", empresa, {
        headers: this.headers
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
  // ? ---| DELETE EMPRESA
  // ---------------------------------------------------------------------------------------------------------------- //
  deleteCompanieById(idEmpresa: string) {
    //

    return this.http
      .delete(this.basePath + "entidad/empresa/deleteEmpresaById", {
        headers: this.headers,
        params: {
          id: idEmpresa
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
