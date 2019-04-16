import { Component, OnInit, ViewChild } from "@angular/core";
import { StorageService } from "src/app/services/auth/storage.service";
import { TareasService } from "./tareas.service";
import { TaskService } from "src/app/services/api/tasks.service";

import { OptionsInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FullCalendarComponent } from "@fullcalendar/angular";

@Component({
  selector: "app-tareas",
  templateUrl: "./tareas.page.html",
  styleUrls: ["./tareas.page.scss"]
})
export class TareasPage implements OnInit {
  session = this._sts.loadSessionData();
  tareas: any[] = [];

  calendarOptions;

  constructor(private _sts: StorageService, private _tareaCtrl: TareasService, private _taskS: TaskService) {}

  options: OptionsInput;
  eventsModel: any;
  @ViewChild("fullcalendar") fullcalendar: FullCalendarComponent;
  ngOnInit() {
    this._taskS.getTaskByIdUser(this.session.idUsuario).subscribe((res: any) => {
      console.log(res);
      this.tareas = res;
      this.options = this._tareaCtrl.getCalendarOptions(res);
    });

    // this.options = {
    //   editable: true,
    //   customButtons: {
    //     myCustomButton: {
    //       text: "custom!",
    //       click: function() {
    //         alert("clicked the custom button!");
    //       }
    //     }
    //   },
    //   header: {
    //     left: "prev,next today myCustomButton",
    //     center: "title",
    //     right: "dayGridMonth"
    //   },
    //   plugins: [dayGridPlugin, interactionPlugin]
    // };
  }
  eventClick(model) {
    console.log(model);
  }
  eventDragStop(model) {
    console.log(model);
  }
  dateClick(model) {
    console.log(model);
  }
  updateHeader() {
    this.options.header = {
      left: "prev,next myCustomButton",
      center: "title",
      right: ""
    };
  }
  updateEvents() {
    this.eventsModel = [
      {
        title: "Updaten Event",
        start: this.yearMonth + "-08",
        end: this.yearMonth + "-10"
      }
    ];
  }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + "-" + (dateObj.getUTCMonth() + 1);
  }

  // ngOnInit() {
  //   this._taskS.getTaskByIdUser(this.session.idUsuario).subscribe((res: any) => {
  //     console.log(res);
  //     this.tareas = res;
  //     this.calendarOptions = this._tareaCtrl.getCalendarOptions(res);
  //   });

  // }

  // onCalendarInit(event) {
  //   console.log(event);
  // }
}
