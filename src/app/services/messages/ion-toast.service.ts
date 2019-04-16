import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class IonToastService {
  constructor(private toastController: ToastController) {}

  public async toast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: "text-center",
      position: "bottom"
    });
    toast.present();
  }

  public async toastWithOptions(message: string) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: "middle",
      closeButtonText: "Ok"
    });
    toast.present();
  }
}
