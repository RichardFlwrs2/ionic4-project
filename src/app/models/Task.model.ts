import { UserTask, Nota } from "../interfaces/Task.interface";
import { environment } from "../../environments/environment";
import { Credential } from "../interfaces/LogginForm";

export class Task {
  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| PROPERTIES
  // ---------------------------------------------------------------------------------------------------------------- //
  private d: boolean = !environment.production;
  private session: Credential = JSON.parse(localStorage.getItem("session-livestat"));

  public idTask: number = null;
  public ownerId: any = this.session.idUsuario;
  public ownerName: string = this.session.username;

  public title: string = this.d ? "Default title" : null;
  public taskTypeId: any = this.d ? 6 : null; // 6: Llamada | 7: Emial | 8: Reunion | 9: Visita | 10: Por Hacer | 11: Entrega
  public typeCalendarId: 32 | 31 = 32; // 31 calendarizado || 32 plazo
  public startDate: any = new Date(new Date().getTime() + 3600000).toString();
  public endDate: any = new Date(new Date().getTime() + 7200000).toString();
  public hasReminder: boolean = false;
  public time: number = 10;
  public unitTimeId: number = 12;
  public notas: Nota[] = [{ description: "" }];
  public users: any[] = [{ userId: this.session.idUsuario, statusId: 1 }];
  public contactos: any[] = [];
  public direcciones: any[] = [];
  public formularios: any[] = [];
  public empresas: any[] = [];

  // TEMPORARY PROPERTIES
  public userSelected: UserTask;
  public isPlazo: boolean;
  public isOwner: boolean = true;

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| CONSTRUCTOR
  // ---------------------------------------------------------------------------------------------------------------- //
  constructor(data?) {
    //
    if (data) {
      const props = Object.keys(this);
      for (const i in props) {
        if (data[props[i]]) this[props[i]] = data[props[i]];
      }
    }

    // Datos que no llegan de la API y se deben setear desde aquí
    this.isPlazo = this.typeCalendarId === 32 ? true : false;

    // Se valida si es el owner
    this.isOwner = this.session.idUsuario === this.ownerId ? true : false;

    //
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ----------------------------------| SETTERS & GETTERS |-------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------- //

  // * ---| Obtener los datos del usuario de la tarea en sí |--- >
  public set_userSelected(id_user: number) {
    this.userSelected = this.users.find(u => u.userId === id_user);
  }

  // * ---| DATA FOR FORM-BUILD |--- >
  public get_form_build() {
    return {
      title: this.title,
      taskTypeId: this.taskTypeId,
      isPlazo: this.isPlazo,
      hasReminder: this.hasReminder,
      time: this.time,
      unitTimeId: this.unitTimeId
    };
  }

  // * ---| UPDATE TASK PROPERTIES FROM FORM DATA |--- >
  public set_taskData(taskForm) {
    this.title = taskForm.title;
    this.taskTypeId = taskForm.taskTypeId;
    this.typeCalendarId = taskForm.isPlazo ? 32 : 31;
    this.hasReminder = taskForm.hasReminder;
    this.time = this.hasReminder ? taskForm.time : null;
    this.unitTimeId = taskForm.unitTimeId;

    // se le agrega el status
    this.users.forEach(u => (u.statusId = 1));
  }

  // * ---| DATA FOR HTTP REQUEST |--- >
  public get_api_build() {
    return {
      contactos: this.contactos,
      direcciones: this.direcciones,
      empresas: this.empresas,
      endDate: this.endDate,
      formularios: this.formularios,
      hasReminder: this.hasReminder,
      idTask: this.idTask,
      notas: this.notas,
      ownerId: this.ownerId,
      ownerName: this.ownerName,
      startDate: this.startDate,
      taskTypeId: this.taskTypeId,
      time: this.time,
      title: this.title,
      typeCalendarId: this.typeCalendarId,
      unitTimeId: this.unitTimeId,
      users: this.users
    };
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // ? ---------------------------------------------| METHODS |------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------- //

  // * ---| Agrega la entidad al arreglo seleccionado de la Tarea |--- >
  public selectEntity(
    ENTITY_DATA: any,
    entity_type: "contactos" | "formularios" | "empresas" | "users",
    idEntity: "idContacto" | "idEmpresa" | "idSurvey" | "idUsuario",
    push_id: "companyId" | "contactId" | "formId" | "userId"
  ) {
    const idx: number = this[entity_type].findIndex(e => e[push_id].toString() === ENTITY_DATA[idEntity].toString());

    if (idx !== -1) {
      // Ya existe, se borra del arreglo
      this[entity_type].splice(idx, 1);
      ENTITY_DATA["checked"] = false;
    } else {
      // No existe, se agrega en el arreglo
      this[entity_type].push({ [push_id]: ENTITY_DATA[idEntity] });
      ENTITY_DATA["checked"] = true;
    }

    console.log(this.get_api_build());
    //
  }

  // * ---| Verifica las fechas de la Tarea |--- >
  public isDatesCorrect(): boolean {
    const startD: number = new Date(this.startDate).getTime();
    const endD: number = new Date(this.endDate).getTime();

    return startD <= endD ? true : false;
  }
}
