import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs/Subject";
import { UserForm, Usuario } from "../../interfaces/Usuario";
import { Entidad } from "../../interfaces/Entidad";
import { Grupo } from "../../interfaces/UserGroups";
import { map, catchError } from "rxjs/operators";
import { ErrorsService } from "../messages/errors.service";
import { IonToastService } from '../messages/ion-toast.service';

@Injectable({providedIn: "root"})
export class UsuariosService {
  private headers: HttpHeaders;
  private basePath = environment.api;
  newUser = new Subject<any>();
  errNewUser = new Subject<any>();

  constructor(
    private router: Router,
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
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ------------------------| USUARIOS
  // ---------------------------------------------------------------------------------------------------------------- //

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| getUsersByOwner
  // ---------------------------------------------------------------------------------------------------------------- //
  getUsersByOwner(idUsuario: string) {
    //

    return this.http
      .get(this.basePath + "usuario/getUsuariosByOwner", {
        headers: this.headers,
        params: {
          id: idUsuario
        }
      })
      .pipe(
        map((res: any[]) => {
          // Se le agrega la propiedad isSelected para validar cuando se creen grupos

          res.forEach(user => (user.isSelected = false));
          return res;

          //
        }),
        catchError(err => {
          this._err.manageError(err);
          throw new Error("Error al hacer la consulta http");
        })
      );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---|   getUserById
  // ---------------------------------------------------------------------------------------------------------------- //
  getUserById(id: string) {
    //

    return this.http
      .get(this.basePath + "usuario/getUsuarioById", {
        headers: this.headers,
        params: {
          id: id
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
  // ? ---| buildData
  // ---------------------------------------------------------------------------------------------------------------- //
  buildData(idUsuario: string, idSurveys: any, idGroups: any, formData: UserForm) {
    //

    // Guarda los datos del Form a Entidad
    const USER_EMAIL = [
      {
        nombre: formData.email,
        tipoEmail: {
          idTipoEmail: 2,
          nombre: "Personal"
        }
      }
    ];
    const USER_PHONE = [];

    formData.telefono.forEach((telefono: any) => {
      const phone: any = {
        numero: telefono.numero.replace(/\D+/g, ""),
        tipoTelefono: {
          idTipoTelefono: telefono.tipo
        }
      };
      USER_PHONE.push(phone);
    });

    const ENTIDAD: Entidad = {
      nombre: formData.nombre,
      email: USER_EMAIL,
      telefono: USER_PHONE,
      tipoEntidad: { idTipoEntidad: 1 }, // 1--> Usuario
      active: true,
      idUsuarioOwner: idUsuario
    };

    const USUARIO: Usuario = {
      username: formData.username,
      password: formData.formPasswords.password,
      tipoUsuario: { idTipoUsuario: 3 }, // 3-->Basico
      userRole: {
        idRole: 3,
        nombre: "BASIC"
      },
      entidad: ENTIDAD
    };
    this.createUser(idUsuario, idSurveys, idGroups, USUARIO);

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| createUser
  // ---------------------------------------------------------------------------------------------------------------- //
  createUser(idUsuario: string, idSurveys: string, idGroups: string, usuario: any) {
    //

    return this.http
      .post(this.basePath + "usuario/saveUsuario", usuario, {
        headers: this.headers,
        params: {
          id: idUsuario,
          "idSurveys[]": idSurveys,
          "idGroups[]": idGroups
        }
      })
      .subscribe(
        data => {
          this._msge.toast("Usuario creado con exito");
          this.newUser.next();
        },
        error => this._err.manageError(error)
      );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| updateUser
  // ---------------------------------------------------------------------------------------------------------------- //
  updateUser(user: any) {
    //

    return this.http
      .put(this.basePath + "usuario/updateUsuario", user, {
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
  // ? ---| deleteUser
  // ---------------------------------------------------------------------------------------------------------------- //
  deleteUser(id: string) {
    //

    this.http
      .delete(this.basePath + "usuario/deleteUsuarioById", {
        headers: this.headers,
        params: {
          id: id
        }
      })
      .subscribe(
        data => {
          // console.log(data);
          this.router.navigate(["/team"]);
        },
        error => {
          console.log(error);
        }
      );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ------------------------| GRUPOS
  // ---------------------------------------------------------------------------------------------------------------- //

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| createGrupo
  // ---------------------------------------------------------------------------------------------------------------- //
  createGrupo(grupo: Grupo, imageFile?: any) {
    //

    const fd: FormData = new FormData();
    fd.append("imageFile", imageFile);
    return this.http
      .post(this.basePath + "usuario/grupo/saveGrupoUsuario", [grupo], {
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
  // ? ---| getGruposByOwner
  // ---------------------------------------------------------------------------------------------------------------- //
  getGruposByOwner(idUsuario: string) {
    //

    return this.http
      .get(this.basePath + "usuario/grupo/getGruposByOwner", {
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
  // ? ---| getGruposByUsuario
  // ---------------------------------------------------------------------------------------------------------------- //
  getGruposByUsuario(idUsuario: string) {
    //

    return this.http
      .get(this.basePath + "usuario/grupo/getGruposByUsuario", {
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
  // ? ---| editarGrupo
  // ---------------------------------------------------------------------------------------------------------------- //
  editarGrupo(grupo: Grupo, option: string) {
    //

    let query: string;
    if (option === "add") query = "usuario/grupo/addUsuariosToGrupo";
    if (option === "delete") query = "usuario/grupo/deleteUsuarioFromGrupo";

    return this.http
      .put(this.basePath + query, grupo, {
        headers: this.headers,
        params: {
          idGrupo: grupo.idGrupo.toString(),
          "idUsuarios[]": grupo.ids.join(", ")
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
  // ? ---| updateGroupName
  // ---------------------------------------------------------------------------------------------------------------- //
  updateGroupName(grupoId: number, nombre: string) {
    //

    return this.http
      .put(this.basePath + "usuario/grupo/updateGrupoName", nombre, {
        headers: this.headers,
        params: {
          id: grupoId.toString(),
          nombre: nombre
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
  // ? ---| borrarGrupo
  // ---------------------------------------------------------------------------------------------------------------- //
  borrarGrupo(grupo: Grupo) {
    //

    return this.http
      .delete(this.basePath + "usuario/grupo/deleteGrupoUsuario", {
        headers: this.headers,
        params: {
          id: grupo.idGrupo.toString()
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
