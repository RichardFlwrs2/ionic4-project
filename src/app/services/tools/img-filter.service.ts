import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { StorageService } from "../auth/storage.service";

@Injectable({
  providedIn: "root"
})
export class ImgFilterService {
  directorio: string;

  constructor(public _sts: StorageService) {
    this.directorio = this._sts.session.dir;
  }

  getUrlPic(pictureUrl: string, type: "contacto" | "usuario" | "empresa" | "grupo"): string {
    // if (directorio === undefined) console.log('arguments');

    return environment.production
      ? `/livestat/v3/${this.directorio}/images/profiles/${type}/${pictureUrl}`
      : `${environment.server}v3/${this.directorio}/images/profiles/${type}/${pictureUrl}`;
  }

  getLogoImg() {
    return environment.production
      ? `/livestat/localImages/logo/livestatBlack.png`
      : `${environment.server}localImages/logo/livestatBlack.png`;
  }

  getLogginImg() {
    return environment.production ? `/livestat/localImages/logo/ls-banner.png` : `${environment.server}localImages/logo/ls-banner.png`;
  }
}
