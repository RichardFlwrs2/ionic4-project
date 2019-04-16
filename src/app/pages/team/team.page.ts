import { Component, OnInit } from "@angular/core";
import { UsuariosService } from "src/app/services/api/users.service";
import { Credential } from "src/app/services/api/login.service";
import { StorageService } from "src/app/services/auth/storage.service";
import { UsuarioGpList } from "src/app/interfaces/Usuario";

@Component({
  selector: "app-team",
  templateUrl: "./team.page.html",
  styleUrls: ["./team.page.scss"]
})
export class TeamPage implements OnInit {
  session: Credential = this._sts.loadSessionData();

  users: UsuarioGpList[] = [];

  constructor(private _users: UsuariosService, private _sts: StorageService) {
    this._users.getUsersByOwner(this.session.idUsuario).subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }

  ngOnInit() {}
}
