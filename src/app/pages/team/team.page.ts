import { Component, OnInit } from "@angular/core";
import { UsuariosService } from "src/app/services/api/users.service";
import { Credential } from "src/app/services/api/login.service";
import { StorageService } from "src/app/services/auth/storage.service";
import { UsuarioGpList } from "src/app/interfaces/Usuario";
import { NuevaEntidadComponent } from "src/app/shared/components/nueva-entidad/nueva-entidad.component";
import { ModalController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-team",
  templateUrl: "./team.page.html",
  styleUrls: ["./team.page.scss"]
})
export class TeamPage implements OnInit {
  users: UsuarioGpList[] = [];

  constructor(private _users: UsuariosService, private _sts: StorageService, private modalCtrl: ModalController, private router: Router) {
    this._users.getUsersByOwner(this._sts.session.idUsuario).subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }

  async openModal() {
    // Create a modal using MyModalComponent with some initial data
    const modal = await this.modalCtrl.create({
      component: NuevaEntidadComponent,
      componentProps: {
        tipo: "usuario"
      }
    });

    await modal.present();
  }

  goToDetail(user: UsuarioGpList) {
    console.log(user);
    this.router.navigate(["/tabs/detalle/usuario/", user.idUsuario]);
  }

  ngOnInit() {}
}
