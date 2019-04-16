import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { NuevaEntidadComponent } from "./nueva-entidad.component";
import { SharedModule } from "../../shared.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule],
  declarations: [NuevaEntidadComponent]
})
export class NuevaEntidadPageModule {}
