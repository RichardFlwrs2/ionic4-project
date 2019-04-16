import { Component, OnInit, Input } from "@angular/core";
import { StorageService } from "src/app/services/auth/storage.service";
import { ModalController } from "@ionic/angular";
import { SessionService } from "src/app/services/auth/session.service";
import { Credential } from "src/app/Interfaces/LogginForm";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormToolService } from "src/app/services/tools/form-tools.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-nueva-entidad",
  templateUrl: "./nueva-entidad.component.html",
  styleUrls: ["./nueva-entidad.component.scss"]
})
export class NuevaEntidadComponent implements OnInit {
  @Input() tipo: string;
  session: Credential = this._sts.loadSessionData();
  newEntityForm: FormGroup = new FormGroup({});
  d: boolean = environment.production;

  constructor(
    private _sts: StorageService,
    private modalCtrl: ModalController,
    private _session: SessionService,
    private fb: FormBuilder,
    public _fts: FormToolService
  ) {}

  ngOnInit() {
    this.initForm();
    console.log(this.newEntityForm);
  }

  initForm() {
    switch (this.tipo) {
      case "usuario":
        this.newEntityForm = this.fb.group({
          username: [null, this._fts.validators("L_Num")],
          nombre: [null, this._fts.validators("onlyL")]
        });
        break;

      case "contacto":
        break;

      case "empresa":
        break;

      default:
        break;
    }
  }

  sendForm() {
    console.log(this.newEntityForm.value);

    if (this.newEntityForm.invalid) {
      this._fts.markTouched(this.newEntityForm);
      return;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
