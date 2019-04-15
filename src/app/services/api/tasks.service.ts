import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { environment } from "../../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { ErrorsService } from "../messages/errors.service";
import { IonToastService } from '../messages/ion-toast.service';
import { Task } from "../../models/Task.model";

@Injectable({providedIn: "root"})
export class TaskService {
  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| PROPERTIES
  // ---------------------------------------------------------------------------------------------------------------- //
  private headers;
  apiPath = environment.api;
  // cargando
  cargando = true;

  // Observer
  public observerParent = new Subject<any>();

  constructor(
    private http: HttpClient,
    private _err: ErrorsService,
    private _msge: IonToastService
  ) {
    this.headers = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("authToken")
    );
  }

  getHeader(): HttpHeaders {
    return new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("authToken"));
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| getTaskByIdUser
  // ---------------------------------------------------------------------------------------------------------------- //
  getTaskByIdUser(userLogged: string, idUser?: number[]) {
    //
    this.cargando = true;
    const result = idUser == null ? "" : idUser.map(a => a).join(", ");

    return this.http
      .get(this.apiPath + "task/getAllShortTaskByUserIds", {
        headers: this.getHeader(),
        params: {
          userLoged: userLogged,
          userId: result
        }
      })
      .pipe(
        map(res => {
          // console.log(res);
          this.cargando = false;
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this.cargando = false;
          throw new Error("Error al hacer la consulta http");
        })
      );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| getShortTaskForAgenda
  // ---------------------------------------------------------------------------------------------------------------- //
  getShortTaskForAgenda(userLogged: string) {
    //

    return this.http
      .get(this.apiPath + "task/getShortTaskForAgenda", {
        headers: this.getHeader(),
        params: {
          idUser: userLogged
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
  // ? ---| getTasksById
  // ---------------------------------------------------------------------------------------------------------------- //
  getTasksById(id: string) {
    //
    this.cargando = true;

    return this.http
      .get(this.apiPath + "task/getTasksById", {
        headers: this.getHeader(),
        params: {
          idTask: id
        }
      })
      .pipe(
        map(res => {
          this.cargando = false;
          // console.log("TASK BY ID", res);
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this.cargando = false;
          throw new Error("Error al hacer la consulta http");
        })
      );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| saveTask
  // ---------------------------------------------------------------------------------------------------------------- //
  saveTask(taskObj) {
    //
    this.cargando = true;

    console.log(taskObj);
    return this.http
      .post(this.apiPath + "task/saveTask", taskObj, {
        headers: this.getHeader(),
        params: {
          "taskObj[]": taskObj
        }
      })
      .pipe(
        map(res => {
          this.cargando = false;
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this.cargando = false;
          throw new Error("Error al hacer la consulta http");
        })
      );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| updateTask
  // ---------------------------------------------------------------------------------------------------------------- //
  updateTask(task) {
    //

    console.log(task);

    this.cargando = true;
    this.http.post(this.apiPath + "task/updateTask", task, { headers: this.getHeader() }).subscribe(
      data => {
        console.log(data);
        this.observerParent.next();
        this.cargando = false;
      },
      err => {
        this.cargando = false;
        this._err.manageError(err);
        this.observerParent.next();
      }
    );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| deleteTaskById
  // ---------------------------------------------------------------------------------------------------------------- //
  deleteTaskById(task: Task) {
    //

    this.cargando = true;
    return this.http
      .post(this.apiPath + "task/deleteTask", task, { headers: this.getHeader() })
      .pipe(
        map(res => {
          this.cargando = false;
          this.observerParent.next();
          return res;
        }),
        catchError(err => {
          this._err.manageError(err);
          this.cargando = false;
          throw new Error("Error al hacer la consulta http");
        })
      );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| GET MINOR DATA FOR FILL [SELECT] ELEMENTES
  // ---------------------------------------------------------------------------------------------------------------- //

  // Get ALL Catalog Types for SELECT elements
  getAllCatalogTypes() {
    return this.http
      .get(this.apiPath + "catalog/getAllCatalogTypes", {
        headers: this.getHeader(),
        params: {}
      })
      .pipe(
        map(res => res),
        catchError(err => {
          this._err.manageError(err);
          throw new Error("Error al hacer la consulta http");
        })
      );
  }

  getAllMetricsByUserId(id) {
    //

    return this.http.get(this.apiPath + "task/getAllMetricsByUserId", {
      headers: this.getHeader(),
      params: {
        idUser: id
      }
    });

    //
  }
}
