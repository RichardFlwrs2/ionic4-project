import { Component, OnInit, Input } from "@angular/core";
import { StorageService } from "src/app/services/auth/storage.service";
import { ModalController } from "@ionic/angular";
import { SessionService } from "src/app/services/auth/session.service";
import { Credential } from "src/app/Interfaces/LogginForm";

@Component({
  selector: "app-nueva-entidad",
  templateUrl: "./nueva-entidad.component.html",
  styleUrls: ["./nueva-entidad.component.scss"]
})
export class NuevaEntidadComponent implements OnInit {
  session: Credential = this._sts.loadSessionData();

  @Input() tipo: string;

  constructor(private _sts: StorageService, private modalCtrl: ModalController, private _session: SessionService) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
