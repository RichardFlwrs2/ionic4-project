import { Component, AfterViewInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { FormToolService } from "../services/tools/form-tools.service";
import { LogginService } from "../services/api/login.service";
import { SessionService } from "../services/auth/session.service";
import { LoadingService } from "../services/tools/loading.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements AfterViewInit {
  formLoggin: FormGroup;

  constructor(
    public _fts: FormToolService,
    private fb: FormBuilder,
    private _loading: LoadingService,
    private _login: LogginService,
    private _session: SessionService
  ) {
    this.formLoggin = this.fb.group({
      email: ["", this._fts.validators("email")],
      password: ["", [Validators.required]]
    });
  }

  ngAfterViewInit() {
    this._loading.trigger.next(false);
  }

  sendForm() {
    console.log(this.formLoggin.value);
    const message =
      "Este usuario está activo en otro dispositivo,\n" + " si continúa cerrará automáticamente la otra sesión.\n" + "¿Desea continuar? ";

    if (this.formLoggin.invalid) {
      this._fts.markTouched(this.formLoggin);
      return;
    }

    this._login.checkUserConnection(this.formLoggin.value).subscribe((res: boolean) => {
      //
      const isUserLoggedInOtherInstance = res;
      this.doLogin();

      // if (isUserLoggedInOtherInstance) {
      //   //
      //   if (confirm(message)) this.doLogin();

      //   //
      // } else this.doLogin();
    });
  }

  doLogin() {
    this._login.validateToLoggin(this.formLoggin.value).subscribe(res => {
      this._session.saveSession(res);
    });
  }
}
