import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SessionInfoPage } from '../session-info/session-info.page';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openModal() {
    // Create a modal using MyModalComponent with some initial data
    const modal = await this.modalCtrl.create({
      component: SessionInfoPage,
      componentProps: {
        nombre: "Ricardo",
        test: "value2"
      }
    });

    await modal.present();
  }
}
