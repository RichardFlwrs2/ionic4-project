import { Component, OnInit } from "@angular/core";
import { Credential, LogginService } from "src/app/services/api/login.service";
import { StorageService } from "src/app/services/auth/storage.service";
import { ModalController } from "@ionic/angular";
import { SessionService } from "src/app/services/auth/session.service";

@Component({
  selector: "app-session-info",
  templateUrl: "./session-info.page.html",
  styleUrls: ["./session-info.page.scss"]
})
export class SessionInfoPage implements OnInit {
  session: Credential;

  constructor(
    private _sts: StorageService,
    private modalCtrl: ModalController,
    private _logout: LogginService,
    private _session: SessionService
  ) {
    this.session = this._sts.loadSessionData();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  exitSession() {
    this._logout.logOut().subscribe(res => {
      this._session.exit();
      this.modalCtrl.dismiss();
    });
  }

  ngOnInit() {}
}
