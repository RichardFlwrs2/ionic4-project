import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HeaderComponent } from "./layout/header/header.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";

// Components
import { SimpleInputComponent } from "./components/simple-input/simple-input.component";
import { InfoRowComponent } from "./components/info-row/info-row.component";
import { ImgPipe } from "./pipes/img.pipe";


@NgModule({
  declarations: [HeaderComponent, SimpleInputComponent, InfoRowComponent, ImgPipe ],
  exports: [
    // Modulos
    NgxMaskModule,
    ReactiveFormsModule,
    // Components
    HeaderComponent,
    SimpleInputComponent,
    InfoRowComponent,
    // Pipes
    ImgPipe
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, NgxMaskModule.forRoot()]
})
export class SharedModule {}
