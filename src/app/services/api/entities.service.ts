import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs/Subject";
import { Contacto } from "../../interfaces/Contacto";
import { ErrorsService } from "../messages/errors.service";
import { map, catchError } from "rxjs/operators";
import { IonToastService } from "../messages/ion-toast.service";
import { StorageService } from "../auth/storage.service";

@Injectable({ providedIn: "root" })
export class EntidadesService {
  private headers: HttpHeaders;

  private basePath = environment.api;
  // entidades que se compartirán en catálogo
  public entities: any[] = [];
  // usuarios con los que está compartido la entidad
  public sharedUsers: any[] = [];
  // Usuarios con los que se compartirán las entidades
  public UsersArr;
  public GroupsArr;
  // se dejará de compartir
  public Unshared;

  // Lista de Entidades
  public ls_contacts: Contacto[] = [];
  public ls_empresa: any[] = [];

  updateEntities = new Subject<any>();
  checkEntitiesShared = new Subject<any>();

  constructor(private http: HttpClient, private _err: ErrorsService, private _msge: IonToastService, private _sts: StorageService) {
    this.headers = new HttpHeaders().set("Authorization", "Bearer " + this._sts.token);
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| GET ENTIDADES
  // ---------------------------------------------------------------------------------------------------------------- //
  getCustomEntities(idEntidad, idUsuario: string) {
    // TODO pasar el subscriber a otro lado

    this.http
      .get(this.basePath + "entidad/sharedEntity/getCustomEntities", {
        headers: this.headers,
        params: {
          idUsuarioOwner: idUsuario,
          idEntidad: idEntidad
        }
      })
      .subscribe((rest: any) => {
        this.entities = rest;
        this.checkEntitiesShared.next();
      });

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| COMPARTIR ENTIDAD
  // ---------------------------------------------------------------------------------------------------------------- //
  fixEntities(idUsers, idGroups, idContacts, idCompanies, unshared) {
    //

    console.log(unshared);
    this.entities = [];
    this.UsersArr = [];
    this.GroupsArr = [];
    this.Unshared = {};

    return this.http
      .post(this.basePath + "entidad/sharedEntity/fixEntities", unshared, {
        headers: this.headers,
        params: {
          "idUsuarios[]": idUsers,
          "idGrupos[]": idGroups,
          "idContactos[]": idContacts,
          "idEmpresas[]": idCompanies
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
  // ? ---| GET ENTIDADES
  // ---------------------------------------------------------------------------------------------------------------- //
  getCamposExtrasByOwner() {
    //

    return this.http
      .get(this.basePath + "entidad/getCamposExtrasByOwner", {
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
  // ? ---| UTILITIES
  // ---------------------------------------------------------------------------------------------------------------- //
  entitiesShared(e: any, checked) {
    if (checked && e.shared) this.entities.push(e);
    else
      this.entities = this.entities.filter(function(ent) {
        if (ent.idEntidad === e.idEntidad || ent.idEntidad === undefined) return false;
        else return true;
      });
    // console.log(this.entities);
    this.checkEntitiesShared.next();
  }

  buildEntities(shareWith, stopSharing) {
    this.UsersArr = shareWith.usuarios.join(", ");
    this.GroupsArr = shareWith.grupos.join(", ");
    this.Unshared = stopSharing;
    this.updateEntities.next();
  }
}
