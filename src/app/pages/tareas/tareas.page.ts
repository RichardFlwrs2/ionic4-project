import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/services/auth/storage.service";
import { TareasService } from "./tareas.service";
import { TaskService } from "src/app/services/api/tasks.service";

@Component({
  selector: "app-tareas",
  templateUrl: "./tareas.page.html",
  styleUrls: ["./tareas.page.scss"]
})
export class TareasPage implements OnInit {
  session = this._sts.loadSessionData();
  tareas: any[] = [];

  constructor(private _sts: StorageService, private testt: TareasService, private _taskS: TaskService) {}

  ngOnInit() {
    this._taskS.getTaskByIdUser(this.session.idUsuario).subscribe((res: any) => {
      console.log(res);
      this.tareas = res;
    });
  }
}
