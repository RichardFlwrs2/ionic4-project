import { Component, OnInit, ViewChild } from "@angular/core";
import { StorageService } from "src/app/services/auth/storage.service";
import { LoadingService } from "src/app/services/tools/loading.service";
import { ActivatedRoute } from "@angular/router";
import { DetalleService } from "./detalle.service";
import { Entity } from "src/app/models/Entity.model";
import { IonSegment } from "@ionic/angular";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.page.html",
  styleUrls: ["./detalle.page.scss"]
})
export class DetallePage implements OnInit {
  @ViewChild(IonSegment) segment: IonSegment;

  constructor(private _loading: LoadingService, private route: ActivatedRoute, public _detalleS: DetalleService) {
    this.route.params.subscribe(params => {
      this._detalleS.typeEntity = params["tipo"];
      this._detalleS.idEntity = params["id"];

      this._detalleS.Entity = new Entity(null);

      this._detalleS.getEntityData();
      this._detalleS.getStatusByIdOwner();
    });
  }

  ngOnInit() {
    this.segment.value = "info";
    this._loading.trigger.next(false);
  }

  segmentChanged(event: any) {
    const value = event.detail.value;
    // console.log(value);
  }
}
