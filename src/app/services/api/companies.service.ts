import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { ErrorsService } from "../messages/errors.service";
import { IonToastService } from "../messages/ion-toast.service";
import { ImgFilterService } from "../tools/img-filter.service";
import { LoadingService } from "../tools/loading.service";
import { StorageService } from "../auth/storage.service";

@Injectable({ providedIn: "root" })
export class CompaniesService {
  private headers: HttpHeaders;
  private basePath = environment.api;
  newcompany = new Subject<any>();

  constructor(
    private http: HttpClient,
    private _err: ErrorsService,
    private _msge: IonToastService,
    private _img: ImgFilterService,
    private _loading: LoadingService,
    private _sts: StorageService
  ) {
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + this._sts.token);
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| GET BY OWNER
  // ---------------------------------------------------------------------------------------------------------------- //
  getEmpresasByOwner(idUsuario: string) {
    //
    this._loading.trigger.next(true);

    return this.http
      .get<any>(this.basePath + "entidad/empresa/getEmpresasByOwner", {
        headers: this.headers,
        params: {
          id: idUsuario
        }
      })
      .pipe(
        map(res => {
          res.forEach(e => {
            if (e.picture) e.pictureUrl = this._img.getUrlPic(e.picture, "contacto");
          });
          this._loading.trigger.next(false);
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this._loading.trigger.next(false);
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
    this._loading.trigger.next(true);

    return this.http
      .get(this.basePath + "entidad/empresa/getEmpresaById", {
        headers: this.headers,
        params: {
          id: idEmpresa
        }
      })
      .pipe(
        map(res => {
          this._loading.trigger.next(false);
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this._loading.trigger.next(false);
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
        empresa.calle + ", " + empresa.colonia + ", " + empresa.codigopostal + ", " + empresa.ciudad + ", " + empresa.estado;
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
    this._loading.trigger.next(true);

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
      map(res => {
        this._loading.trigger.next(false);
        return res;
      }),
      catchError(err => {
        this._err.manageError(err);
        this._loading.trigger.next(false);
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
    this._loading.trigger.next(true);

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
        map(res => {
          this._loading.trigger.next(false);
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this._loading.trigger.next(false);
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
    this._loading.trigger.next(true);

    return this.http
      .get(this.basePath + "entidad/empresa/getContactosByEmpresa", {
        headers: this.headers,
        params: {
          id: idUsuario
        }
      })
      .pipe(
        map(res => {
          this._loading.trigger.next(false);
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this._loading.trigger.next(false);
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
    this._loading.trigger.next(true);

    console.log(empresa);
    return this.http
      .put(this.basePath + "entidad/empresa/updateEmpresa", empresa, {
        headers: this.headers
      })
      .pipe(
        map(res => {
          this._loading.trigger.next(false);
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this._loading.trigger.next(false);
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
    this._loading.trigger.next(true);

    return this.http
      .delete(this.basePath + "entidad/empresa/deleteEmpresaById", {
        headers: this.headers,
        params: {
          id: idEmpresa
        }
      })
      .pipe(
        map(res => {
          this._loading.trigger.next(false);
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this._loading.trigger.next(false);
          throw new Error("Error al hacer la consulta http");
        })
      );

    //
  }
}
