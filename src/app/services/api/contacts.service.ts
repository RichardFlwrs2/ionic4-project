import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs/Subject";
import { map, catchError } from "rxjs/operators";
import { ErrorsService } from "../messages/errors.service";
import * as moment from "moment";
import { IonToastService } from "../messages/ion-toast.service";
import { ImgFilterService } from "../tools/img-filter.service";
import { LoadingService } from "../tools/loading.service";
import { StorageService } from "../auth/storage.service";

@Injectable({ providedIn: "root" })
export class ContactsService {
  private headers: HttpHeaders;
  public contacts;
  private basePath = environment.api;

  public newcontact = new Subject<any>();

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
  // ? ---| GET CONTACTOS
  // ---------------------------------------------------------------------------------------------------------------- //
  getContactosByOwner(idUsuario: string) {
    //
    this._loading.trigger.next(true);

    return this.http
      .get<any>(this.basePath + "entidad/contacto/getContactosByOwner", {
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
  // ? ---| GET CONTACTO BY ID
  // ---------------------------------------------------------------------------------------------------------------- //
  getContactoById(id) {
    //
    this._loading.trigger.next(true);

    return this.http
      .get(this.basePath + "entidad/contacto/getContactoById", {
        headers: this.headers,
        params: {
          id: id.toString()
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
  // ? ---| BUILD
  // ---------------------------------------------------------------------------------------------------------------- //
  buildData(formData, camposExtra, sharedWith: any, idUsuario: string) {
    const CONTACT_CAMPOS = [];
    const CONTACT_EMAIL = [];
    const CONTACT_PHONE = [];
    let USER_STATUS;
    let EMPRESA = null;

    // TELEFONOS
    formData.telefono.forEach((telefono: any) => {
      const phone: any = {
        numero: telefono.numero.replace(/\D+/g, ""),
        tipoTelefono: {
          idTipoTelefono: telefono.tipo
        }
      };
      CONTACT_PHONE.push(phone);
    });

    // EMAILS
    formData.email.forEach((email: any) => {
      const mail: any = {
        nombre: email.nombre,
        tipoEmail: {
          idTipoEmail: email.tipo
        }
      };
      CONTACT_EMAIL.push(mail);
    });

    // CAMPOS EXTRA
    camposExtra.forEach((campo: any) => {
      const field: any = {
        campoExtra: {
          idCampoExtra: campo.idCampoExtra,
          idCampoType: campo.idCampoType
        },
        text: campo.idCampoType === 33 ? campo.value : null,
        value: this.getValue(campo),
        direccion: campo.idCampoType === 37 ? campo.address : null,
        catalogoAnswers: this.getCatalogo(campo)
      };
      CONTACT_CAMPOS.push(field);
    });

    // ESTATUS
    USER_STATUS = {
      idEstatus: formData.estatus.idEstatus,
      nombre: formData.estatus.nombre,
      color: formData.estatus.color
    };

    // ENTIDAD
    const ENTIDAD = this.generateEntidad(formData.nombre, CONTACT_EMAIL, CONTACT_PHONE, USER_STATUS, idUsuario, 3);

    // ENTIDAD DE COMPAÑÍA
    if (formData.compañia) {
      EMPRESA = {
        idEmpresa: formData.compañia.idEmpresa
        // entidad: this.generateEntidad(
        //   formData.compañia.nombre,
        //   [],
        //   [],
        //   null,
        //   formData.compañia.idUsuario,
        //   2
        // )
      };
    }

    const CONTACTO = {
      entidad: ENTIDAD,
      empresa: EMPRESA
    };

    const idUsers = sharedWith.usuarios.join(", ");
    const idGroups = sharedWith.grupos.join(", ");
    return this.saveContacto(CONTACTO, { campos: CONTACT_CAMPOS }, idUsers, idGroups);
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| CREATE CONTACTO
  // ---------------------------------------------------------------------------------------------------------------- //
  saveContacto(contacto, campos, idUsers, idGroups) {
    //
    this._loading.trigger.next(true);

    return this.http
      .post(this.basePath + "entidad/contacto/saveContacto", [contacto, campos], {
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
  // ? ---| UPDATE
  // ---------------------------------------------------------------------------------------------------------------- //
  updateContacto(contacto) {
    //
    this._loading.trigger.next(true);

    console.log(contacto);
    return this.http
      .put(this.basePath + "entidad/contacto/updateContacto", contacto, {
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
  // ? ---| DELETE
  // ---------------------------------------------------------------------------------------------------------------- //
  deleteContactoById(id: string) {
    //
    this._loading.trigger.next(true);

    return this.http
      .delete(this.basePath + "entidad/contacto/deleteContactoById", {
        headers: this.headers,
        params: {
          id: id
        }
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

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| GET SURVEYS BY ENTIDAD
  // ---------------------------------------------------------------------------------------------------------------- //
  getSurveyTemplatesByEntidad(idEntidad: String) {
    //
    this._loading.trigger.next(true);

    return this.http
      .get(this.basePath + "survey/getSurveyTemplatesByEntidad", {
        headers: this.headers,
        params: {
          idEntidad: idEntidad.toString()
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
  // * ---| UTILITIES
  // ---------------------------------------------------------------------------------------------------------------- //

  // ? - - - - - - - - - - -/ tiempo
  getValue(campo) {
    let value: any = null;
    if (campo.value) {
      switch (campo.idCampoType) {
        case 34:
          value = campo.value;
          break;
        case 35:
          value = new Date(campo.value + " 00:00:00").getTime();
          break;
        case 36:
          value = moment(campo.value, "HH:mm A").diff(moment().startOf("day"), "seconds");
          break;
      }
    }
    return value;
  }

  // ? - - - - - - - - - - -/ get Catalogo
  getCatalogo(campo) {
    let value: any = null;
    if (campo.value) {
      value = campo.idCampoType === 38 ? { idCatalogoAnswers: campo.value.idCatalogoAnswer } : null;
    }
    return value;
  }

  // ? - - - - - - - - - - -/ generar Entidad
  generateEntidad(nombre, correos, telefonos, estado, idUsuario, Type) {
    let entidad: any;
    entidad = {
      nombre: Type === 3 ? nombre : "test",
      email: correos,
      telefono: telefonos,
      tipoEntidad: { idTipoEntidad: Type },
      active: true,
      direccion: null, // TODO: utilizar api places
      picture: null, // ! enviar null
      estatus: estado,
      idUsuarioOwner: idUsuario
    };

    return entidad;
  }
}
