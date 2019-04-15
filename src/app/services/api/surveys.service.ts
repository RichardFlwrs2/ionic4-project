import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subject } from "rxjs/Subject";
import { map, catchError } from "rxjs/operators";
import { ErrorsService } from "../messages/errors.service";
import { IonToastService } from '../messages/ion-toast.service';

@Injectable({providedIn: "root"})
export class SurveyService {
  private headers: HttpHeaders;
  public userDetail = "";
  public SurveysArr: any = [];
  private basePath = environment.api;
  updateSurveys = new Subject<any>();

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

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---| getSurveyByOwner
  // ---------------------------------------------------------------------------------------------------------------- //
  getSurveyByOwner(idUsuario: string) {
    //

    return this.http
      .get(this.basePath + "survey/getSurveyByOwner", {
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
  // ? ---| getSurveyByDetailUser
  // ---------------------------------------------------------------------------------------------------------------- //
  getSurveyByDetailUser(id) {
    //

    return this.http
      .get(this.basePath + "survey/getSurveyByDetailUser", {
        headers: this.headers,
        params: {
          idUsuario: id
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
  // ? ---| getSurveysByUser
  // ---------------------------------------------------------------------------------------------------------------- //
  getSurveysByUser(idUsuario: string) {
    //

    return this.http
      .get(this.basePath + "survey/getSurveysByUser", {
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
  // ? ---| deleteSurvey
  // ---------------------------------------------------------------------------------------------------------------- //
  deleteSurvey(idSurvey) {
    //

    return this.http
      .delete(this.basePath + "survey/delete", {
        headers: this.headers,
        params: {
          id: idSurvey
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
  // ? ---| getAssignedSurveysByUser
  // ---------------------------------------------------------------------------------------------------------------- //
  getAssignedSurveysByUser(idUsuario: string) {
    //

    return this.http
      .get(this.basePath + "survey/getAssignedSurveysByUser", {
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
  // ? ---| addSurveyToUse
  // ---------------------------------------------------------------------------------------------------------------- //
  addSurveyToUse(idSurveys, idUser) {
    //

    this.SurveysArr = [];
    this.http
      .post(this.basePath + "survey/addSurveyToUser", idSurveys, {
        headers: this.headers,
        params: {
          idUsuario: idUser
        }
      })
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| UTILITIES
  // ---------------------------------------------------------------------------------------------------------------- //
  buildSurveys(surveysToShare: any) {
    //

    this.SurveysArr = surveysToShare;
    // surveysToShare.formularios.join(", ");
    this.updateSurveys.next();

    //
  }
}
