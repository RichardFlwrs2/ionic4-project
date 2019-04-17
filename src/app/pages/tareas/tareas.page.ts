import { Component, OnInit, ViewChild } from "@angular/core";
import { StorageService } from "src/app/services/auth/storage.service";
import { TareasService } from "./tareas.service";
import { TaskService } from "src/app/services/api/tasks.service";

import { OptionsInput } from "@fullcalendar/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { calendarOptions } from "./calendar-options";
import { TaskCatalog } from "src/app/Interfaces/Task.interface";
import { IonSegment } from "@ionic/angular";

@Component({
  selector: "app-tareas",
  templateUrl: "./tareas.page.html",
  styleUrls: ["./tareas.page.scss"]
})
export class TareasPage implements OnInit {
  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| Properties
  // ---------------------------------------------------------------------------------------------------------------- //
  session = this._sts.loadSessionData();
  tareas: any[] = [];
  options: OptionsInput = calendarOptions;

  @ViewChild(IonSegment) segment: IonSegment;

  constructor(private _sts: StorageService, private _tareaCtrl: TareasService, private _taskS: TaskService) {}

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| Init Calendar and getting data
  // ---------------------------------------------------------------------------------------------------------------- //
  @ViewChild("fullcalendar") fullcalendar: FullCalendarComponent;
  ngOnInit() {
    this.segment.value = "calendario";

    this._taskS.getTaskByIdUser(this.session.idUsuario).subscribe((res: any) => {
      console.log(res);
      this.tareas = this.fillEvents(res);
      // this.options = this._tareaCtrl.getCalendarOptions(res);
    });
  }

  segmentChanged(event: any) {
    const value = event.detail.value;
    // console.log(value);
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| EVENTS (TAREAS) setting data for the calendar
  // ---------------------------------------------------------------------------------------------------------------- //
  fillEvents(tasks: TaskCatalog[]): any[] {
    const TASK_EVENTS: any[] = [];
    const taskEmpty = tasks === null || tasks.length === 0 ? true : false;

    if (taskEmpty) {
      TASK_EVENTS.push({
        id: null,
        title: null,
        start: null,
        end: null,
        color: null,
        userId: null
      });
    } else {
      tasks.forEach((_t: TaskCatalog) => {
        TASK_EVENTS.push({
          id: _t.idTask,
          title: _t.title + (_t.iduser == null ? "" : " - " + _t.username),
          start: _t.startDate,
          end: _t.endDate,
          color: "var(--ion-color-primary)",
          userId: _t.iduser
        });
      });
    }

    return TASK_EVENTS;
  }

  // ---------------------------------------------------------------------------------------------------------------- //
  // * ---| EVENTS METHODS
  // ---------------------------------------------------------------------------------------------------------------- //
  eventClick(model) {
    console.log(model);
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    // console.log(model);
  }
}
