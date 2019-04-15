import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ErrorsService } from "../messages/errors.service";
import { map, catchError } from "rxjs/operators";
import { IonToastService } from '../messages/ion-toast.service';

@Injectable({providedIn: "root"})
export class FileService {
  private headers: HttpHeaders;
  private basePath = environment.api;

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
  // ? ---| GET ENTIDADES
  // ---------------------------------------------------------------------------------------------------------------- //
  getArchivoAdjuntos(idEntidad: string) {
    //

    return this.http
      .get(this.basePath + "file/getArchivoAdjuntos", {
        headers: this.headers,
        params: {
          idEntidad: idEntidad
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
  // ? ---| upload File
  // ---------------------------------------------------------------------------------------------------------------- //
  uploadFile(idEntidad: string, Archivo: any) {
    //

    const fd: FormData = new FormData();
    fd.append("file", Archivo);

    return this.http
      .post(this.basePath + "file/uploadFile", fd, {
        headers: this.headers,
        params: {
          idEntidad: idEntidad,
          Archivo: Archivo
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
  // ? ---| uploadImage
  // ---------------------------------------------------------------------------------------------------------------- //
  // tipoImagen: Entidad | Grupo | Portada
  uploadImage(id: string, imageFile: any, tipoImagen: string) {
    //

    const fd: FormData = new FormData();
    fd.append("imageFile", imageFile);

    return this.http
      .post(this.basePath + "file/uploadImage", fd, {
        headers: this.headers,
        params: {
          id: id,
          imageFile: imageFile,
          type: tipoImagen
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
  // ? ---| deleteFile
  // ---------------------------------------------------------------------------------------------------------------- //
  deleteFile(idArchivo: string) {
    //

    return this.http
      .delete(this.basePath + "file/deleteFile", {
        headers: this.headers,
        params: {
          idArchivo: idArchivo
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
  // ? ---| deleteImageByEntity
  // ---------------------------------------------------------------------------------------------------------------- //
  deleteImageByEntity(idEntidad: string) {
    //

    return this.http
      .delete(this.basePath + "file/deleteImageByEntity", {
        headers: this.headers,
        params: {
          idEntidad: idEntidad
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
  // ? ---| getDirectorioNombre
  // ---------------------------------------------------------------------------------------------------------------- //
  getDirectorioNombre(idUsuario: string) {
    //

    return this.http
      .get(this.basePath + "file/getDirectorioNombre", {
        headers: this.headers,
        params: {
          idUsuario: idUsuario
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
  // ? ---| getUrlFile
  // ---------------------------------------------------------------------------------------------------------------- //
  getUrlFile(directorio: any, idEntidad, fileName) {
    //

    return this.http
      .get(this.basePath + "v3/" + directorio + "/files/" + idEntidad + "/" + fileName, {
        responseType: "arraybuffer",
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
}
