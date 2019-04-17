import { Component, OnInit, ViewChild } from "@angular/core";
import { StorageService } from "src/app/services/auth/storage.service";
import { TareasService } from "./tareas.service";
import { TaskService } from "src/app/services/api/tasks.service";

import { OptionsInput } from "@fullcalendar/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { calendarOptions } from "./calendar-options";

@Component({
  selector: "app-tareas",
  templateUrl: "./tareas.page.html",
  styleUrls: ["./tareas.page.scss"]
})
export class TareasPage implements OnInit {
  session = this._sts.loadSessionData();
  tareas: any[] = [];
  options: OptionsInput = calendarOptions;
  eventsModel: any;

  constructor(private _sts: StorageService, private _tareaCtrl: TareasService, private _taskS: TaskService) {}

  @ViewChild("fullcalendar") fullcalendar: FullCalendarComponent;

  ngOnInit() {
    this._taskS.getTaskByIdUser(this.session.idUsuario).subscribe((res: any) => {
      console.log(res);
      this.tareas = res;
      // this.options = this._tareaCtrl.getCalendarOptions(res);
    });
  }
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
