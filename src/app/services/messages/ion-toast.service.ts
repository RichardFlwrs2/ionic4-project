import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class IonToastService {
  constructor(public toastController: ToastController) {}

  public async toast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  public async toastWithOptions() {
    const toast = await this.toastController.create({
      message: "Click to Close",
      showCloseButton: true,
      position: "top",
      closeButtonText: "Done"
    });
    toast.present();
  }
}
